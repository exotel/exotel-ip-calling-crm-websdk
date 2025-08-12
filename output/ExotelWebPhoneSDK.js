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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExotelWebPhoneSDK_accessToken, _ExotelWebPhoneSDK_user, _ExotelWebPhoneSDK_exWebClient, _ExotelWebPhoneSDK_sipInfo, _ExotelWebPhoneSDK_call;
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const webrtc_client_sdk_1 = require("@exotel-npm-dev/webrtc-client-sdk");
const Constants_1 = require("./Constants");
class ExotelAPIError extends Error {
    constructor(statusCode, statusText, responseBody) {
        super(statusText);
        this.name = 'ExotelAPIError';
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
class ExotelWebPhoneSDK {
    constructor(accessToken, user) {
        _ExotelWebPhoneSDK_accessToken.set(this, void 0);
        _ExotelWebPhoneSDK_user.set(this, void 0);
        _ExotelWebPhoneSDK_exWebClient.set(this, void 0);
        _ExotelWebPhoneSDK_sipInfo.set(this, void 0);
        _ExotelWebPhoneSDK_call.set(this, void 0);
        this.RegisterDevice = () => {
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").DoRegister();
        };
        this.UnRegisterDevice = () => {
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").UnRegister(__classPrivateFieldGet(this, _ExotelWebPhoneSDK_sipInfo, "f"));
        };
        /**
         * #callListenerCallback is a wrapper over the listener callback
         * provided at the time of initialisation to allow us to log stuff
         * @param callObj
         * @param eventType
         * @param sipInfo
         */
        this.CallListenerCallback = (callObj, eventType, sipInfo) => {
            __classPrivateFieldSet(this, _ExotelWebPhoneSDK_call, __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").getCall(), "f");
            callObj.callFromNumber = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").callFromNumber;
            const callDetails = callObj.callDetails();
            callDetails.callFromNumber = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").callFromNumber;
            this._softPhoneCallListenerCallback(eventType, callDetails);
        };
        this.RegisterEventCallBack = (state, sipInfo) => {
            this._softPhoneRegisterEventCallBack(state);
        };
        this.SessionCallback = (state, sipInfo) => {
            console.info("[crm-websdk] SessionCallback", state, "for number...", sipInfo);
            this._softPhoneSessionCallback(state, sipInfo);
        };
        this.AcceptCall = () => {
            var _a;
            (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.Answer();
        };
        this.HangupCall = () => {
            var _a;
            (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.Hangup();
        };
        this.MakeCall = (number, callback) => __awaiter(this, void 0, void 0, function* () {
            const payload = {
                customer_id: __classPrivateFieldGet(this, _ExotelWebPhoneSDK_user, "f").customerId,
                app_id: __classPrivateFieldGet(this, _ExotelWebPhoneSDK_user, "f").appId,
                to: number,
                user_id: __classPrivateFieldGet(this, _ExotelWebPhoneSDK_user, "f").appUserId,
            };
            const headers = {
                Authorization: __classPrivateFieldGet(this, _ExotelWebPhoneSDK_accessToken, "f"),
                "Content-Type": "application/json",
            };
            /**
             * We are calling icore here to place a call, which makes this
             * SDK dependent on icore, unfortunately
             */
            try {
                const response = yield fetch(Constants_1.icoreBaseURL + "/v2/integrations/call/outbound_call", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    const errorText = yield response.text();
                    console.error("[crm-websdk] error making call:", response.statusText, errorText);
                    throw new ExotelAPIError(response.status, response.statusText, errorText);
                }
                const data = yield response.json();
                console.info("[crm-websdk] successfully placed call:", data);
                callback("success", data);
            }
            catch (error) {
                console.error("[crm-websdk] Error:", error);
                callback("failed", error);
            }
        });
        this.ToggleHold = () => {
            var _a, _b;
            (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.HoldToggle();
            this._softPhoneCallListenerCallback("holdtoggle", Object.assign(Object.assign({}, (_b = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _b === void 0 ? void 0 : _b.callDetails()), { callFromNumber: __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").callFromNumber }));
        };
        this.ToggleMute = () => {
            var _a;
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f").MuteToggle();
            this._softPhoneCallListenerCallback("mutetoggle", Object.assign(Object.assign({}, (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.callDetails()), { callFromNumber: __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").callFromNumber }));
        };
        this.SendDTMF = (digit) => {
            const regex = /^[0-9*#]$/g;
            if (!digit.match(regex)) {
                return console.error(`[crm-websdk] Invalid dtmf input: ${digit}`);
            }
            if (!__classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) {
                return console.error(`[crm-websdk] Cannot send dtmf input when there is no call in-progress`);
            }
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f").sendDTMF(digit);
        };
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_accessToken, accessToken, "f"); // This access token is understood by icore which makes this SDK dependent on it
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_user, user, "f");
    }
    Initialize(sipInfo, callListenerCallback, autoConnectVOIP = false, registerEventCallBack, sessionCallback) {
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_sipInfo, sipInfo, "f");
        this._softPhoneCallListenerCallback = callListenerCallback;
        if (registerEventCallBack) {
            this._softPhoneRegisterEventCallBack = registerEventCallBack;
        }
        if (sessionCallback) {
            this._softPhoneSessionCallback = sessionCallback;
        }
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_exWebClient, new webrtc_client_sdk_1.ExotelWebClient(), "f");
        __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").initWebrtc(sipInfo, this.RegisterEventCallBack, this.CallListenerCallback, this.SessionCallback);
        if (autoConnectVOIP) {
            this.RegisterDevice();
        }
        console.info("[crm-websdk] Initialize webphone");
        return this;
    }
}
exports.default = ExotelWebPhoneSDK;
_ExotelWebPhoneSDK_accessToken = new WeakMap(), _ExotelWebPhoneSDK_user = new WeakMap(), _ExotelWebPhoneSDK_exWebClient = new WeakMap(), _ExotelWebPhoneSDK_sipInfo = new WeakMap(), _ExotelWebPhoneSDK_call = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsV2ViUGhvbmVTREsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXhvdGVsV2ViUGhvbmVTREsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFhO0FBQ2IseUVBQW9FO0FBSXBFLDJDQUEyQztBQU8zQyxNQUFNLGNBQWUsU0FBUSxLQUFLO0lBSWhDLFlBQVksVUFBa0IsRUFBRSxVQUFrQixFQUFFLFlBQW9CO1FBQ3RFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQWdDRCxNQUFxQixpQkFBaUI7SUFZcEMsWUFBWSxXQUFtQixFQUFFLElBQVU7UUFYM0MsaURBQXFCO1FBQ3JCLDBDQUFZO1FBSVosaURBQThCO1FBQzlCLDZDQUF5QjtRQUd6QiwwQ0FBWTtRQXNDWixtQkFBYyxHQUFHLEdBQUcsRUFBRTtZQUNwQix1QkFBQSxJQUFJLHNDQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFBO1FBRUQscUJBQWdCLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLHVCQUFBLElBQUksc0NBQWEsQ0FBQyxVQUFVLENBQUMsdUJBQUEsSUFBSSxrQ0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFBO1FBRUQ7Ozs7OztXQU1HO1FBQ0gseUJBQW9CLEdBQUcsQ0FDckIsT0FBWSxFQUNaLFNBQW9CLEVBQ3BCLE9BQXVCLEVBQ3ZCLEVBQUU7WUFDRix1QkFBQSxJQUFJLDJCQUFTLHVCQUFBLElBQUksc0NBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBQSxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLGNBQWMs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