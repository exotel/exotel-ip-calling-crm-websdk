import { IWebRTCClient, CallListenerCallback, RegisterListenerCallback, MakeCallCallback } from '../interfaces/IWebRTCClient';
import { SIPAccountInfo } from '../core/SipAccountInfo';
import ExotelWebPhoneSDK from '../core/ExotelWebPhoneSDK';

export class MockWebRTCClient implements IWebRTCClient {
  private mockWebPhone: ExotelWebPhoneSDK;
  private accessToken: string;
  private userData: any;
  private callListenerCallback?: CallListenerCallback;
  private registerEventCallback?: RegisterListenerCallback;

  constructor(accessToken: string, userData: any) {
    this.accessToken = accessToken;
    this.userData = userData;
    this.mockWebPhone = {} as ExotelWebPhoneSDK;
  }

  async initialize(
    sipInfo: SIPAccountInfo,
    callListenerCallback: CallListenerCallback,
    autoConnect: boolean,
    registerEventCallback?: RegisterListenerCallback,
    sessionCallback?: any
  ): Promise<ExotelWebPhoneSDK> {
    this.callListenerCallback = callListenerCallback;
    this.registerEventCallback = registerEventCallback;
    return this.mockWebPhone;
  }

  registerDevice(): void {
    if (this.registerEventCallback) {
      this.registerEventCallback('registered');
    }
  }

  unRegisterDevice(): void {
    if (this.registerEventCallback) {
      this.registerEventCallback('unregistered');
    }
  }

  acceptCall(): void {
    if (this.callListenerCallback) {
      this.callListenerCallback('connected', {
        callId: 'mock-call-id',
        remoteId: 'mock-remote-id',
        remoteDisplayName: 'Mock Caller',
        callDirection: 'incoming',
        callState: 'connected',
        callDuration: '0',
        callStartedTime: new Date().toISOString(),
        callEstablishedTime: new Date().toISOString(),
        callEndedTime: '',
        callAnswerTime: new Date().toISOString(),
        callEndReason: '',
        sessionId: 'mock-session-id'
      });
    }
  }

  hangupCall(): void {
    if (this.callListenerCallback) {
      this.callListenerCallback('callEnded', {
        callId: 'mock-call-id',
        remoteId: 'mock-remote-id',
        remoteDisplayName: 'Mock Caller',
        callDirection: 'incoming',
        callState: 'ended',
        callDuration: '60',
        callStartedTime: new Date().toISOString(),
        callEstablishedTime: new Date().toISOString(),
        callEndedTime: new Date().toISOString(),
        callAnswerTime: new Date().toISOString(),
        callEndReason: 'user-hangup',
        sessionId: 'mock-session-id'
      });
    }
  }

  async makeCall(number: string, callback: MakeCallCallback): Promise<void> {
    callback('success', { callId: 'mock-call-id' });
  }

  toggleHold(): void {
    if (this.callListenerCallback) {
      this.callListenerCallback('holdtoggle', {
        callId: 'mock-call-id',
        remoteId: 'mock-remote-id',
        remoteDisplayName: 'Mock Caller',
        callDirection: 'incoming',
        callState: 'hold',
        callDuration: '60',
        callStartedTime: new Date().toISOString(),
        callEstablishedTime: new Date().toISOString(),
        callEndedTime: '',
        callAnswerTime: new Date().toISOString(),
        callEndReason: '',
        sessionId: 'mock-session-id'
      });
    }
  }

  toggleMute(): void {
    if (this.callListenerCallback) {
      this.callListenerCallback('mutetoggle', {
        callId: 'mock-call-id',
        remoteId: 'mock-remote-id',
        remoteDisplayName: 'Mock Caller',
        callDirection: 'incoming',
        callState: 'muted',
        callDuration: '60',
        callStartedTime: new Date().toISOString(),
        callEstablishedTime: new Date().toISOString(),
        callEndedTime: '',
        callAnswerTime: new Date().toISOString(),
        callEndReason: '',
        sessionId: 'mock-session-id'
      });
    }
  }

  sendDTMF(digit: string): void {
    // Mock implementation - just log the digit
    console.log(`Mock DTMF: ${digit}`);
  }
} 