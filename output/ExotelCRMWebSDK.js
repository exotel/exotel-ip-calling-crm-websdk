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
    Initialize(sofPhoneListenerCallback, softPhoneRegisterEventCallBack = null, softPhoneSessionCallback = null) {
        return __awaiter(this, void 0, void 0, function* () {
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
exports.default = ExotelCRMWebSDK;
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
        userName: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipId.split(":")[1],
        authUser: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipId.split(":")[1],
        sipdomain: __classPrivateFieldGet(this, _ExotelCRMWebSDK_app, "f").ExotelAccountSid + "." + Constants_1.voipDomainSIP,
        domain: Constants_1.voipDomain + ":443",
        displayname: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").exotelUserName,
        secret: __classPrivateFieldGet(this, _ExotelCRMWebSDK_userData, "f").sipSecret,
        port: "443",
        security: "wss",
        endpoint: "wss", //sipInfo.EndPoint
    };
    return sipAccountInfo;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsQ1JNV2ViU0RLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0V4b3RlbENSTVdlYlNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzRTtBQUN0RSxpQ0FBOEI7QUFFOUIsNEVBQW9EO0FBRXBELDREQUE0RDtBQUM1RCxNQUFxQixlQUFlO0lBS2xDLFlBQ0UsWUFBb0IsRUFDcEIsV0FBbUIsRUFDbkIsa0JBQTJCLEtBQUs7O1FBUGxDLCtDQUFxQjtRQUNyQiwrQ0FBcUI7UUFDckIsbURBQTBCO1FBb0IxQix1Q0FBbUM7UUFDbkMsK0NBQWtCO1FBQ2xCLDRDQUFnQjtRQWZkLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQ3hELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU87U0FDUjtRQUNELHVCQUFBLElBQUksZ0NBQWdCLFlBQVksTUFBQSxDQUFDO1FBQ2pDLHVCQUFBLElBQUksZ0NBQWdCLFdBQVcsTUFBQSxDQUFDO1FBQ2hDLHVCQUFBLElBQUksb0NBQW9CLGVBQWUsTUFBQSxDQUFDO0lBQzFDLENBQUM7SUFNRDs7Ozs7O09BTUc7SUFDRyxVQUFVLENBQ2Qsd0JBQTZCLEVBQzdCLDhCQUE4QixHQUFHLElBQUksRUFDckMsd0JBQXdCLEdBQUcsSUFBSTs7WUFFL0IsSUFBSTtnQkFDRixNQUFNLHVCQUFBLElBQUksaUVBQWMsTUFBbEIsSUFBSSxDQUFnQixDQUFDO2FBQzVCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDNUQsT0FBTzthQUNSO1lBRUQsTUFBTSxPQUFPLEdBQUcsdUJB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