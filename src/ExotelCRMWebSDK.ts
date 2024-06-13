import { icoreBaseURL, voipDomainSIP, voipDomain } from './Constants';
import { User } from "./User";
import { SIPAccountInfo } from "./SipAccountInfo";
import ExotelWebPhoneSDK from "./ExotelWebPhoneSDK";

// Fetches account details, user details, and their settings
export default  class ExotelCRMWebSDK {
  #accessToken: string;
  #agentUserID: string;
  #autoConnectVOIP: boolean;

  constructor(
    accesssToken: string,
    agentUserID: string,
    autoConnectVOIP: boolean = false
  ) {
    if (!accesssToken) {
      console.error("empty access token passed");
      return;
    }
    if (!agentUserID) {
      console.error("empty agentUserID passed");
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
    await this.#loadSettings();
    const sipInfo = this.#getSIPInfo();
    console.info("sipInfo", {sipInfo});
    if (!sipInfo) {
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
    try {
      const response = await fetch(`${icoreBaseURL}/v2/integrations/app`, {
        method: "GET",
        headers: { Authorization: this.#accessToken },
      });

      const appResponse = await response.json();
      this.#app = appResponse.Data;
    } catch (error) {
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
      const settingsResponse = await fetch(
        `${icoreBaseURL}/v2/integrations/app_setting`,
        {
          method: "GET",
          headers: { Authorization: this.#accessToken },
        }
      );
      this.#appSettings = await settingsResponse.json();
    } catch (error) {
      console.error("error loading app settings:", error);
    }

    // Load user mapping for the tenant
    try {
      const response = await fetch(
        `${icoreBaseURL}/v2/integrations/usermapping?user_id=${
          this.#agentUserID
        }`,
        {
          method: "GET",
          headers: {
            Authorization: this.#accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      const userMappingResponse = await response.json();
      this.#userData = new User(userMappingResponse.Data);
    } catch (error) {
      console.error("error loading user details:", error);
    }
  }

  #getSIPInfo(): SIPAccountInfo | void {
    if (!this.#userData) {
      console.error("userData must be configured to get sip info");
      return;
    }
    if (!this.#app) {
      console.error("app must be configured to get sip info");
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