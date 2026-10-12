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
var _ExotelCRMWebSDK_instances, _ExotelCRMWebSDK_accessToken, _ExotelCRMWebSDK_agentUserID, _ExotelCRMWebSDK_autoConnectVOIP, _ExotelCRMWebSDK_sipContext, _ExotelCRMWebSDK_app, _ExotelCRMWebSDK_appSettings, _ExotelCRMWebSDK_userData, _ExotelCRMWebSDK_icoreBase, _ExotelCRMWebSDK_loadSettings, _ExotelCRMWebSDK_getSIPInfo;
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const User_1 = require("./User");
const ExotelWebPhoneSDK_1 = __importDefault(require("./ExotelWebPhoneSDK"));
// Fetches account details, user details, and their settings
class ExotelCRMWebSDK {
    constructor(accesssToken, agentUserID, autoConnectVOIP = false, sipContext = null) {
        _ExotelCRMWebSDK_instances.add(this);
        _ExotelCRMWebSDK_accessToken.set(this, void 0);
        _ExotelCRMWebSDK_agentUserID.set(this, void 0);
        _ExotelCRMWebSDK_autoConnectVOIP.set(this, void 0);
        _ExotelCRMWebSDK_sipContext.set(this, void 0);
        _ExotelCRMWebSDK_app.set(this, void 0);
        _ExotelCRMWebSDK_appSettings.set(this, void 0);
        _ExotelCRMWebSDK_userData.set(this, void 0);
        if (!accesssToken) {
            console.error("[crm-websdk] empty access token passed");
            return;
        }
        if (!agentUserID) {
            console.error("[crm-websdk] empty agentUserID passed");
            return;
        }
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_accessToken, accesssToken, "f");
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_agentUserID, agentUserID, "f");
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_autoConnectVOIP, autoConnectVOIP, "f");
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_sipContext, sipContext, "f");
    }
    /**
     * Initialize CRMWebSDK, Phone Object and registers callbacks
     * @param sofPhoneListenerCallback // For incoming calls
     * @param softPhoneRegisterEventCallBack
     * @param softPhoneSessionCallback
     * @returns
     */
    Initialize(sofPhoneListenerCallback_1) {
        return __awaiter(this, arguments, void 0, function* (sofPhoneListenerCallback, softPhoneRegisterEventCallBack = null, softPhoneSessionCallback = null) {
            try {
                yield __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_loadSettings).call(this);
            }
            catch (error) {
                console.error("[crm-websdk] Initialization failed ", error);
                throw error;
            }
            const sipInfo = __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_getSIPInfo).call(this);
            console.info("[crm-websdk] sipInfo", { sipInfo });
            if (!sipInfo) {
                throw new Error("[crm-websdk] No SIP info available, initialization aborted.");
            }
            const webPhone = new ExotelWebPhoneSDK_1.default(__classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f"), __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f"));
            return webPhone.Initialize(sipInfo, sofPhoneListenerCallback, __classPrivateFieldGet(this, _ExotelCRMWebSDK_autoConnectVOIP, "f"), softPhoneRegisterEventCallBack, softPhoneSessionCallback);
        });
    }
}
_ExotelCRMWebSDK_accessToken = new WeakMap(), _ExotelCRMWebSDK_agentUserID = new WeakMap(), _ExotelCRMWebSDK_autoConnectVOIP = new WeakMap(), _ExotelCRMWebSDK_sipContext = new WeakMap(), _ExotelCRMWebSDK_app = new WeakMap(), _ExotelCRMWebSDK_appSettings = new WeakMap(), _ExotelCRMWebSDK_userData = new WeakMap(), _ExotelCRMWebSDK_instances = new WeakSet(), _ExotelCRMWebSDK_icoreBase = function _ExotelCRMWebSDK_icoreBase() {
    const fromContext = __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f") && __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f").icoreBaseURL;
    return (fromContext || Constants_1.icoreBaseURL).replace(/\/$/, "");
}, _ExotelCRMWebSDK_loadSettings = function _ExotelCRMWebSDK_loadSettings() {
    return __awaiter(this, void 0, void 0, function* () {
        const base = __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_icoreBase).call(this);
        // Load app, then app settings, then usermapping. SIP info is built only
        // after the usermapping await, so a first-time CCM insert is finished.
        var response = yield fetch(`${base}/v2/integrations/app`, {
            method: "GET",
            headers: { Authorization: __classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f") },
        });
        var appResponse = yield response.json();
        if (response.status === 404) {
            throw new Error(`Failed to load app. App not found.`);
        }
        else if (!response.ok) {
            throw new Error(`Error fetching app. Status: ${response.status}, Error: ${JSON.stringify(appResponse["Error"])}`);
        }
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_app, appResponse.Data, "f");
        /**
         * TODO: Right now app settings response returns preference related to UI widget
         * location, which doesn't exist yet for this CRMWebSDK.
         * Now that we have separated the UI widget and the webSDK, we need to make fetching app settings optional
         * ie make this request only when the UI widget is initialised
         */
        // Load app settings for the tenant
        response = yield fetch(`${base}/v2/integrations/app_setting`, {
            method: "GET",
            headers: { Authorization: __classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f") },
        });
        var appSettingResponse = yield response.json();
        if (response.status === 404) {
            throw new Error(`Failed to load app settings. App setting not found.`);
        }
        else if (!response.ok) {
            throw new Error(`Error fetching app setting. Status: ${response.status}, Error: ${JSON.stringify(appSettingResponse["Error"])}`);
        }
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_appSettings, appSettingResponse, "f");
        // Load user mapping for the tenant
        const params = new URLSearchParams({ user_id: __classPrivateFieldGet(this, _ExotelCRMWebSDK_agentUserID, "f") });
        if (__classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f") && __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f").region) {
            params.set("region", __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f").region);
        }
        if (__classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f") && __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f").accountSid) {
            params.set("account_sid", __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f").accountSid);
        }
        response = yield fetch(`${base}/v2/integrations/usermapping?${params.toString()}`, {
            method: "GET",
            headers: {
                Authorization: __classPrivateFieldGet(this, _ExotelCRMWebSDK_accessToken, "f"),
                "Content-Type": "application/json",
            },
        });
        const userMappingResponse = yield response.json();
        if (response.status === 404) {
            throw new Error(`User mapping not found for user_id: ${__classPrivateFieldGet(this, _ExotelCRMWebSDK_agentUserID, "f")}`);
        }
        else if (userMappingResponse["Code"] >= 400) {
            throw new Error(`Error fetching user mapping. Status: ${response.status}, Error: ${JSON.stringify(userMappingResponse["Error"])}`);
        }
        __classPrivateFieldSet(this, _ExotelCRMWebSDK_userData, new User_1.User(userMappingResponse.Data), "f");
    });
}, _ExotelCRMWebSDK_getSIPInfo = function _ExotelCRMWebSDK_getSIPInfo() {
    if (!__classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f")) {
        console.error("[crm-websdk] userData must be configured to get sip info");
        return;
    }
    if (!__classPrivateFieldGet(this, _ExotelCRMWebSDK_app, "f")) {
        console.error("[crm-websdk] app must be configured to get sip info");
        return;
    }
    const accountSid = (__classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f") && __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f").accountSid) ||
        __classPrivateFieldGet(this, _ExotelCRMWebSDK_app, "f").ExotelAccountSid;
    const wssDomain = (__classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f") && __classPrivateFieldGet(this, _ExotelCRMWebSDK_sipContext, "f").voipDomain) || Constants_1.voipDomain;
    const sipAccountInfo = {
        userName: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipId.split(":")[1], // sipInfo.Username,
        authUser: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipId.split(":")[1], //sipInfo.Username,
        sipdomain: accountSid + "." + Constants_1.voipDomainSIP, //sipInfo.Domain,
        // voipDomain already includes ":443" (see Constants.ts)
        domain: wssDomain, // sipInfo.HostServer + ":" + sipInfo.Port,
        displayname: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").exotelUserName, //sipInfo.DisplayName,
        secret: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipSecret, //sipInfo.Password,
        port: "443", //sipInfo.Port,
        security: "wss", //sipInfo.Security,
        endpoint: "wss", //sipInfo.EndPoint
    };
    return sipAccountInfo;
};
exports.default = ExotelCRMWebSDK;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsQ1JNV2ViU0RLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0V4b3RlbENSTVdlYlNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzRTtBQUN0RSxpQ0FBOEI7QUFFOUIsNEVBQW9EO0FBYXBELDREQUE0RDtBQUM1RCxNQUFxQixlQUFlO0lBTWxDLFlBQ0UsWUFBb0IsRUFDcEIsV0FBbUIsRUFDbkIsZUFBZSxHQUFZLEtBQUssRUFDaEMsVUFBVSxHQUE4QixJQUFJOztRQVQ5QywrQ0FBcUI7UUFDckIsK0NBQXFCO1FBQ3JCLG1EQUEwQjtRQUMxQiw4Q0FBdUM7UUFzQnZDLHVDQUFtQztRQUNuQywrQ0FBa0I7UUFDbEIsNENBQWdCO1FBaEJkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDeEQsT0FBTztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU87UUFDVCxDQUFDO1FBQ0QsdUJBQUEsSUFBSSxnQ0FBZ0IsWUFBWSxNQUFBLENBQUM7UUFDakMsdUJBQUEsSUFBSSxnQ0FBZ0IsV0FBVyxNQUFBLENBQUM7UUFDaEMsdUJBQUEsSUFBSSxvQ0FBb0IsZUFBZSxNQUFBLENBQUM7UUFDeEMsdUJBQUEsSUFBSSwrQkFBZSxVQUFVLE1BQUEsQ0FBQztJQUNoQyxDQUFDO0lBTUQ7Ozs7OztPQU1HO0lBQ0csVUFBVTs2REFDZCx3QkFBNkIsRUFDN0IsOEJBQThCLEdBQUcsSUFBSSxFQUNyQyx3QkFBd0IsR0FBRyxJQUFJO1lBRS9CLElBQUksQ0FBQztnQkFDSCxNQUFNLHVCQUFBLElBQUksaUVBQWMsTUFBbEIsSUFBSSxDQUFnQixDQUFDO1lBQzdCLENBQUM7WUFBQyxP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