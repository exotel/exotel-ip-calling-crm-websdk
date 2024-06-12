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

export default class ExotelWebPhoneSDK {
  #accessToken: string;
  #user: User;

  //this constructor is invoked when called from ippstn.js,
  constructor(accessToken: string, user: User) {
    this.#accessToken = accessToken; // This access token is understood by icore which makes this SDK dependent on it
    this.#user = user;
  }

  #softPhoneRegisterEventCallBack: any;
  #softPhoneCallListenerCallback: CallListenerCallback;
  #exWebClient: ExotelWebClient;
  #sipInfo: SIPAccountInfo;
  #softPhoneSessionCallback: any;

  Initialize(
    sipInfo: SIPAccountInfo,
    softPhoneCallListenerCallback: CallListenerCallback,
    autoConnectVOIP = false,
    softPhoneRegisterEventCallBack: any,
    softPhoneSessionCallback: any
  ) {
    this.#sipInfo = sipInfo;
    this.#softPhoneCallListenerCallback = softPhoneCallListenerCallback;
    this.#softPhoneRegisterEventCallBack = softPhoneRegisterEventCallBack;
    this.#softPhoneSessionCallback = softPhoneSessionCallback;

    this.#exWebClient = new ExotelWebClient();
    this.#exWebClient.initWebrtc(
      sipInfo,
      this.#registerEventCallBack,
      this.#callListenerCallback,
      this.#sessionCallback
    );

    if (autoConnectVOIP) {
      this.RegisterDevice();
    }
  }

  RegisterDevice() {
    this.#exWebClient.DoRegister();
  }

  UnRegisterDevice() {
    this.#exWebClient.unregister(this.#sipInfo);
  }

  #call: Call;

  /**
   * _callListenerCallback is a wrapper over the listener callback
   * provided at the time of initialisation to allow us to log stuff
   * @param callObj
   * @param eventType
   * @param sipInfo
   */
  #callListenerCallback(
    callObj: any,
    eventType: CallEvent,
    sipInfo: SIPAccountInfo
  ) {
    // let call = this._exWebClient.getCall();
    this.#call = this.#exWebClient.getCall();
    callObj.callFromNumber = this.#exWebClient.callFromNumber;
    console.info(this.#call?.callDetails());
    this.#softPhoneCallListenerCallback(eventType, callObj);
  }

  #registerEventCallBack(state: string, sipInfo: SIPAccountInfo) {
    this.#softPhoneRegisterEventCallBack(state);
  }

  #sessionCallback(state: string, sipInfo: SIPAccountInfo) {
    console.info("Session state:", state, "for number...", sipInfo);
    this.#softPhoneSessionCallback(state, sipInfo);
  }

  AcceptCall() {
    this.#call?.Answer();
  }

  HangupCall() {
    this.#call?.Hangup();
  }

  async MakeCall(number: string, callback: MakeCallCallback) {
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
     * SDK dependent on icore unfortunately
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
        console.error("error making call:", response.statusText, errorText);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.info("successfully placed call:", data);
      callback("success", data);
    } catch (error) {
      console.error("Error:", error);
      callback("failed", error);
    }
  }

  ToggleHoldButton() {
    this.#call?.HoldToggle();
    this.#softPhoneCallListenerCallback(
      "holdtoggle",
      this.#call?.callDetails()
    );
  }

  ToggleMuteButton() {
    this.#call.Mute();
    this.#softPhoneCallListenerCallback(
      "mutetoggle",
      this.#call?.callDetails()
    );
  }
}
