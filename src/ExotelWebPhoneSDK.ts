// @ts-ignore
import { ExotelWebClient } from "@exotel-npm-dev/webrtc-client-sdk";
// @ts-ignore
import { Call } from "@exotel-npm-dev/webrtc-client-sdk/src/api/callAPI/Call";
import { User } from "./User";
import { icoreBaseURL } from "./Constants";
import { SIPAccountInfo } from "./SipAccountInfo";

interface MakeCallCallback {
  (status: "success" | "failed", data: any): void;
}

class ExotelAPIError extends Error {
  public readonly statusCode: number;
  public readonly responseBody: string;

  constructor(statusCode: number, statusText: string, responseBody: string) {
    super(statusText);
    this.name = 'ExotelAPIError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
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

export default class ExotelWebPhoneSDK {
  #accessToken: string;
  #user: User;

  _softPhoneRegisterEventCallBack: RegisterListenerCallback;
  _softPhoneCallListenerCallback: CallListenerCallback;
  #exWebClient: ExotelWebClient;
  #sipInfo: SIPAccountInfo;
  _softPhoneSessionCallback: any;

  #call: Call;

  constructor(accessToken: string, user: User) {
    this.#accessToken = accessToken; // This access token is understood by icore which makes this SDK dependent on it
    this.#user = user;
  }

  Initialize(
    sipInfo: SIPAccountInfo,
    callListenerCallback: CallListenerCallback,
    autoConnectVOIP = false,
    registerEventCallBack: RegisterListenerCallback | null,
    sessionCallback: any
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

  RegisterDevice = () => {
    this.#exWebClient.DoRegister();
  }

  UnRegisterDevice = () => {
    this.#exWebClient.UnRegister(this.#sipInfo);
  }

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

  SessionCallback = (state: string, sipInfo: SIPAccountInfo) => {
    console.info("[crm-websdk] SessionCallback", state, "for number...", sipInfo);
    this._softPhoneSessionCallback(state, sipInfo);
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
        throw new ExotelAPIError(response.status, response.statusText, errorText);
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
}
