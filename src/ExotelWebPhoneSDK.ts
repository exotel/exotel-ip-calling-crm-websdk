// @ts-ignore
import { ExotelWebClient } from "@exotel-npm-dev/webrtc-client-sdk";
import { User } from "./User";
import { icoreBaseURL } from "./Constants";
import { SIPAccountInfo } from "./SipAccountInfo";

interface MakeCallCallback {
  (status: "success" | "failed", data: any): void;
}

interface CallEventData {
  callId: string;
  remoteId: string;
  remoteDisplayName: string;
  callDirection: string;
  callState: string;
  callDuration: string;
  callStartedTime: string;
  callEstablishedTime: string;
  callEndedTime: string;
  callAnswerTime: string;
  callEndReason: string;
  sessionId: string;
  callFromNumber?: string; // TODO: fix this so that it is no longer optional
  status?: string; // TODO: fix this so that it is no longer optional
}

type CallEvent = "incoming" | "connected" | "callEnded" | "holdtoggle" | "mutetoggle"

/**
 * CallListenerCallback is to handle incoming call event
 */
interface CallListenerCallback {
  (event: CallEvent, callData: CallEventData): void;
}

interface RegisterListenerCallback {
  (event: string): void;
}

/**
 * Soft-phone session events from webrtc-client-sdk.
 * error stays 3rd for backward compat; eventData is optional 4th for structured payloads
 * (e.g. init-get-stats { pc, callId, username }).
 */
type SoftPhoneSessionCallback = (
  state: string,
  phone?: string | SIPAccountInfo,
  error?: any,
  eventData?: any
) => void;

/**
 * Instance returned by webrtc-client-sdk Call(). That file exports a
 * constructor function, which TypeScript will not use as a type.
 */
interface Call {
  Answer(): void;
  Hangup(): void;
  MuteToggle(): void;
  HoldToggle(): void;
  callDetails(): any;
  sendDTMF(digit: string): void;
}

export default class ExotelWebPhoneSDK {
  #accessToken: string;
  #user: User;

  _softPhoneRegisterEventCallBack: RegisterListenerCallback;
  _softPhoneCallListenerCallback: CallListenerCallback;
  #exWebClient: ExotelWebClient;
  #sipInfo: SIPAccountInfo;
  _softPhoneSessionCallback: SoftPhoneSessionCallback;

  #call: Call;
  // One chain so a delayed UNREGISTER cannot land after the next REGISTER.
  #opTail: Promise<void> = Promise.resolve();
  #opGen = 0;

  constructor(accessToken: string, user: User) {
    this.#accessToken = accessToken; // This access token is understood by icore which makes this SDK dependent on it
    this.#user = user;
  }

  Initialize(
    sipInfo: SIPAccountInfo,
    callListenerCallback: CallListenerCallback,
    autoConnectVOIP = false,
    registerEventCallBack: RegisterListenerCallback | null,
    sessionCallback: SoftPhoneSessionCallback | null
  ): ExotelWebPhoneSDK {
    this.#sipInfo = sipInfo;
    this._softPhoneCallListenerCallback = callListenerCallback;
    if (registerEventCallBack) {
      this._softPhoneRegisterEventCallBack = registerEventCallBack;
    }
    if (sessionCallback) {
      this._softPhoneSessionCallback = sessionCallback;
    }

    this.#exWebClient = new ExotelWebClient();
    this.#exWebClient.initWebrtc(
      sipInfo,
      this.RegisterEventCallBack,
      this.CallListenerCallback,
      this.SessionCallback
    );

