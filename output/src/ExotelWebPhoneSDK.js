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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
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
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").enableAutoRetry();
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
        this.SessionCallback = (state, sipInfo, error, eventData) => {
            console.info("[crm-websdk] SessionCallback", state, "for number...", sipInfo);
            if (this._softPhoneSessionCallback) {
                this._softPhoneSessionCallback(state, sipInfo, error, eventData);
            }
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
        /**
         * Switch the active microphone. Forwards to webrtc-client-sdk's
         * changeAudioInputDevice (replaces the sender track mid-call when possible).
         */
        this.ChangeAudioInputDevice = (deviceId, onSuccess, onError, forceDeviceChange = true) => {
            if (!__classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f") || typeof __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").changeAudioInputDevice !== "function") {
                const msg = "ChangeAudioInputDevice unavailable";
                console.error(`[crm-websdk] ${msg}`);
                if (onError)
                    onError(msg);
                return;
            }
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").changeAudioInputDevice(deviceId, onSuccess, onError, forceDeviceChange);
        };
        /**
         * Switch the active speaker / ringtone sink via setSinkId where supported.
         */
        this.ChangeAudioOutputDevice = (deviceId, onSuccess, onError, forceDeviceChange = true) => {
            if (!__classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f") || typeof __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").changeAudioOutputDevice !== "function") {
                const msg = "ChangeAudioOutputDevice unavailable";
                console.error(`[crm-websdk] ${msg}`);
                if (onError)
                    onError(msg);
                return;
            }
            __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").changeAudioOutputDevice(deviceId, onSuccess, onError, forceDeviceChange);
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
_ExotelWebPhoneSDK_accessToken = new WeakMap(), _ExotelWebPhoneSDK_user = new WeakMap(), _ExotelWebPhoneSDK_exWebClient = new WeakMap(), _ExotelWebPhoneSDK_sipInfo = new WeakMap(), _ExotelWebPhoneSDK_call = new WeakMap();
exports.default = ExotelWebPhoneSDK;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsV2ViUGhvbmVTREsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXhvdGVsV2ViUGhvbmVTREsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFhO0FBQ2IseUVBQW9FO0FBSXBFLDJDQUEyQztBQWlEM0MsTUFBcUIsaUJBQWlCO0lBWXBDLFlBQVksV0FBbUIsRUFBRSxJQUFVO1FBWDNDLGlEQUFxQjtRQUNyQiwwQ0FBWTtRQUlaLGlEQUE4QjtRQUM5Qiw2Q0FBeUI7UUFHekIsMENBQVk7UUFzQ1osbUJBQWMsR0FBRyxHQUFHLEVBQUU7WUFDcEIsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3BDLHVCQUFBLElBQUksc0NBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUE7UUFFRCxxQkFBZ0IsR0FBRyxHQUFHLEVBQUU7WUFDdEIsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLFVBQVUsQ0FBQyx1QkFBQSxJQUFJLGtDQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSCx5QkFBb0IsR0FBRyxDQUNyQixPQUFZLEVBQ1osU0FBb0IsRUFDcEIsT0FBdUIsRUFDdkIsRUFBRTtZQUNGLHVCQUFBLElBQUksMkJBQVMsdUJBQUEsSUFBSSxzQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFBLENBQUM7WUFDekMsT0FBTyxDQUFDLGNBQWMsR0FBRyx1QkFBQSxJQUFJLHNDQUFhLENBQUMsY0FBYyxDQUFDO1lBQzFELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxXQUFXLENBQUMsY0FBYyxHQUFHLHVCQUFBLElBQUksc0NBQWEsQ0FBQyxjQUFjLENBQUM7WUFDOUQsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUM7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