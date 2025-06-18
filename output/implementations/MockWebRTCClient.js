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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockWebRTCClient = void 0;
class MockWebRTCClient {
    constructor(accessToken, userData) {
        this.accessToken = accessToken;
        this.userData = userData;
        this.mockWebPhone = {};
    }
    initialize(sipInfo, callListenerCallback, autoConnect, registerEventCallback, sessionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.callListenerCallback = callListenerCallback;
            this.registerEventCallback = registerEventCallback;
            return this.mockWebPhone;
        });
    }
    registerDevice() {
        if (this.registerEventCallback) {
            this.registerEventCallback('registered');
        }
    }
    unRegisterDevice() {
        if (this.registerEventCallback) {
            this.registerEventCallback('unregistered');
        }
    }
    acceptCall() {
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
    hangupCall() {
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
    makeCall(number, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            callback('success', { callId: 'mock-call-id' });
        });
    }
    toggleHold() {
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
    toggleMute() {
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
    sendDTMF(digit) {
        // Mock implementation - just log the digit
        console.log(`Mock DTMF: ${digit}`);
    }
}
exports.MockWebRTCClient = MockWebRTCClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9ja1dlYlJUQ0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbXBsZW1lbnRhdGlvbnMvTW9ja1dlYlJUQ0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSxNQUFhLGdCQUFnQjtJQU8zQixZQUFZLFdBQW1CLEVBQUUsUUFBYTtRQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQXVCLENBQUM7SUFDOUMsQ0FBQztJQUVLLFVBQVUsQ0FDZCxPQUF1QixFQUN2QixvQkFBMEMsRUFDMUMsV0FBb0IsRUFDcEIscUJBQWdELEVBQ2hELGVBQXFCOztZQUVyQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7WUFDakQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1lBQ25ELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFRCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRTtnQkFDckMsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGlCQUFpQixFQUFFLGFBQWE7Z0JBQ2hDLGFBQWEsRUFBRSxVQUFVO2dCQUN6QixT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