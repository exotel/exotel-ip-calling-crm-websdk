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
                return;
            }
            const sipInfo = __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_getSIPInfo).call(this);
            console.info("[crm-websdk] sipInfo", { sipInfo });
            if (!sipInfo) {
                console.warn("[crm-websdk] No SIP info available, initialization aborted.");
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
        var response = yield fetch(`${Constants_1.icoreBaseURL}/v2/integrations/app`, {
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
        response = yield fetch(`${Constants_1.icoreBaseURL}/v2/integrations/app_setting`, {
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
        response = yield fetch(`${Constants_1.icoreBaseURL}/v2/integrations/usermapping?user_id=${__classPrivateFieldGet(this, _ExotelCRMWebSDK_agentUserID, "f")}`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsQ1JNV2ViU0RLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0V4b3RlbENSTVdlYlNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzRTtBQUN0RSxpQ0FBOEI7QUFFOUIsNEVBQW9EO0FBRXBELDREQUE0RDtBQUM1RCxNQUFxQixlQUFlO0lBS2xDLFlBQ0UsWUFBb0IsRUFDcEIsV0FBbUIsRUFDbkIsZUFBZSxHQUFZLEtBQUs7O1FBUGxDLCtDQUFxQjtRQUNyQiwrQ0FBcUI7UUFDckIsbURBQTBCO1FBb0IxQix1Q0FBbUM7UUFDbkMsK0NBQWtCO1FBQ2xCLDRDQUFnQjtRQWZkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDeEQsT0FBTztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU87UUFDVCxDQUFDO1FBQ0QsdUJBQUEsSUFBSSxnQ0FBZ0IsWUFBWSxNQUFBLENBQUM7UUFDakMsdUJBQUEsSUFBSSxnQ0FBZ0IsV0FBVyxNQUFBLENBQUM7UUFDaEMsdUJBQUEsSUFBSSxvQ0FBb0IsZUFBZSxNQUFBLENBQUM7SUFDMUMsQ0FBQztJQU1EOzs7Ozs7T0FNRztJQUNHLFVBQVU7NkRBQ2Qsd0JBQTZCLEVBQzdCLDhCQUE4QixHQUFHLElBQUksRUFDckMsd0JBQXdCLEdBQUcsSUFBSTtZQUUvQixJQUFJLENBQUM7Z0JBQ0gsTUFBTSx1QkFBQSxJQUFJLGlFQUFjLE1BQWxCLElBQUksQ0FBZ0IsQ0FBQztZQUM3QixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxFQUFFLEtBQUssQ0FBQyxDQUFD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