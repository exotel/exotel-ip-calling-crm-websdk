import ExotelWebPhoneSDK from "./ExotelWebPhoneSDK";
export default class ExotelCRMWebSDK {
    #private;
    constructor(accesssToken: string, agentUserID: string, autoConnectVOIP?: boolean);
    /**
     * Initialize CRMWebSDK, Phone Object and registers callbacks
     * @param sofPhoneListenerCallback // For incoming calls
     * @param softPhoneRegisterEventCallBack
     * @param softPhoneSessionCallback
     * @returns
     */
    Initialize(sofPhoneListenerCallback: any, softPhoneRegisterEventCallBack?: null, softPhoneSessionCallback?: null): Promise<ExotelWebPhoneSDK | void>;
}
