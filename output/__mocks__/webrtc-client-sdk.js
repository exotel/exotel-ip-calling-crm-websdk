"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = exports.ExotelWebClient = void 0;
class ExotelWebClient {
    initWebrtc() { }
    DoRegister() { }
    UnRegister() { }
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
exports.ExotelWebClient = ExotelWebClient;
class Call {
    Answer() { }
    Hangup() { }
    HoldToggle() { }
    Mute() { }
    sendDTMF() { }
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
exports.Call = Call;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicnRjLWNsaWVudC1zZGsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvX19tb2Nrc19fL3dlYnJ0Yy1jbGllbnQtc2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsZUFBZTtJQUMxQixVQUFVLEtBQUksQ0FBQztJQUNmLFVBQVUsS0FBSSxDQUFDO0lBQ2YsVUFBVSxLQUFJLENBQUM7SUFDZixPQUFPO1FBQ0wsT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ3JDLE1BQU0sRUFBRSxjQUFjO2dCQUN0QixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixpQkFBaUIsRUFBRSxhQUFhO2dCQUNoQyxhQUFhLEVBQUUsVUFBVTtnQkFDekIsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLFlBQVksRUFBRSxHQUFHO2dCQUNqQixlQUFlLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3pDLG1CQUFtQixFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO2dCQUM3QyxhQUFhLEVBQUUsRUFBRTtnQkFDakIsY0FBYyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO2dCQUN4QyxhQUFhLEVBQUUsRUFBRTtnQkFDakIsU0FBUyxFQUFFLGlCQUFpQjthQUM3QixDQUFDO1NBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTNCRCwwQ0EyQkM7QUFFRCxNQUFhLElBQUk7SUFDZixNQUFNLEtBQUksQ0FBQztJQUNYLE1BQU0sS0FBSSxDQUFDO0lBQ1gsVUFBVSxLQUFJLENBQUM7SUFDZixJQUFJLEtBQUksQ0FBQztJQUNULFFBQVEsS0FBSSxDQUFDO0lBQ2IsV0FBVztRQUNULE9BQU87WUFDTCxNQUFNLEVBQUUsY0FBYztZQUN0QixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLGlCQUFpQixFQUFFLGFBQWE7WUFDaEMsYUFBYSxFQUFFLFVBQVU7WUFDekIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsWUFBWSxFQUFFLEdBQUc7WUFDakIsZUFBZSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1lBQ3pDLG1CQUFtQixFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1lBQzdDLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLGNBQWMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtZQUN4QyxhQUFhLEVBQUUsRUFBRTtZQUNqQixTQUFTLEVBQUUsaUJBQWlCO1NBQzdCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUF0QkQsb0JBc0JDIn0=