import { IWebRTCClient, CallListenerCallback, RegisterListenerCallback, MakeCallCallback } from '../interfaces/IWebRTCClient';
import { SIPAccountInfo } from '../core/SipAccountInfo';
import ExotelWebPhoneSDK from '../core/ExotelWebPhoneSDK';

export class WebRTCClientImpl implements IWebRTCClient {
  private webPhone: ExotelWebPhoneSDK;
  private accessToken: string;
  private userData: any;

  constructor(accessToken: string, userData: any) {
    this.accessToken = accessToken;
    this.userData = userData;
    this.webPhone = new ExotelWebPhoneSDK(accessToken, userData);
  }

  async initialize(
    sipInfo: SIPAccountInfo,
    callListenerCallback: CallListenerCallback,
    autoConnect: boolean,
    registerEventCallback?: RegisterListenerCallback,
    sessionCallback?: any
  ): Promise<ExotelWebPhoneSDK> {
    return this.webPhone.Initialize(
      sipInfo,
      callListenerCallback,
      autoConnect,
      registerEventCallback || null,
      sessionCallback
    );
  }

  registerDevice(): void {
    this.webPhone.RegisterDevice();
  }

  unRegisterDevice(): void {
    this.webPhone.UnRegisterDevice();
  }

  acceptCall(): void {
    this.webPhone.AcceptCall();
  }

  hangupCall(): void {
    this.webPhone.HangupCall();
  }

  async makeCall(number: string, callback: MakeCallCallback): Promise<void> {
    return this.webPhone.MakeCall(number, callback);
  }

  toggleHold(): void {
    this.webPhone.ToggleHold();
  }

  toggleMute(): void {
    this.webPhone.ToggleMute();
  }

  sendDTMF(digit: string): void {
    this.webPhone.SendDTMF(digit);
  }
} 