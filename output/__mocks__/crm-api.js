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
exports.CRMAPI = void 0;
class CRMAPI {
    constructor() { }
    getCallDetails(callId) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getCallHistory() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getCallRecording(callId) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                url: `https://mock-recording-url.com/${callId}`,
                duration: 60,
                format: 'mp3'
            };
        });
    }
    getCallTranscript(callId) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                text: 'Mock call transcript text',
                language: 'en',
                confidence: 0.95
            };
        });
    }
}
exports.CRMAPI = CRMAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JtLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fX21vY2tzX18vY3JtLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxNQUFhLE1BQU07SUFDakIsZ0JBQWUsQ0FBQztJQUVWLGNBQWMsQ0FBQyxNQUFjOztZQUNqQyxPQUFPO2dCQUNMLE1BQU07Z0JBQ04sUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsaUJBQWlCLEVBQUUsYUFBYTtnQkFDaEMsYUFBYSxFQUFFLFVBQVU7Z0JBQ3pCLFNBQVMsRUFBRSxXQUFXO2dCQUN0QixZQUFZLEVBQUUsR0FBRztnQkFDakIsZUFBZSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO2dCQUN6QyxtQkFBbUIsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtnQkFDN0MsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLGNBQWMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtnQkFDeEMsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLFNBQVMsRUFBRSxpQkFBaUI7YUFDN0IsQ0FBQztRQUNKLENBQUM7S0FBQTtJQUVLLGNBQWM7O1lBQ2xCLE9BQU87Z0JBQ0w7b0JBQ0UsTUFBTSxFQUFFLGdCQUFnQjtvQkFDeEIsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsaUJBQWlCLEVBQUUsZUFBZTtvQkFDbEMsYUFBYSxFQUFFLFVBQVU7b0JBQ3pCLFNBQVMsRUFBRSxXQUFXO29CQUN0QixZQUFZLEVBQUUsSUFBSTtvQkFDbEIsZUFBZSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQzdELG1CQUFtQixFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQ2pFLGFBQWEsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFO29CQUMzRCxjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRTtvQkFDNUQsYUFBYSxFQUFFLFdBQVc7b0JBQzFCLFNBQVMsRUFBRSxtQkFBbUI7aUJBQy9CO2dCQUNEO29CQUNFLE1BQU0sRUFBRSxnQkFBZ0I7b0JBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGlCQUFpQixFQUFFLGVBQWU7b0JBQ2xDLGFBQWEsRUFBRSxVQUFVO29CQUN6QixTQUFTLEVBQUUsV0FBVztvQkFDdEIsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFO29CQUM3RCxtQkFBbUIsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFO29CQUNqRSxhQUFhLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRTtvQkFDM0QsY0FBYyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQzVELGFBQWEsRUFBRSxXQUFXO29CQUMxQixTQUFTLEVBQUUsbUJBQW1CO2lCQUMvQjthQUNGLENBQUM7UUFDSixDQUFDO0tBQUE7SUFFSyxnQkFBZ0IsQ0FBQyxNQUFjOztZQUNuQyxPQUFPO2dCQUNMLEdBQUcsRUFBRSxrQ0FBa0MsTUFBTSxFQUFFO2dCQUMvQyxRQUFRLEVBQUUsRUFBRTtnQkFDWixNQUFNLEVBQUUsS0FBSzthQUNkLENBQUM7UUFDSixDQUFDO0tBQUE7SUFFSyxpQkFBaUIsQ0FBQyxNQUFjOztZQUNwQyxPQUFPO2dCQUNMLElBQUksRUFBRSwyQkFBMkI7Z0JBQ2pDLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFVBQVUsRUFBRSxJQUFJO2FBQ2pCLENBQUM7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQXBFRCx3QkFvRUMifQ==