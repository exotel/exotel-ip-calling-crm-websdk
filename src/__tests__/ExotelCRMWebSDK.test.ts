import ExotelCRMWebSDK from '../core/ExotelCRMWebSDK';
import { MockWebRTCClient } from '../implementations/MockWebRTCClient';
import { CallEvent, CallEventData } from '../interfaces/IWebRTCClient';

// Mock fetch
global.fetch = jest.fn();

describe('ExotelCRMWebSDK', () => {
  let sdk: ExotelCRMWebSDK;
  let mockWebRTCClient: MockWebRTCClient;
  const mockAccessToken = 'mock-access-token';
  const mockAgentUserId = 'mock-agent-user-id';

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock fetch responses
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/v2/integrations/app')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            Data: {
              ExotelAccountSid: 'mock-account-sid'
            }
          })
        });
      }
      if (url.includes('/v2/integrations/app_setting')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            Data: {
              settings: {}
            }
          })
        });
      }
      if (url.includes('/v2/integrations/usermapping')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            Data: {
              AppID: 'mock-app-id',
              AppUserId: 'mock-app-user-id',
              SipSecret: 'mock-sip-secret',
              SipId: 'sip:1234567890abcdef',
              ExotelUserName: 'Mock User',
              customer_id: 'mock-customer-id'
            }
          })
        });
      }
      return Promise.reject(new Error('Not found'));
    });

    mockWebRTCClient = new MockWebRTCClient(mockAccessToken, null);
    sdk = new ExotelCRMWebSDK(mockAccessToken, mockAgentUserId, false, mockWebRTCClient);
  });

  describe('Initialize', () => {
    it('should initialize successfully with callbacks', async () => {
      const callEvents: Array<{ event: CallEvent; data: CallEventData }> = [];
      const registerEvents: string[] = [];

      const callListenerCallback = (event: CallEvent, data: CallEventData) => {
        callEvents.push({ event, data });
      };

      const registerEventCallback = (event: string) => {
        registerEvents.push(event);
      };

      await sdk.Initialize(callListenerCallback, registerEventCallback);

      // Test making a call
      await mockWebRTCClient.makeCall('1234567890', (status, data) => {
        expect(status).toBe('success');
        expect(data.callId).toBe('mock-call-id');
      });

      // Test accepting a call
      mockWebRTCClient.acceptCall();
      expect(callEvents).toHaveLength(1);
      expect(callEvents[0].event).toBe('connected');
      expect(callEvents[0].data.remoteDisplayName).toBe('Mock Caller');

      // Test toggling hold
      mockWebRTCClient.toggleHold();
      expect(callEvents).toHaveLength(2);
      expect(callEvents[1].event).toBe('holdtoggle');
      expect(callEvents[1].data.callState).toBe('hold');

      // Test toggling mute
      mockWebRTCClient.toggleMute();
      expect(callEvents).toHaveLength(3);
      expect(callEvents[2].event).toBe('mutetoggle');
      expect(callEvents[2].data.callState).toBe('muted');

      // Test hanging up
      mockWebRTCClient.hangupCall();
      expect(callEvents).toHaveLength(4);
      expect(callEvents[3].event).toBe('callEnded');
      expect(callEvents[3].data.callEndReason).toBe('user-hangup');

      // Test device registration
      mockWebRTCClient.registerDevice();
      expect(registerEvents).toHaveLength(1);
      expect(registerEvents[0]).toBe('registered');

      // Test device unregistration
      mockWebRTCClient.unRegisterDevice();
      expect(registerEvents).toHaveLength(2);
      expect(registerEvents[1]).toBe('unregistered');

      // Test DTMF
      mockWebRTCClient.sendDTMF('1');
      // Note: We can't easily test console.log output
    });
  });
}); 