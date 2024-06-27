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
            var _a;
            __classPrivateFieldSet(this, _ExotelWebPhoneSDK_call, __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").getCall(), "f");
            callObj.callFromNumber = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").callFromNumber;
            console.info((_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.callDetails());
            this._softPhoneCallListenerCallback(eventType, callObj);
        };
        this.RegisterEventCallBack = (state, sipInfo) => {
            this._softPhoneRegisterEventCallBack(state);
        };
        this.SessionCallback = (state, sipInfo) => {
            console.info("SessionCallback", state, "for number...", sipInfo);
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
                    console.error("error making call:", response.statusText, errorText);
                    throw new Error(response.statusText);
                }
                const data = yield response.json();
                console.info("successfully placed call:", data);
                callback("success", data);
            }
            catch (error) {
                console.error("Error:", error);
                callback("failed", error);
            }
        });
        this.ToggleHold = () => {
            var _a, _b;
            (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.HoldToggle();
            this._softPhoneCallListenerCallback("holdtoggle", (_b = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _b === void 0 ? void 0 : _b.callDetails());
        };
        this.ToggleMute = () => {
            var _a;
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f").Mute();
            this._softPhoneCallListenerCallback("mutetoggle", (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.callDetails());
        };
        this.SendDTMF = (digit) => {
            const regex = /^[0-9]$/g;
            if (!digit.match(regex)) {
                return console.error(`Invalid dtmf input: ${digit}`);
            }
            if (!__classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) {
                return console.error(`Cannot send dtmf input when there is no call in-progress`);
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
        return this;
    }
}
exports.default = ExotelWebPhoneSDK;
_ExotelWebPhoneSDK_accessToken = new WeakMap(), _ExotelWebPhoneSDK_user = new WeakMap(), _ExotelWebPhoneSDK_exWebClient = new WeakMap(), _ExotelWebPhoneSDK_sipInfo = new WeakMap(), _ExotelWebPhoneSDK_call = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsV2ViUGhvbmVTREsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXhvdGVsV2ViUGhvbmVTREsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFhO0FBQ2IseUVBQW9FO0FBSXBFLDJDQUEyQztBQXNDM0MsTUFBcUIsaUJBQWlCO0lBWXBDLFlBQVksV0FBbUIsRUFBRSxJQUFVO1FBWDNDLGlEQUFxQjtRQUNyQiwwQ0FBWTtRQUlaLGlEQUE4QjtRQUM5Qiw2Q0FBeUI7UUFHekIsMENBQVk7UUFxQ1osbUJBQWMsR0FBRyxHQUFHLEVBQUU7WUFDcEIsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQTtRQUVELHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUN0Qix1QkFBQSxJQUFJLHNDQUFhLENBQUMsVUFBVSxDQUFDLHVCQUFBLElBQUksa0NBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNILHlCQUFvQixHQUFHLENBQ3JCLE9BQVksRUFDWixTQUFvQixFQUNwQixPQUF1QixFQUN2QixFQUFFOztZQUNGLHVCQUFBLElBQUksMkJBQVMsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFBLENBQUM7WUFDekMsT0FBTyxDQUFDLGNBQWMsR0FBRyx1QkFBQSxJQUFJLHNDQUFhLENBQUMsY0FBYyxDQUFDO1lBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBQSx1QkFBQSxJQUFJLCtCQUFNLDBDQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUE7UUFFRCwwQkFBcUIsR0FBRyxDQUFDLEtBQWEsRUFBRSxPQUF1QixFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLCtCQUErQixD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