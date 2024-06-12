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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ExotelCRMWebSDK_instances, _ExotelCRMWebSDK_accessToken, _ExotelCRMWebSDK_agentUserID, _ExotelCRMWebSDK_autoConnectVOIP, _ExotelCRMWebSDK_app, _ExotelCRMWebSDK_appSettings, _ExotelCRMWebSDK_userData, _ExotelCRMWebSDK_loadSettings, _ExotelCRMWebSDK_getSIPInfo;
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const User_1 = require("./User");
const ExotelWebPhoneSDK_1 = __importDefault(require("./ExotelWebPhoneSDK"));
// Fetches account details, user details, and their settings
class ExotelCRMWebSDK {
    constructor(accesssToken, agentUserID, autoConnectVOIP = false) {
        _ExotelCRMWebSDK_instances.add(this);
        _ExotelCRMWebSDK_accessToken.set(this, void 0);
        _ExotelCRMWebSDK_agentUserID.set(this, void 0);
        _ExotelCRMWebSDK_autoConnectVOIP.set(this, void 0);
        _ExotelCRMWebSDK_app.set(this, void 0);
        _ExotelCRMWebSDK_appSettings.set(this, void 0);
        _ExotelCRMWebSDK_userData.set(this, void 0);
        if (!accesssToken) {
            console.error("empty access token passed");
            return;
        }
        if (!agentUserID) {
            console.error("empty agentUserID passed");
            return;
        }
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_accessToken, accesssToken, "f");
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_agentUserID, agentUserID, "f");
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_autoConnectVOIP, autoConnectVOIP, "f");
    }
    // Initialises CRMWebSDK, Phone Object and registers callbacks
    Initialize(sofPhoneListenerCallback_1) {
        return __awaiter(this, arguments, void 0, function* (sofPhoneListenerCallback, softPhoneRegisterEventCallBack = null, softPhoneSessionCallback = null) {
            yield __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_loadSettings).call(this);
            const sipInfo = __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_getSIPInfo).call(this);
            if (!sipInfo) {
                return;
            }
            const webPhone = new ExotelWebPhoneSDK_1.default(__classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f"), __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f"));
            return webPhone.Initialize(sipInfo, sofPhoneListenerCallback, __classPrivateFieldGet(this, _ExotelCRMWebSDK_autoConnectVOIP, "f"), softPhoneRegisterEventCallBack, softPhoneSessionCallback);
        });
    }
}
_ExotelCRMWebSDK_accessToken = new WeakMap(), _ExotelCRMWebSDK_agentUserID = new WeakMap(), _ExotelCRMWebSDK_autoConnectVOIP = new WeakMap(), _ExotelCRMWebSDK_app = new WeakMap(), _ExotelCRMWebSDK_appSettings = new WeakMap(), _ExotelCRMWebSDK_userData = new WeakMap(), _ExotelCRMWebSDK_instances = new WeakSet(), _ExotelCRMWebSDK_loadSettings = function _ExotelCRMWebSDK_loadSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        // Load app
        try {
            const response = yield fetch(`${Constants_1.icoreBaseURL}/v2/integrations/app`, {
                method: "GET",
                headers: { Authorization: __classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f") },
            });
            const appResponse = yield response.json();
            __classPrivateFieldSet(this, _ExotelCRMWebSDK_app, appResponse.Data, "f");
        }
        catch (error) {
            console.error("error loading app:", error);
        }
        /**
         * TODO: Right now app settings response returns preference related to UI widget
         * location, which doesn't exist yet for this CRMWebSDK.
         * Now that we have separated the UI widget and the webSDK, we need to make fetching app settings optional
         * ie make this request only when the UI widget is initialised
         */
        // Load app settings for the tenant
        try {
            const settingsResponse = yield fetch(`${Constants_1.icoreBaseURL}/v2/integrations/app_setting`, {
                method: "GET",
                headers: { Authorization: __classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f") },
            });
            __classPrivateFieldSet(this, _ExotelCRMWebSDK_appSettings, yield settingsResponse.json(), "f");
        }
        catch (error) {
            console.error("error loading app settings:", error);
        }
        // Load user mapping for the tenant
        try {
            const response = yield fetch(`${Constants_1.icoreBaseURL}/v2/integrations/usermapping?user_id=${__classPrivateFieldGet(this, _ExotelCRMWebSDK_agentUserID, "f")}`, {
                method: "GET",
                headers: {
                    Authorization: __classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f"),
                    "Content-Type": "application/json",
                },
            });
            const userMappingResponse = yield response.json();
            __classPrivateFieldSet(this, _ExotelCRMWebSDK_userData, new User_1.User(userMappingResponse.Data), "f");
        }
        catch (error) {
            console.error("error loading user details:", error);
        }
    });
}, _ExotelCRMWebSDK_getSIPInfo = function _ExotelCRMWebSDK_getSIPInfo() {
    if (!__classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f")) {
        console.error("userData must be configured to get sip info");
        return;
    }
    if (!__classPrivateFieldGet(this, _ExotelCRMWebSDK_app, "f")) {
        console.error("app must be configured to get sip info");
        return;
    }
    const sipAccountInfo = {
        userName: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipId.split(":")[1], // sipInfo.Username,
        authUser: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipId.split(":")[1], //sipInfo.Username,
        sipdomain: __classPrivateFieldGet(this, _ExotelCRMWebSDK_app, "f").ExotelAccountSid + "." + Constants_1.voipDomainSIP, //sipInfo.Domain,
        domain: Constants_1.voipDomain + ":443", // sipInfo.HostServer + ":" + sipInfo.Port,
        displayname: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").exotelUserName, //sipInfo.DisplayName,
        secret: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipSecret, //sipInfo.Password,
        port: "443", //sipInfo.Port,
        security: "wss", //sipInfo.Security,
        endpoint: "wss", //sipInfo.EndPoint
    };
    return sipAccountInfo;
};
exports.default = ExotelCRMWebSDK;
