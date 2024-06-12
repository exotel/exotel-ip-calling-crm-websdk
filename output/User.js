"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Constants_1 = require("./Constants");
const crypto_js_1 = __importDefault(require("crypto-js"));
class User {
    constructor({ AppID, AppUserId, SipSecret, SipId, ExotelUserName, customer_id, }) {
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
    get sipSecret() {
        try {
            // Decrypt sip secret using public key
            const ciphertext = this._EncSipSecret;
            const keyBytes = crypto_js_1.default.enc.Hex.parse(Constants_1.publicKey);
            const iv = crypto_js_1.default.enc.Hex.parse(ciphertext.substring(0, 32));
            const encrypted = ciphertext.substring(32);
            const decrypted = crypto_js_1.default.AES.decrypt(crypto_js_1.default.enc.Hex.parse(encrypted).toString(), keyBytes, {
                iv: iv,
                padding: crypto_js_1.default.pad.NoPadding,
                mode: crypto_js_1.default.mode.CFB,
            });
            return decrypted.toString(crypto_js_1.default.enc.Utf8);
        }
        catch (e) {
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
exports.User = User;
