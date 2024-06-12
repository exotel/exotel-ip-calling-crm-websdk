import { publicKey } from "./Constants";
import CryptoJS from "crypto-js";
export class User {
  private _AppId: string;
  private _AppUserId: string;
  private _EncSipSecret: string;
  private _SipId: string;
  private _customerId: string;
  private _exotelUserName: string;

  constructor({ AppID, AppUserId, SipSecret, SipId, ExotelUserName, customer_id }) {
    this._AppId = AppID;
    this._AppUserId = AppUserId;
    this._EncSipSecret = SipSecret;
    this._SipId = SipId;
    this._customerId = customer_id;
    this._exotelUserName = ExotelUserName
  }

  get appId() {
    return this._AppId;
  }

  get appUserId() {
    return this._AppUserId;
  }

  get sipSecret() {
    try {
      // Decrypt sip secret using public key
      const ciphertext = this._EncSipSecret;
      const keyBytes = CryptoJS.enc.Hex.parse(publicKey);
      const iv = CryptoJS.enc.Hex.parse(ciphertext.substring(0, 32));
      const encrypted = ciphertext.substring(32);
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(encrypted) },
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
