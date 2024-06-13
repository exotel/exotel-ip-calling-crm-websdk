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
    /**
     * Initialize CRMWebSDK, Phone Object and registers callbacks
     * @param sofPhoneListenerCallback // For incoming calls
     * @param softPhoneRegisterEventCallBack
     * @param softPhoneSessionCallback
     * @returns
     */
    Initialize(sofPhoneListenerCallback, softPhoneRegisterEventCallBack = null, softPhoneSessionCallback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_loadSettings).call(this);
            const sipInfo = __classPrivateFieldGet(this, _ExotelCRMWebSDK_instances, "m", _ExotelCRMWebSDK_getSIPInfo).call(this);
            console.info("sipInfo", { sipInfo });
            if (!sipInfo) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhvdGVsQ1JNV2ViU0RLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0V4b3RlbENSTVdlYlNESy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzRTtBQUN0RSxpQ0FBOEI7QUFFOUIsNEVBQW9EO0FBRXBELDREQUE0RDtBQUM1RCxNQUFzQixlQUFlO0lBS25DLFlBQ0UsWUFBb0IsRUFDcEIsV0FBbUIsRUFDbkIsa0JBQTJCLEtBQUs7O1FBUGxDLCtDQUFxQjtRQUNyQiwrQ0FBcUI7UUFDckIsbURBQTBCO1FBb0IxQix1Q0FBbUM7UUFDbkMsK0NBQWtCO1FBQ2xCLDRDQUFnQjtRQWZkLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzNDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzFDLE9BQU87U0FDUjtRQUNELHVCQUFBLElBQUksZ0NBQWdCLFlBQVksTUFBQSxDQUFDO1FBQ2pDLHVCQUFBLElBQUksZ0NBQWdCLFdBQVcsTUFBQSxDQUFDO1FBQ2hDLHVCQUFBLElBQUksb0NBQW9CLGVBQWUsTUFBQSxDQUFDO0lBQzFDLENBQUM7SUFNRDs7Ozs7O09BTUc7SUFDRyxVQUFVLENBQ2Qsd0JBQTZCLEVBQzdCLDhCQUE4QixHQUFHLElBQUksRUFDckMsd0JBQXdCLEdBQUcsSUFBSTs7WUFFL0IsTUFBTSx1QkFBQSxJQUFJLGlFQUFjLE1BQWxCLElBQUksQ0FBZ0IsQ0FBQztZQUMzQixNQUFNLE9BQU8sR0FBRyx1QkFBQSxJQUFJLCtEQUFZLE1BQWhCLElBQUksQ0FBYyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJ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