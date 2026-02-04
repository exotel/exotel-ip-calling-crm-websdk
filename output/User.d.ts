interface ConstructorParams {
    AppID: string;
    AppUserId: string;
    SipSecret: string;
    SipId: string;
    ExotelUserName: string;
    customer_id: string;
}
export declare class User {
    private _AppId;
    private _AppUserId;
    private _EncSipSecret;
    private _SipId;
    private _customerId;
    private _exotelUserName;
    constructor({ AppID, AppUserId, SipSecret, SipId, ExotelUserName, customer_id, }: ConstructorParams);
    get appId(): string;
    get appUserId(): string;
    get sipSecret(): string;
    get sipId(): string;
    get exotelUserName(): string;
    get customerId(): string;
}
export {};
