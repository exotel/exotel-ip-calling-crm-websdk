export class ExotelWebClient {
  initWebrtc() {}
  DoRegister() {}
  UnRegister() {}
  getCall() {
    return {
      Answer: jest.fn(),
      Hangup: jest.fn(),
      HoldToggle: jest.fn(),
      Mute: jest.fn(),
      sendDTMF: jest.fn(),
      callDetails: jest.fn().mockReturnValue({
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
      })
    };
  }
}

export class Call {
  Answer() {}
  Hangup() {}
  HoldToggle() {}
  Mute() {}
  sendDTMF() {}
  callDetails() {
    return {
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
    };
  }
} 