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
exports.WebRTCClientImpl = void 0;
const ExotelWebPhoneSDK_1 = __importDefault(require("../core/ExotelWebPhoneSDK"));
class WebRTCClientImpl {
    constructor(accessToken, userData) {
        this.accessToken = accessToken;
        this.userData = userData;
        this.webPhone = new ExotelWebPhoneSDK_1.default(accessToken, userData);
    }
    initialize(sipInfo, callListenerCallback, autoConnect, registerEventCallback, sessionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.webPhone.Initialize(sipInfo, callListenerCallback, autoConnect, registerEventCallback || null, sessionCallback);
        });
    }
    registerDevice() {
        this.webPhone.RegisterDevice();
    }
    unRegisterDevice() {
        this.webPhone.UnRegisterDevice();
    }
    acceptCall() {
        this.webPhone.AcceptCall();
    }
    hangupCall() {
        this.webPhone.HangupCall();
    }
    makeCall(number, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.webPhone.MakeCall(number, callback);
        });
    }
    toggleHold() {
        this.webPhone.ToggleHold();
    }
    toggleMute() {
        this.webPhone.ToggleMute();
    }
    sendDTMF(digit) {
        this.webPhone.SendDTMF(digit);
    }
}
exports.WebRTCClientImpl = WebRTCClientImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViUlRDQ2xpZW50SW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbXBsZW1lbnRhdGlvbnMvV2ViUlRDQ2xpZW50SW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQSxrRkFBMEQ7QUFFMUQsTUFBYSxnQkFBZ0I7SUFLM0IsWUFBWSxXQUFtQixFQUFFLFFBQWE7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDJCQUFpQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUssVUFBVSxDQUNkLE9BQXVCLEVBQ3ZCLG9CQUEwQyxFQUMxQyxXQUFvQixFQUNwQixxQkFBZ0QsRUFDaEQsZUFBcUI7O1lBRXJCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQzdCLE9BQU8sRUFDUCxvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLHFCQUFxQixJQUFJLElBQUksRUFDN0IsZUFBZSxDQUNoQixDQUFDO1FBQ0osQ0FBQztLQUFBO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFSyxRQUFRLENBQUMsTUFBYyxFQUFFLFFBQTBCOztZQUN2RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxDQUFDO0tBQUE7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQTFERCw0Q0EwREMifQ==