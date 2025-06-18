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
exports.ExotelCRMWebSDK = void 0;
const webrtc_client_sdk_1 = require("./webrtc-client-sdk");
const crm_api_1 = require("./crm-api");
class ExotelCRMWebSDK {
    constructor() {
        this.isInitialized = false;
        this.webrtcClient = new webrtc_client_sdk_1.ExotelWebClient();
        this.crmApi = new crm_api_1.CRMAPI();
    }
    initialize(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isInitialized = true;
            return true;
        });
    }
    register(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    unregister() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    answerCall() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    hangupCall() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    holdCall() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    unholdCall() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    muteCall() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    unmuteCall() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    sendDTMF(digit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return true;
        });
    }
    getCallDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return this.crmApi.getCallDetails('mock-call-id');
        });
    }
    getCallHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return this.crmApi.getCallHistory();
        });
    }
    getCallRecording(callId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return this.crmApi.getCallRecording(callId);
        });
    }
    getCallTranscript(callId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialized) {
                throw new Error('SDK not initialized');
            }
            return this.crmApi.getCallTranscript(callId);
        });
    }
}
exports.ExotelCRMWebSDK = ExotelCRMWebSDK;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhvdGVsLWNybS13ZWJzZGsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvX19tb2Nrc19fL2V4b3RlbC1jcm0td2Vic2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUN0RCx1Q0FBbUM7QUFFbkMsTUFBYSxlQUFlO0lBSzFCO1FBRlEsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFHckMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG1DQUFlLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFSyxVQUFVLENBQUMsTUFBVzs7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsV0FBZ0I7O1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLFVBQVU7O1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN4QztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssVUFBVTs7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxVQUFVOztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN4QztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssVUFBVTs7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxRQUFROztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLFVBQVU7O1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN4QztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssUUFBUSxDQUFDLEtBQWE7O1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVLLGNBQWM7O1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUVLLGNBQWM7O1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsTUFBYzs7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN4QztZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFSyxpQkFBaUIsQ0FBQyxNQUFjOztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtDQUNGO0FBekdELDBDQXlHQyJ9