import { User } from "./User";
import { SIPAccountInfo } from "./SipAccountInfo";
interface MakeCallCallback {
    (status: "success" | "failed", data: any): void;
}
interface CallEventData {
    callId: string;
    remoteId: string;
    remoteDisplayName: string;
    callDirection: string;
    callState: string;
    callDuration: string;
    callStartedTime: string;
    callEstablishedTime: string;
    callEndedTime: string;
    callAnswerTime: string;
    callEndReason: string;
    sessionId: string;
    callFromNumber?: string;
    status?: string;
}
type CallEvent = "incoming" | "connected" | "callEnded" | "holdtoggle" | "mutetoggle";
/**
 * CallListenerCallback is to handle incoming call event
 */
interface CallListenerCallback {
    (event: CallEvent, callData: CallEventData): void;
}
interface RegisterListenerCallback {
    (event: string): void;
}
/**
 * Soft-phone session events from webrtc-client-sdk.
 * error stays 3rd for backward compat; eventData is optional 4th for structured payloads
 * (e.g. init-get-stats { pc, callId, username }).
 */
type SoftPhoneSessionCallback = (state: string, phone?: string | SIPAccountInfo, error?: any, eventData?: any) => void;
export default class ExotelWebPhoneSDK {
    #private;
    _softPhoneRegisterEventCallBack: RegisterListenerCallback;
    _softPhoneCallListenerCallback: CallListenerCallback;
    _softPhoneSessionCallback: SoftPhoneSessionCallback;
    constructor(accessToken: string, user: User);
    Initialize(sipInfo: SIPAccountInfo, callListenerCallback: CallListenerCallback, autoConnectVOIP: boolean | undefined, registerEventCallBack: RegisterListenerCallback | null, sessionCallback: SoftPhoneSessionCallback | null): ExotelWebPhoneSDK;
    RegisterDevice: () => void;
    UnRegisterDevice: () => void;
    /**
     * #callListenerCallback is a wrapper over the listener callback
     * provided at the time of initialisation to allow us to log stuff
     * @param callObj
     * @param eventType
     * @param sipInfo
     */
    CallListenerCallback: (callObj: any, eventType: CallEvent, sipInfo: SIPAccountInfo) => void;
    RegisterEventCallBack: (state: string, sipInfo: SIPAccountInfo) => void;
    SessionCallback: (state: string, sipInfo: SIPAccountInfo, error?: any, eventData?: any) => void;
    AcceptCall: () => void;
    HangupCall: () => void;
    MakeCall: (number: string, callback: MakeCallCallback) => Promise<void>;
    ToggleHold: () => void;
    ToggleMute: () => void;
    SendDTMF: (digit: string) => void;
    /**
     * Switch the active microphone. Forwards to webrtc-client-sdk's
     * changeAudioInputDevice (replaces the sender track mid-call when possible).
     */
    ChangeAudioInputDevice: (deviceId: string, onSuccess?: (stream?: MediaStream) => void, onError?: (error: string) => void, forceDeviceChange?: boolean) => void;
    /**
     * Switch the active speaker / ringtone sink via setSinkId where supported.
     */
    ChangeAudioOutputDevice: (deviceId: string, onSuccess?: () => void, onError?: (error: string) => void, forceDeviceChange?: boolean) => void;
}
export {};
