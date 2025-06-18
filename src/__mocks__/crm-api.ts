export class CRMAPI {
  constructor() {}

  async getCallDetails(callId: string) {
    return {
      callId,
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

  async getCallHistory() {
    return [
      {
        callId: 'mock-call-id-1',
        remoteId: 'mock-remote-id-1',
        remoteDisplayName: 'Mock Caller 1',
        callDirection: 'incoming',
        callState: 'connected',
        callDuration: '60',
        callStartedTime: new Date(Date.now() - 3600000).toISOString(),
        callEstablishedTime: new Date(Date.now() - 3590000).toISOString(),
        callEndedTime: new Date(Date.now() - 3530000).toISOString(),
        callAnswerTime: new Date(Date.now() - 3590000).toISOString(),
        callEndReason: 'completed',
        sessionId: 'mock-session-id-1'
      },
      {
        callId: 'mock-call-id-2',
        remoteId: 'mock-remote-id-2',
        remoteDisplayName: 'Mock Caller 2',
        callDirection: 'outgoing',
        callState: 'connected',
        callDuration: '30',
        callStartedTime: new Date(Date.now() - 1800000).toISOString(),
        callEstablishedTime: new Date(Date.now() - 1790000).toISOString(),
        callEndedTime: new Date(Date.now() - 1760000).toISOString(),
        callAnswerTime: new Date(Date.now() - 1790000).toISOString(),
        callEndReason: 'completed',
        sessionId: 'mock-session-id-2'
      }
    ];
  }

  async getCallRecording(callId: string) {
    return {
      url: `https://mock-recording-url.com/${callId}`,
      duration: 60,
      format: 'mp3'
    };
  }

  async getCallTranscript(callId: string) {
    return {
      text: 'Mock call transcript text',
      language: 'en',
      confidence: 0.95
    };
  }
} 