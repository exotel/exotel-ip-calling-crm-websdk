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
var _ExotelWebPhoneSDK_instances, _ExotelWebPhoneSDK_accessToken, _ExotelWebPhoneSDK_user, _ExotelWebPhoneSDK_softPhoneRegisterEventCallBack, _ExotelWebPhoneSDK_softPhoneCallListenerCallback, _ExotelWebPhoneSDK_exWebClient, _ExotelWebPhoneSDK_sipInfo, _ExotelWebPhoneSDK_softPhoneSessionCallback, _ExotelWebPhoneSDK_call, _ExotelWebPhoneSDK_callListenerCallback, _ExotelWebPhoneSDK_registerEventCallBack, _ExotelWebPhoneSDK_sessionCallback;
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const webrtc_client_sdk_1 = require("@exotel-npm-dev/webrtc-client-sdk");
const Constants_1 = require("./Constants");
class ExotelWebPhoneSDK {
    //this constructor is invoked when called from ippstn.js,
    constructor(accessToken, user) {
        _ExotelWebPhoneSDK_instances.add(this);
        _ExotelWebPhoneSDK_accessToken.set(this, void 0);
        _ExotelWebPhoneSDK_user.set(this, void 0);
        _ExotelWebPhoneSDK_softPhoneRegisterEventCallBack.set(this, void 0);
        _ExotelWebPhoneSDK_softPhoneCallListenerCallback.set(this, void 0);
        _ExotelWebPhoneSDK_exWebClient.set(this, void 0);
        _ExotelWebPhoneSDK_sipInfo.set(this, void 0);
        _ExotelWebPhoneSDK_softPhoneSessionCallback.set(this, void 0);
        _ExotelWebPhoneSDK_call.set(this, void 0);
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_accessToken, accessToken, "f"); // This access token is understood by icore which makes this SDK dependent on it
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_user, user, "f");
    }
    Initialize(sipInfo, softPhoneCallListenerCallback, autoConnectVOIP = false, softPhoneRegisterEventCallBack, softPhoneSessionCallback) {
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_sipInfo, sipInfo, "f");
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_softPhoneCallListenerCallback, softPhoneCallListenerCallback, "f");
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_softPhoneRegisterEventCallBack, softPhoneRegisterEventCallBack, "f");
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_softPhoneSessionCallback, softPhoneSessionCallback, "f");
        __classPrivateFieldSet(this, _ExotelWebPhoneSDK_exWebClient, new webrtc_client_sdk_1.ExotelWebClient(), "f");
        __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").initWebrtc(sipInfo, __classPrivateFieldGet(this, _ExotelWebPhoneSDK_instances, "m", _ExotelWebPhoneSDK_registerEventCallBack), __classPrivateFieldGet(this, _ExotelWebPhoneSDK_instances, "m", _ExotelWebPhoneSDK_callListenerCallback), __classPrivateFieldGet(this, _ExotelWebPhoneSDK_instances, "m", _ExotelWebPhoneSDK_sessionCallback));
        if (autoConnectVOIP) {
            this.RegisterDevice();
        }
    }
    RegisterDevice() {
        __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").DoRegister();
    }
    UnRegisterDevice() {
        __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").unregister(__classPrivateFieldGet(this, _ExotelWebPhoneSDK_sipInfo, "f"));
    }
    AcceptCall() {
        var _a;
        (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.Answer();
    }
    RejectCall() {
        var _a;
        (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.Hangup();
    }
    MakeCall(number, callback) {
        return __awaiter(this, void 0, void 0, function* () {
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
             * SDK dependent on icore unfortunately
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
    }
    ToggleHoldButton() {
        var _a, _b;
        (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.HoldToggle();
        __classPrivateFieldGet(this, _ExotelWebPhoneSDK_softPhoneCallListenerCallback, "f").call(this, "holdtoggle", (_b = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _b === void 0 ? void 0 : _b.callDetails());
    }
    ToggleMuteButton() {
        var _a;
        __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f").Mute();
        __classPrivateFieldGet(this, _ExotelWebPhoneSDK_softPhoneCallListenerCallback, "f").call(this, "mutetoggle", (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.callDetails());
    }
}
_ExotelWebPhoneSDK_accessToken = new WeakMap(), _ExotelWebPhoneSDK_user = new WeakMap(), _ExotelWebPhoneSDK_softPhoneRegisterEventCallBack = new WeakMap(), _ExotelWebPhoneSDK_softPhoneCallListenerCallback = new WeakMap(), _ExotelWebPhoneSDK_exWebClient = new WeakMap(), _ExotelWebPhoneSDK_sipInfo = new WeakMap(), _ExotelWebPhoneSDK_softPhoneSessionCallback = new WeakMap(), _ExotelWebPhoneSDK_call = new WeakMap(), _ExotelWebPhoneSDK_instances = new WeakSet(), _ExotelWebPhoneSDK_callListenerCallback = function _ExotelWebPhoneSDK_callListenerCallback(callObj, eventType, sipInfo) {
    var _a;
    // let call = this._exWebClient.getCall();
    __classPrivateFieldSet(this, _ExotelWebPhoneSDK_call, __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").getCall(), "f");
    callObj.callFromNumber = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").callFromNumber;
    console.info((_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_call, "f")) === null || _a === void 0 ? void 0 : _a.callDetails());
    __classPrivateFieldGet(this, _ExotelWebPhoneSDK_softPhoneCallListenerCallback, "f").call(this, eventType, callObj);
}, _ExotelWebPhoneSDK_registerEventCallBack = function _ExotelWebPhoneSDK_registerEventCallBack(state, sipInfo) {
    __classPrivateFieldGet(this, _ExotelWebPhoneSDK_softPhoneRegisterEventCallBack, "f").call(this, state);
}, _ExotelWebPhoneSDK_sessionCallback = function _ExotelWebPhoneSDK_sessionCallback(state, sipInfo) {
    console.info("Session state:", state, "for number...", sipInfo);
    __classPrivateFieldGet(this, _ExotelWebPhoneSDK_softPhoneSessionCallback, "f").call(this, state, sipInfo);
};
exports.default = ExotelWebPhoneSDK;
