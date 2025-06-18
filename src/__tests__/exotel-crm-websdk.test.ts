import { ExotelCRMWebSDK } from '../__mocks__/exotel-crm-websdk';

describe('ExotelCRMWebSDK', () => {
  let sdk: ExotelCRMWebSDK;

  beforeEach(() => {
    sdk = new ExotelCRMWebSDK();
  });

  describe('initialization', () => {
    it('should initialize successfully', async () => {
      const result = await sdk.initialize({});
      expect(result).toBe(true);
    });
  });

  describe('registration', () => {
    it('should throw error when trying to register before initialization', async () => {
      await expect(sdk.register({})).rejects.toThrow('SDK not initialized');
    });

    it('should register successfully after initialization', async () => {
      await sdk.initialize({});
      const result = await sdk.register({});
      expect(result).toBe(true);
    });

    it('should unregister successfully', async () => {
      await sdk.initialize({});
      const result = await sdk.unregister();
      expect(result).toBe(true);
    });
  });

  describe('call control', () => {
    beforeEach(async () => {
      await sdk.initialize({});
    });

    it('should answer call successfully', async () => {
      const result = await sdk.answerCall();
      expect(result).toBe(true);
    });

    it('should hangup call successfully', async () => {
      const result = await sdk.hangupCall();
      expect(result).toBe(true);
    });

    it('should hold call successfully', async () => {
      const result = await sdk.holdCall();
      expect(result).toBe(true);
    });

    it('should unhold call successfully', async () => {
      const result = await sdk.unholdCall();
      expect(result).toBe(true);
    });

    it('should mute call successfully', async () => {
      const result = await sdk.muteCall();
      expect(result).toBe(true);
    });

    it('should unmute call successfully', async () => {
      const result = await sdk.unmuteCall();
      expect(result).toBe(true);
    });

    it('should send DTMF successfully', async () => {
      const result = await sdk.sendDTMF('1');
      expect(result).toBe(true);
    });
  });

  describe('call information', () => {
    beforeEach(async () => {
      await sdk.initialize({});
    });

    it('should get call details successfully', async () => {
      const details = await sdk.getCallDetails();
      expect(details).toHaveProperty('callId');
      expect(details).toHaveProperty('remoteId');
      expect(details).toHaveProperty('remoteDisplayName');
      expect(details).toHaveProperty('callDirection');
      expect(details).toHaveProperty('callState');
    });

    it('should get call history successfully', async () => {
      const history = await sdk.getCallHistory();
      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBeGreaterThan(0);
      expect(history[0]).toHaveProperty('callId');
      expect(history[0]).toHaveProperty('remoteId');
      expect(history[0]).toHaveProperty('remoteDisplayName');
    });

    it('should get call recording successfully', async () => {
      const recording = await sdk.getCallRecording('mock-call-id');
      expect(recording).toHaveProperty('url');
      expect(recording).toHaveProperty('duration');
      expect(recording).toHaveProperty('format');
    });

    it('should get call transcript successfully', async () => {
      const transcript = await sdk.getCallTranscript('mock-call-id');
      expect(transcript).toHaveProperty('text');
      expect(transcript).toHaveProperty('language');
      expect(transcript).toHaveProperty('confidence');
    });
  });

  describe('error handling', () => {
    it('should throw error when trying to perform operations before initialization', async () => {
      const operations = [
        () => sdk.answerCall(),
        () => sdk.hangupCall(),
        () => sdk.holdCall(),
        () => sdk.unholdCall(),
        () => sdk.muteCall(),
        () => sdk.unmuteCall(),
        () => sdk.sendDTMF('1'),
        () => sdk.getCallDetails(),
        () => sdk.getCallHistory(),
        () => sdk.getCallRecording('mock-call-id'),
        () => sdk.getCallTranscript('mock-call-id')
      ];

      for (const operation of operations) {
        await expect(operation()).rejects.toThrow('SDK not initialized');
      }
    });
  });
}); 