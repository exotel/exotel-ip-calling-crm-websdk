import { icoreBaseURL, voipDomainSIP, voipDomain } from "./Constants";
import { User } from "./User";
import { SIPAccountInfo } from "./SipAccountInfo";
import ExotelWebPhoneSDK from "./ExotelWebPhoneSDK";

/**
 * SIP.js takes the WebSocket port from domain.split(":")[1] and falls back
 * to 8089 when that segment is missing. Keep an existing numeric port.
 */
function withWssPort(host: string): string {
  const value = host.trim();
  const colon = value.lastIndexOf(":");
  if (colon > 0 && /^\d+$/.test(value.slice(colon + 1))) {
    return value;
  }
  return `${value}:443`;
}

/**
 * Dashboard softphone context. Omitted for CRM callers, who keep the
 * hardcoded registrar and the app's ExotelAccountSid.
 */
export type SipRegisterContext = {
  accountSid: string;
  region: string;
  voipDomain: string;
  icoreBaseURL?: string;
};

// Fetches account details, user details, and their settings
export default class ExotelCRMWebSDK {
  #accessToken: string;
  #agentUserID: string;
  #autoConnectVOIP: boolean;
  #sipContext: SipRegisterContext | null;

  constructor(
    accesssToken: string,
    agentUserID: string,
    autoConnectVOIP: boolean = false,
    sipContext: SipRegisterContext | null = null
  ) {
    if (!accesssToken) {
      console.error("[crm-websdk] empty access token passed");
      return;
    }
    if (!agentUserID) {
      console.error("[crm-websdk] empty agentUserID passed");
      return;
    }
    this.#accessToken = accesssToken;
    this.#agentUserID = agentUserID;
    this.#autoConnectVOIP = autoConnectVOIP;
    this.#sipContext = sipContext;
  }

  #app: { ExotelAccountSid: string };
  #appSettings: any;
  #userData: User;

  /**
   * Initialize CRMWebSDK, Phone Object and registers callbacks
   * @param sofPhoneListenerCallback // For incoming calls
   * @param softPhoneRegisterEventCallBack
   * @param softPhoneSessionCallback
   * @returns
   */
  async Initialize(
    sofPhoneListenerCallback: any,
    softPhoneRegisterEventCallBack = null,
    softPhoneSessionCallback = null
  ): Promise<ExotelWebPhoneSDK | void> {
    try {
      await this.#loadSettings();
    } catch (error) {
      console.error("[crm-websdk] Initialization failed ", error);
      throw error;
    }

    const sipInfo = this.#getSIPInfo();
    console.info("[crm-websdk] sipInfo", { sipInfo });
    if (!sipInfo) {
      throw new Error("[crm-websdk] No SIP info available, initialization aborted.");
    }

    const webPhone = new ExotelWebPhoneSDK(this.#accessToken, this.#userData);
    return webPhone.Initialize(
      sipInfo,
      sofPhoneListenerCallback,
      this.#autoConnectVOIP,
      softPhoneRegisterEventCallBack,
      softPhoneSessionCallback
    );
  }

  #icoreBase(): string {
    const fromContext = this.#sipContext && this.#sipContext.icoreBaseURL;
    return (fromContext || icoreBaseURL).replace(/\/$/, "");
  }

  async #loadSettings() {
    const base = this.#icoreBase();
    // Load app, then app settings, then usermapping. SIP info is built only
    // after the usermapping await, so a first-time CCM insert is finished.

    var response = await fetch(`${base}/v2/integrations/app`, {
      method: "GET",
      headers: { Authorization: this.#accessToken },
    });

    var appResponse = await response.json();
    if (response.status === 404) {
      throw new Error(`Failed to load app. App not found.`);
    } else if (!response.ok) {
      throw new Error(
        `Error fetching app. Status: ${
          response.status
        }, Error: ${JSON.stringify(appResponse["Error"])}`
      );
    }
    this.#app = appResponse.Data;
    /**
     * TODO: Right now app settings response returns preference related to UI widget
     * location, which doesn't exist yet for this CRMWebSDK.
     * Now that we have separated the UI widget and the webSDK, we need to make fetching app settings optional
     * ie make this request only when the UI widget is initialised
     */

    // Load app settings for the tenant

    response = await fetch(`${base}/v2/integrations/app_setting`, {
      method: "GET",
      headers: { Authorization: this.#accessToken },
    });

    var appSettingResponse = await response.json();
    if (response.status === 404) {
      throw new Error(`Failed to load app settings. App setting not found.`);
    } else if (!response.ok) {
      throw new Error(
        `Error fetching app setting. Status: ${
          response.status
        }, Error: ${JSON.stringify(appSettingResponse["Error"])}`
      );
    }
    this.#appSettings = appSettingResponse;

    // Load user mapping for the tenant

    const params = new URLSearchParams({ user_id: this.#agentUserID });
    if (this.#sipContext && this.#sipContext.region) {
      params.set("region", this.#sipContext.region);
    }
    if (this.#sipContext && this.#sipContext.accountSid) {
      params.set("account_sid", this.#sipContext.accountSid);
    }
    response = await fetch(
      `${base}/v2/integrations/usermapping?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: this.#accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    const userMappingResponse = await response.json();

    if (response.status === 404) {
      throw new Error(
        `User mapping not found for user_id: ${this.#agentUserID}`
      );
    } else if (userMappingResponse["Code"] >= 400) {
      throw new Error(
        `Error fetching user mapping. Status: ${
          response.status
        }, Error: ${JSON.stringify(userMappingResponse["Error"])}`
      );
    }

    this.#userData = new User(userMappingResponse.Data);
  }

  #getSIPInfo(): SIPAccountInfo | void {
    if (!this.#userData) {
      console.error("[crm-websdk] userData must be configured to get sip info");
      return;
    }
    if (!this.#app) {
      console.error("[crm-websdk] app must be configured to get sip info");
      return;
    }

    const accountSid =
      (this.#sipContext && this.#sipContext.accountSid) ||
      this.#app.ExotelAccountSid;
    const wssDomain =
      (this.#sipContext && this.#sipContext.voipDomain) || voipDomain;
    const sipAccountInfo: SIPAccountInfo = {
      userName: this.#userData.sipId.split(":")[1], // sipInfo.Username,
      authUser: this.#userData.sipId.split(":")[1], //sipInfo.Username,
      sipdomain: accountSid + "." + voipDomainSIP, //sipInfo.Domain,
      domain: withWssPort(wssDomain), // sipInfo.HostServer + ":" + sipInfo.Port,
      displayname: this.#userData.exotelUserName, //sipInfo.DisplayName,
      secret: this.#userData.sipSecret, //sipInfo.Password,
      port: "443", //sipInfo.Port,
      security: "wss", //sipInfo.Security,
      endpoint: "wss", //sipInfo.EndPoint
    };
    return sipAccountInfo;
  }
}
