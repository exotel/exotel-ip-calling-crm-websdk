import { icoreBaseURL, voipDomainSIP, voipDomain } from "./Constants";
import { User } from "./User";
import { SIPAccountInfo } from "./SipAccountInfo";
import ExotelWebPhoneSDK from "./ExotelWebPhoneSDK";

// Fetches account details, user details, and their settings
export default class ExotelCRMWebSDK {
  #accessToken: string;
  #agentUserID: string;
  #autoConnectVOIP: boolean;

  constructor(
    accesssToken: string,
    agentUserID: string,
    autoConnectVOIP: boolean = false
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
      return;
    }

    const sipInfo = this.#getSIPInfo();
    console.info("[crm-websdk] sipInfo", { sipInfo });
    if (!sipInfo) {
      console.warn(
        "[crm-websdk] No SIP info available, initialization aborted."
      );
      return;
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

  async #loadSettings() {
    // Load app

    var response = await fetch(`${icoreBaseURL}/v2/integrations/app`, {
      method: "GET",
      headers: { Authorization: this.#accessToken },
    });

    var appResponse = await response.json();
    if (response.status === 404) {
      throw new Error(`Failed to load app. App not found.`);
    } else if (!response.ok) {
      throw new Error(`Error fetching app. Status: ${response.status}, Error: ${JSON.stringify(appResponse["Error"])}`);
    }
    this.#app = appResponse.Data;
    /**
     * TODO: Right now app settings response returns preference related to UI widget
     * location, which doesn't exist yet for this CRMWebSDK.
     * Now that we have separated the UI widget and the webSDK, we need to make fetching app settings optional
     * ie make this request only when the UI widget is initialised
     */

    // Load app settings for the tenant

    response = await fetch(
      `${icoreBaseURL}/v2/integrations/app_setting`,
      {
        method: "GET",
        headers: { Authorization: this.#accessToken },
      }
    );
    
    var appSettingResponse= await response.json();
    if (response.status === 404) {
      throw new Error(`Failed to load app settings. App setting not found.`);
    } else if (!response.ok) {
      throw new Error(`Error fetching app setting. Status: ${response.status}, Error: ${JSON.stringify(appSettingResponse["Error"])}`);
    }
    this.#appSettings = appSettingResponse;


    // Load user mapping for the tenant

    response = await fetch(
      `${icoreBaseURL}/v2/integrations/usermapping?user_id=${this.#agentUserID}`,
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
      throw new Error(`User mapping not found for user_id: ${this.#agentUserID}`);
    } else if (userMappingResponse['Code'] >= 400) {
      throw new Error(`Error fetching user mapping. Status: ${response.status}, Error: ${JSON.stringify(userMappingResponse["Error"])}`);
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

    const sipAccountInfo: SIPAccountInfo = {
      userName: this.#userData.sipId.split(":")[1], // sipInfo.Username,
      authUser: this.#userData.sipId.split(":")[1], //sipInfo.Username,
      sipdomain: this.#app.ExotelAccountSid + "." + voipDomainSIP, //sipInfo.Domain,
      domain: voipDomain + ":443", // sipInfo.HostServer + ":" + sipInfo.Port,
      displayname: this.#userData.exotelUserName, //sipInfo.DisplayName,
      secret: this.#userData.sipSecret, //sipInfo.Password,
      port: "443", //sipInfo.Port,
      security: "wss", //sipInfo.Security,
      endpoint: "wss", //sipInfo.EndPoint
    };
    return sipAccountInfo;
  }
}
