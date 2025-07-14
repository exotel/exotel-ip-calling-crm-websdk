export class ExotelCRMWebSDK {
  private isInitialized = false;

  async initialize() {
    this.isInitialized = true;
    return true;
  }

  async register() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async unregister() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async answerCall() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async hangupCall() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async holdCall() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async unholdCall() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async muteCall() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async unmuteCall() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async sendDTMF() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return true;
  }

  async getCallDetails() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return { callId: 'mock-call-id', remoteId: 'mock-remote-id', remoteDisplayName: 'Mock Caller', callDirection: 'incoming', callState: 'connected' };
  }

  async getCallHistory() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return [{ callId: 'mock-call-id', remoteId: 'mock-remote-id', remoteDisplayName: 'Mock Caller' }];
  }

  async getCallRecording() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return { url: 'mock-url', duration: 60, format: 'mp3' };
  }

  async getCallTranscript() {
    if (!this.isInitialized) throw new Error('SDK not initialized');
    return { text: 'mock transcript', language: 'en', confidence: 1 };
  }
} 