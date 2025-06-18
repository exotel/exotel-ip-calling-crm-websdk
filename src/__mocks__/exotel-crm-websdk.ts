import { ExotelWebClient } from './webrtc-client-sdk';
import { CRMAPI } from './crm-api';

export class ExotelCRMWebSDK {
  private webrtcClient: ExotelWebClient;
  private crmApi: CRMAPI;
  private isInitialized: boolean = false;

  constructor() {
    this.webrtcClient = new ExotelWebClient();
    this.crmApi = new CRMAPI();
  }

  async initialize(config: any) {
    this.isInitialized = true;
    return true;
  }

  async register(credentials: any) {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async unregister() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async answerCall() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async hangupCall() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async holdCall() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async unholdCall() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async muteCall() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async unmuteCall() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async sendDTMF(digit: string) {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return true;
  }

  async getCallDetails() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return this.crmApi.getCallDetails('mock-call-id');
  }

  async getCallHistory() {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return this.crmApi.getCallHistory();
  }

  async getCallRecording(callId: string) {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return this.crmApi.getCallRecording(callId);
  }

  async getCallTranscript(callId: string) {
    if (!this.isInitialized) {
      throw new Error('SDK not initialized');
    }
    return this.crmApi.getCallTranscript(callId);
  }
} 