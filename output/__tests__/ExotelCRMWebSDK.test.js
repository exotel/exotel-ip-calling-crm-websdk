"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExotelCRMWebSDK_1 = __importDefault(require("../core/ExotelCRMWebSDK"));
const MockWebRTCClient_1 = require("../implementations/MockWebRTCClient");
// Mock fetch
global.fetch = jest.fn();
describe('ExotelCRMWebSDK', () => {
    let sdk;
    let mockWebRTCClient;
    const mockAccessToken = 'mock-access-token';
    const mockAgentUserId = 'mock-agent-user-id';
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        // Mock fetch responses
        global.fetch.mockImplementation((url) => {
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
        mockWebRTCClient = new MockWebRTCClient_1.MockWebRTCClient(mockAccessToken, null);
        sdk = new ExotelCRMWebSDK_1.default(mockAccessToken, mockAgentUserId, false, mockWebRTCClient);
    });
    describe('Initialize', () => {
        it('should initialize successfully with callbacks', () => __awaiter(void 0, void 0, void 0, function* () {
            const callEvents = [];
            const registerEvents = [];
            const callListenerCallback = (event, data) => {
                callEvents.push({ event, data });
            };
            const registerEventCallback = (event) => {
                registerEvents.push(event);
            };
            yield sdk.Initialize(callListenerCallback, registerEventCallback);
            // Test making a call
            yield mockWebRTCClient.makeCall('1234567890', (status, data) => {
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
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsQ1JNV2ViU0RLLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvX190ZXN0c19fL0V4b3RlbENSTVdlYlNESy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQXNEO0FBQ3RELDBFQUF1RTtBQUd2RSxhQUFhO0FBQ2IsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFekIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUMvQixJQUFJLEdBQW9CLENBQUM7SUFDekIsSUFBSSxnQkFBa0MsQ0FBQztJQUN2QyxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztJQUM1QyxNQUFNLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQztJQUU3QyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQix1QkFBdUI7UUFDdEIsTUFBTSxDQUFDLEtBQW1CLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUM3RCxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDeEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO29CQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDMUIsSUFBSSxFQUFFOzRCQUNKLGdCQUFnQixFQUFFLGtCQUFrQjt5QkFDckM7cUJBQ0YsQ0FBQztpQkFDSCxDQUFDLENBQUM7YUFDSjtZQUNELElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO2dCQUNoRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ3JCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUMxQixJQUFJLEVBQUU7NEJBQ0os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