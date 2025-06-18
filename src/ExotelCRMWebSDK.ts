import { icoreBaseURL, voipDomainSIP, voipDomain } from './Constants';
import { User } from "./User";
import { SIPAccountInfo } from "./SipAccountInfo";
import ExotelWebPhoneSDK from "./ExotelWebPhoneSDK";
import { ExotelCRMWebSDKError, ErrorCodes } from './ExotelCRMWebSDKError';

// Fetches account details, user details, and their settings
export default class ExotelCRMWebSDK {
  #accessToken: string;
  #agentUserID: string;
  #autoConnectVOIP: boolean;

  constructor(
    accessToken: string,
    agentUserID: string,
    autoConnectVOIP: boolean = false
  ) {
    if (!accessToken) {
      throw new ExotelCRMWebSDKError(
        'Access token is required for initialization',
        ErrorCodes.INVALID_ACCESS_TOKEN
      );
    }
    if (!agentUserID) {
      throw new ExotelCRMWebSDKError(
        'Agent User ID is required for initialization',
        ErrorCodes.INVALID_AGENT_USER_ID
      );
    }
    this.#accessToken = accessToken;
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
  ): Promise<ExotelWebPhoneSDK> {
    try {
      await this.#loadSettings();
      const sipInfo = this.#getSIPInfo();
      
      if (!sipInfo) {
        throw new ExotelCRMWebSDKError(
          'Failed to get SIP information. Please check if user data and app are properly configured.',
          ErrorCodes.SIP_INFO_MISSING
        );
      }

      const webPhone = new ExotelWebPhoneSDK(this.#accessToken, this.#userData);
      return await webPhone.Initialize(
        sipInfo,
        sofPhoneListenerCallback,
        this.#autoConnectVOIP,
        softPhoneRegisterEventCallBack,
        softPhoneSessionCallback
      );
    } catch (error) {
      if (error instanceof ExotelCRMWebSDKError) {
        throw error;
      }
      throw new ExotelCRMWebSDKError(
        'Failed to initialize ExotelCRMWebSDK',
        ErrorCodes.INITIALIZATION_FAILED,
        error
      );
    }
  }

  async #loadSettings() {
    // Load app
    try {
      const response = await fetch(`${icoreBaseURL}/v2/integrations/app`, {
        method: "GET",
        headers: { Authorization: this.#accessToken },
      });

      if (!response.ok) {
        throw new ExotelCRMWebSDKError(
          `Failed to load app settings: ${response.statusText}`,
          ErrorCodes.APP_LOAD_FAILED,
          { status: response.status }
        );
      }

      const appResponse = await response.json();
      this.#app = appResponse.Data;
    } catch (error) {
      if (error instanceof ExotelCRMWebSDKError) {
        throw error;
      }
      throw new ExotelCRMWebSDKError(
        'Failed to load app settings',
        ErrorCodes.APP_LOAD_FAILED,
        error
      );
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

      if (!settingsResponse.ok) {
        throw new ExotelCRMWebSDKError(
          `Failed to load app settings: ${settingsResponse.statusText}`,
          ErrorCodes.APP_SETTINGS_LOAD_FAILED,
          { status: settingsResponse.status }
        );
      }

      this.#appSettings = await settingsResponse.json();
    } catch (error) {
      if (error instanceof ExotelCRMWebSDKError) {
        throw error;
      }
      throw new ExotelCRMWebSDKError(
        'Failed to load app settings',
        ErrorCodes.APP_SETTINGS_LOAD_FAILED,
        error
      );
    }

    // Load user mapping for the tenant
    try {
      const response = await fetch(
        `${icoreBaseURL}/v2/integrations/usermapping?user_id=${this.#agentUserID}`,
        {
          method: "GET",
          headers: {
            Authorization: this.#accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new ExotelCRMWebSDKError(
          `Failed to load user mapping: ${response.statusText}`,
          ErrorCodes.USER_MAPPING_FAILED,
          { status: response.status }
        );
      }

      const userMappingResponse = await response.json();
      this.#userData = new User(userMappingResponse.Data);
    } catch (error) {
      if (error instanceof ExotelCRMWebSDKError) {
        throw error;
      }
      throw new ExotelCRMWebSDKError(
        'Failed to load user mapping',
        ErrorCodes.USER_MAPPING_FAILED,
        error
      );
    }
  }

  #getSIPInfo(): SIPAccountInfo {
    if (!this.#userData) {
      throw new ExotelCRMWebSDKError(
        'User data must be configured to get SIP info',
        ErrorCodes.SIP_INFO_MISSING
      );
    }
    if (!this.#app) {
      throw new ExotelCRMWebSDKError(
        'App must be configured to get SIP info',
        ErrorCodes.SIP_INFO_MISSING
      );
    }

    const sipAccountInfo: SIPAccountInfo = {
      userName: this.#userData.sipId.split(":")[1],
      authUser: this.#userData.sipId.split(":")[1],
      sipdomain: this.#app.ExotelAccountSid + "." + voipDomainSIP,
      domain: voipDomain + ":443",
      displayname: this.#userData.exotelUserName,
      secret: this.#userData.sipSecret,
      port: "443",
      security: "wss",
      endpoint: "wss"
    };
    return sipAccountInfo;
  }
}