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
                    throw new Error(response.statusText);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsV2ViUGhvbmVTREsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXhvdGVsV2ViUGhvbmVTREsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFhO0FBQ2IseUVBQW9FO0FBSXBFLDJDQUEyQztBQXFDM0MsTUFBcUIsaUJBQWlCO0lBWXBDLFlBQVksV0FBbUIsRUFBRSxJQUFVO1FBWDNDLGlEQUFxQjtRQUNyQiwwQ0FBWTtRQUlaLGlEQUE4QjtRQUM5Qiw2Q0FBeUI7UUFHekIsMENBQVk7UUFzQ1osbUJBQWMsR0FBRyxHQUFHLEVBQUU7WUFDcEIsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQTtRQUVELHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUN0Qix1QkFBQSxJQUFJLHNDQUFhLENBQUMsVUFBVSxDQUFDLHVCQUFBLElBQUksa0NBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNILHlCQUFvQixHQUFHLENBQ3JCLE9BQVksRUFDWixTQUFvQixFQUNwQixPQUF1QixFQUN2QixFQUFFO1lBQ0YsdUJBQUEsSUFBSSwyQkFBUyx1QkFBQSxJQUFJLHNDQUFhLENBQUMsT0FBTyxFQUFFLE1BQUEsQ0FBQztZQUN6QyxPQUFPLENBQUMsY0FBYyxHQUFHLHVCQUFBLElBQUksc0NBQWEsQ0FBQyxjQUFjLENBQUM7WUFDMUQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFDLFdBQVcsQ0FBQyxjQUFjLEdBQUcsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLGNBQWMsQ0FBQztZQUM5RCxJQUFJLENBQUMsOEJBQThCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQztRQUVGLDBCQUFxQixHQUFHLENBQUMsS0FBYSxFQUFFLE9BQXVCLEVBQUUs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