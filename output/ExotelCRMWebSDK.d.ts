import ExotelWebPhoneSDK from "./ExotelWebPhoneSDK";
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
export default class ExotelCRMWebSDK {
    #private;
    constructor(accesssToken: string, agentUserID: string, autoConnectVOIP?: boolean, sipContext?: SipRegisterContext | null);
    /**
     * Initialize CRMWebSDK, Phone Object and registers callbacks
     * @param sofPhoneListenerCallback // For incoming calls
     * @param softPhoneRegisterEventCallBack
     * @param softPhoneSessionCallback
     * @returns
     */
    Initialize(sofPhoneListenerCallback: any, softPhoneRegisterEventCallBack?: null, softPhoneSessionCallback?: null): Promise<ExotelWebPhoneSDK | void>;
}
