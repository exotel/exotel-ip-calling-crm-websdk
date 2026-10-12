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
var _ExotelWebPhoneSDK_accessToken, _ExotelWebPhoneSDK_user, _ExotelWebPhoneSDK_exWebClient, _ExotelWebPhoneSDK_sipInfo, _ExotelWebPhoneSDK_call, _ExotelWebPhoneSDK_opTail, _ExotelWebPhoneSDK_opGen, _ExotelWebPhoneSDK_enqueue;
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
        // One chain so a delayed UNREGISTER cannot land after the next REGISTER.
        _ExotelWebPhoneSDK_opTail.set(this, Promise.resolve());
        _ExotelWebPhoneSDK_opGen.set(this, 0);
        /**
         * Latest intent wins. A newer ON or OFF bumps the generation so the older
         * chain link returns without sending SIP.
         */
        _ExotelWebPhoneSDK_enqueue.set(this, (work) => {
            var _a;
            const gen = __classPrivateFieldSet(this, _ExotelWebPhoneSDK_opGen, (_a = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_opGen, "f"), ++_a), "f");
            const run = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_opTail, "f").then(() => work(gen));
            __classPrivateFieldSet(this, _ExotelWebPhoneSDK_opTail, run.then(() => undefined, () => undefined), "f");
            return run;
        });
        this.RegisterDevice = () => {
            const client = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f");
            // Drop a delayed UNREGISTER before this REGISTER is sent.
            if (typeof client.cancelPendingUnregister === "function") {
                client.cancelPendingUnregister();
            }
            return __classPrivateFieldGet(this, _ExotelWebPhoneSDK_enqueue, "f").call(this, (gen) => __awaiter(this, void 0, void 0, function* () {
                if (gen !== __classPrivateFieldGet(this, _ExotelWebPhoneSDK_opGen, "f"))
                    return;
                __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").enableAutoRetry();
                __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").DoRegister();
            }));
        };
        this.UnRegisterDevice = () => {
            const client = __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f");
            if (typeof client.cancelPendingRegister === "function") {
                client.cancelPendingRegister();
            }
            if (typeof client.cancelPendingUnregister === "function") {
                client.cancelPendingUnregister();
            }
            return __classPrivateFieldGet(this, _ExotelWebPhoneSDK_enqueue, "f").call(this, (gen) => __awaiter(this, void 0, void 0, function* () {
                if (gen !== __classPrivateFieldGet(this, _ExotelWebPhoneSDK_opGen, "f"))
                    return;
                __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").disableAutoRetry();
                yield new Promise((resolve) => {
                    var _a;
                    if (gen !== __classPrivateFieldGet(this, _ExotelWebPhoneSDK_opGen, "f")) {
                        resolve();
                        return;
                    }
                    const phone = client;
                    client.unregisterHandoff = resolve;
                    __classPrivateFieldGet(this, _ExotelWebPhoneSDK_exWebClient, "f").UnRegister();
                    // Older webrtc clients have no handoff. Resolve after the same 500ms
                    // delay unregister() uses so the next REGISTER cannot overtake it.
                    if (typeof client.cancelPendingUnregister !== "function") {
                        client.unregisterHandoff = null;
                        setTimeout(resolve, 500);
                        return;
                    }
                    // unregister() already resolved the handoff, or it never scheduled
                    // the delay (nothing will call the handoff).
                    if (client.unregisterHandoff && !phone.pendingUnregisterTimer) {
                        (_a = phone.finishUnregisterHandoff) === null || _a === void 0 ? void 0 : _a.call(phone);
                    }
                });
            }));
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
_ExotelWebPhoneSDK_accessToken = new WeakMap(), _ExotelWebPhoneSDK_user = new WeakMap(), _ExotelWebPhoneSDK_exWebClient = new WeakMap(), _ExotelWebPhoneSDK_sipInfo = new WeakMap(), _ExotelWebPhoneSDK_call = new WeakMap(), _ExotelWebPhoneSDK_opTail = new WeakMap(), _ExotelWebPhoneSDK_opGen = new WeakMap(), _ExotelWebPhoneSDK_enqueue = new WeakMap();
exports.default = ExotelWebPhoneSDK;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsV2ViUGhvbmVTREsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRXhvdGVsV2ViUGhvbmVTREsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFhO0FBQ2IseUVBQW9FO0FBRXBFLDJDQUEyQztBQWlEM0MsTUFBcUIsaUJBQWlCO0lBZXBDLFlBQVksV0FBbUIsRUFBRSxJQUFVO1FBZDNDLGlEQUFxQjtRQUNyQiwwQ0FBWTtRQUlaLGlEQUE4QjtRQUM5Qiw2Q0FBeUI7UUFHekIsMENBQVc7UUFDWCx5RUFBeUU7UUFDekUsb0NBQXlCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBQztRQUMzQyxtQ0FBUyxDQUFDLEVBQUM7UUFzQ1g7OztXQUdHO1FBQ0gscUNBQVcsQ0FBQyxJQUFvQyxFQUFpQixFQUFFOztZQUNqRSxNQUFNLEdBQUcsR0FBRyx1QkFBRSxJQUFJLDZCQUFKLDRCQUFBLElBQUksZ0NBQU8sRUFBYixJQUFhLE9BQUEsQ0FBQztZQUMxQixNQUFNLEdBQUcsR0FBRyx1QkFBQSxJQUFJLGlDQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLHVCQUFBLElBQUksNkJBQVcsR0FBRyxDQUFDLElBQUksQ0FDckIsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUNmLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FDaEIsTUFBQSxDQUFDO1lBQ0YsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUM7UUFFRixtQkFBYyxHQUFHLEdBQWtCLEVBQUU7WUFDbkMsTUFBTSxNQUFNLEdBQUcsdUJBQUEsSUFBSSxzQ0FFbEIsQ0FBQztZQUNGLDBEQUEwRDtZQUMxRCxJQUFJLE9BQU8sTUFBTSxDQUFDLHVCQUF1QixLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUN6RCxNQUFNLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUNuQyxD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