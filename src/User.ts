import { publicKey } from './Constants';
import CryptoJS from "crypto-js";

interface ConstructorParams {
  AppID: string;
  AppUserId: string;
  SipSecret: string;
  SipId: string;
  ExotelUserName: string;
  customer_id: string;
}

export class User {
  private _AppId: string;
  private _AppUserId: string;
  private _EncSipSecret: string;
  private _SipId: string;
  private _customerId: string;
  private _exotelUserName: string;

  constructor({
    AppID,
    AppUserId,
    SipSecret,
    SipId,
    ExotelUserName,
    customer_id,
  }: ConstructorParams) {
    this._AppId = AppID;
    this._AppUserId = AppUserId;
    this._EncSipSecret = SipSecret;
    this._SipId = SipId;
    this._customerId = customer_id;
    this._exotelUserName = ExotelUserName;
  }

  get appId() {
    return this._AppId;
  }

  get appUserId() {
    return this._AppUserId;
  }

  get sipSecret(): string {
    try {
      // Decrypt sip secret using public key
      const ciphertext = this._EncSipSecret;
      const keyBytes = CryptoJS.enc.Hex.parse(publicKey);

      const iv = CryptoJS.enc.Hex.parse(ciphertext.substring(0, 32));
      const encrypted = ciphertext.substring(32);
      const decrypted = CryptoJS.AES.decrypt(
        CryptoJS.enc.Hex.parse(encrypted).toString(),
        keyBytes,
        {
          iv: iv,
          padding: CryptoJS.pad.NoPadding,
          mode: CryptoJS.mode.CFB,
        }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error("error decrypting sip secret", e);
    }
    return "";
  }

  get sipId() {
    return this._SipId;
  }

  get exotelUserName() {
    return this._exotelUserName;
  }

  get customerId() {
    return this._customerId;
  }
}