    if (autoConnectVOIP) {
      this.RegisterDevice();
    }
    console.info("[crm-websdk] Initialize webphone");
    return this;
  }

  /**
   * Latest intent wins. A newer ON or OFF bumps the generation so the older
   * chain link returns without sending SIP.
   */
  #enqueue = (work: (gen: number) => Promise<void>): Promise<void> => {
    const gen = ++this.#opGen;
    const run = this.#opTail.then(() => work(gen));
    this.#opTail = run.then(
      () => undefined,
      () => undefined
    );
    return run;
  };

  RegisterDevice = (): Promise<void> => {
    const client = this.#exWebClient as ExotelWebClient & {
      cancelPendingUnregister?: () => void;
    };
    // Drop a delayed UNREGISTER before this REGISTER is sent.
    if (typeof client.cancelPendingUnregister === "function") {
      client.cancelPendingUnregister();
    }
    return this.#enqueue(async (gen) => {
      if (gen !== this.#opGen) return;
      this.#exWebClient.enableAutoRetry();
      this.#exWebClient.DoRegister();
    });
  };

  UnRegisterDevice = (): Promise<void> => {
    const client = this.#exWebClient as ExotelWebClient & {
      cancelPendingRegister?: () => void;
      cancelPendingUnregister?: () => void;
      unregisterHandoff?: (() => void) | null;
    };
    if (typeof client.cancelPendingRegister === "function") {
      client.cancelPendingRegister();
    }
    if (typeof client.cancelPendingUnregister === "function") {
      client.cancelPendingUnregister();
    }
    return this.#enqueue(async (gen) => {
      if (gen !== this.#opGen) return;
      this.#exWebClient.disableAutoRetry();
      await new Promise<void>((resolve) => {
        if (gen !== this.#opGen) {
          resolve();
          return;
        }
        const phone = client as ExotelWebClient & {
          pendingUnregisterTimer?: ReturnType<typeof setTimeout> | null;
          finishUnregisterHandoff?: () => void;
        };
        client.unregisterHandoff = resolve;
        this.#exWebClient.UnRegister();
        // Older webrtc clients have no handoff. Resolve after the same 500ms
        // delay unregister() uses so the next REGISTER cannot overtake it.
        if (typeof client.cancelPendingUnregister !== "function") {
          client.unregisterHandoff = null;
          setTimeout(resolve, 500);
          return;
        }
        // unregister() already resolved the handoff, or it never scheduled
        // the delay (nothing will call the handoff).
        if (client.unregisterHandoff && !phone.pendingUnregisterTimer) {
          phone.finishUnregisterHandoff?.();
        }
      });
    });
  };

  /**
   * #callListenerCallback is a wrapper over the listener callback
   * provided at the time of initialisation to allow us to log stuff
   * @param callObj
   * @param eventType
   * @param sipInfo
   */
  CallListenerCallback = (
    callObj: any,
    eventType: CallEvent,
    sipInfo: SIPAccountInfo
  ) => {
    this.#call = this.#exWebClient.getCall();
    callObj.callFromNumber = this.#exWebClient.callFromNumber;
    const callDetails = callObj.callDetails();
    callDetails.callFromNumber = this.#exWebClient.callFromNumber;
    this._softPhoneCallListenerCallback(eventType, callDetails);
  };

  RegisterEventCallBack = (state: string, sipInfo: SIPAccountInfo) => {
    this._softPhoneRegisterEventCallBack(state);
  };

  SessionCallback = (
    state: string,
    sipInfo: SIPAccountInfo,
    error?: any,
    eventData?: any
  ) => {
    console.info("[crm-websdk] SessionCallback", state, "for number...", sipInfo);
    if (this._softPhoneSessionCallback) {
      this._softPhoneSessionCallback(state, sipInfo, error, eventData);
    }
  };

  AcceptCall = () => {
    this.#call?.Answer();
  };

  HangupCall = () => {
    this.#call?.Hangup();
  };

  MakeCall = async (number: string, callback: MakeCallCallback) => {
    const payload = {
      customer_id: this.#user.customerId,
      app_id: this.#user.appId,
      to: number,
      user_id: this.#user.appUserId,
    };

    const headers = {
      Authorization: this.#accessToken,
      "Content-Type": "application/json",
    };

    /**
     * We are calling icore here to place a call, which makes this
     * SDK dependent on icore, unfortunately
     */
    try {
      const response = await fetch(
        icoreBaseURL + "/v2/integrations/call/outbound_call",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[crm-websdk] error making call:", response.statusText, errorText);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.info("[crm-websdk] successfully placed call:", data);
      callback("success", data);
    } catch (error) {
      console.error("[crm-websdk] Error:", error);
      callback("failed", error);
    }
  };

  ToggleHold = () => {
    this.#call?.HoldToggle();
    this._softPhoneCallListenerCallback("holdtoggle", {
      ...this.#call?.callDetails(),
      callFromNumber: this.#exWebClient.callFromNumber,
    });
  };

  ToggleMute = () => {
    this.#call.MuteToggle();
    this._softPhoneCallListenerCallback("mutetoggle", {
      ...this.#call?.callDetails(),
      callFromNumber: this.#exWebClient.callFromNumber,
    });
  };

  SendDTMF = (digit: string) => {
    const regex = /^[0-9*#]$/g;
    if (!digit.match(regex)) {
      return console.error(`[crm-websdk] Invalid dtmf input: ${digit}`);
    }
    if (!this.#call) {
      return console.error(
        `[crm-websdk] Cannot send dtmf input when there is no call in-progress`
      );
    }
    this.#call.sendDTMF(digit);
  };

  /**
   * Switch the active microphone. Forwards to webrtc-client-sdk's
   * changeAudioInputDevice (replaces the sender track mid-call when possible).
   */
  ChangeAudioInputDevice = (
    deviceId: string,
    onSuccess?: (stream?: MediaStream) => void,
    onError?: (error: string) => void,
    forceDeviceChange = true
  ) => {
    if (!this.#exWebClient || typeof this.#exWebClient.changeAudioInputDevice !== "function") {
      const msg = "ChangeAudioInputDevice unavailable";
      console.error(`[crm-websdk] ${msg}`);
      if (onError) onError(msg);
      return;
    }
    this.#exWebClient.changeAudioInputDevice(deviceId, onSuccess, onError, forceDeviceChange);
  };

  /**
   * Switch the active speaker / ringtone sink via setSinkId where supported.
   */
  ChangeAudioOutputDevice = (
    deviceId: string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
    forceDeviceChange = true
  ) => {
    if (!this.#exWebClient || typeof this.#exWebClient.changeAudioOutputDevice !== "function") {
      const msg = "ChangeAudioOutputDevice unavailable";
      console.error(`[crm-websdk] ${msg}`);
      if (onError) onError(msg);
      return;
    }
    this.#exWebClient.changeAudioOutputDevice(deviceId, onSuccess, onError, forceDeviceChange);
  };
}
