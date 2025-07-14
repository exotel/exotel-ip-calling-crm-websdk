import { ExotelCRMWebSDK } from '../__mocks__/exotel-crm-websdk';

describe('ExotelCRMWebSDK', () => {
  let sdk: ExotelCRMWebSDK;

  beforeEach(() => {
    sdk = new ExotelCRMWebSDK();
  });

  it('should initialize successfully', async () => {
    const result = await sdk.initialize();
    expect(result).toBe(true);
  });

  it('should throw error when trying to register before initialization', async () => {
    await expect(sdk.register()).rejects.toThrow('SDK not initialized');
  });

  it('should register successfully after initialization', async () => {
    await sdk.initialize();
    const result = await sdk.register();
    expect(result).toBe(true);
  });

  it('should answer call successfully', async () => {
    await sdk.initialize();
    const result = await sdk.answerCall();
    expect(result).toBe(true);
  });

  it('should mute call successfully', async () => {
    await sdk.initialize();
    const result = await sdk.muteCall();
    expect(result).toBe(true);
  });

  it('should get call details successfully', async () => {
    await sdk.initialize();
    const details = await sdk.getCallDetails();
    expect(details).toHaveProperty('callId');
    expect(details).toHaveProperty('remoteId');
    expect(details).toHaveProperty('remoteDisplayName');
    expect(details).toHaveProperty('callDirection');
    expect(details).toHaveProperty('callState');
  });
}); 