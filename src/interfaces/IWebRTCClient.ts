import { SIPAccountInfo } from '../core/SipAccountInfo';
import ExotelWebPhoneSDK from '../core/ExotelWebPhoneSDK';

export type CallEvent = "incoming" | "connected" | "callEnded" | "holdtoggle" | "mutetoggle";

export interface CallEventData {
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
  callFromNumber?: string;
  status?: string;
}

export interface CallListenerCallback {
  (event: CallEvent, callData: CallEventData): void;
}

export interface RegisterListenerCallback {
  (event: string): void;
}

export interface MakeCallCallback {
  (status: "success" | "failed", data: any): void;
}

export interface IWebRTCClient {
  initialize(
    sipInfo: SIPAccountInfo,
    callListenerCallback: CallListenerCallback,
    autoConnect: boolean,
    registerEventCallback?: RegisterListenerCallback,
    sessionCallback?: any
  ): Promise<ExotelWebPhoneSDK>;

  registerDevice(): void;
  unRegisterDevice(): void;
  acceptCall(): void;
  hangupCall(): void;
  makeCall(number: string, callback: MakeCallCallback): Promise<void>;
  toggleHold(): void;
  toggleMute(): void;
  sendDTMF(digit: string): void;
} 