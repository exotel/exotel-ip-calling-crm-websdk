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
            console.log("_EncSipSecret", { ciphertext });
            const keyBytes = crypto_js_1.default.enc.Hex.parse(Constants_1.publicKey);
            const iv = crypto_js_1.default.enc.Hex.parse(ciphertext.substring(0, 32));
            const encrypted = ciphertext.substring(32);
            const decrypted = crypto_js_1.default.AES.decrypt(
            // @ts-ignore
            { ciphertext: crypto_js_1.default.enc.Hex.parse(encrypted) }, keyBytes, { iv: iv, padding: crypto_js_1.default.pad.NoPadding, mode: crypto_js_1.default.mode.CFB });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywwREFBaUM7QUFXakMsTUFBYSxJQUFJO0lBUWYsWUFBWSxFQUNWLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUssRUFDTCxjQUFjLEVBQ2QsV0FBVyxHQUNPO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsSUFBSTtZQUNGLHNDQUFzQztZQUN0QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUM3QyxNQUFNLFFBQVEsR0FBRyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFTLENBQUMsQ0FBQztZQUVuRCxNQUFNLEVBQUUsR0FBRyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQyxNQUFNLFNBQVMsR0FBRyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1lBQ3BDLGFBQWE7WUFDYixFQUFFLFVBQVUsRUFBRSxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQ2pELFFBQVEsRUFDUixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLG1CQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsbUJBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQ3JFLENBQUM7WUFDRixPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFqRUQsb0JBaUVDIn0=