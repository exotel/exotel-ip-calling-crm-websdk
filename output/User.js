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
            console.error("[crm-websdk] error decrypting sip secret", e);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywwREFBaUM7QUFXakM7SUFRRSxZQUFZLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGNBQWMsRUFDZCxXQUFXLEdBQ087UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxJQUFJLENBQUM7WUFDSCxzQ0FBc0M7WUFDdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDN0MsTUFBTSxRQUFRLEdBQUcsbUJBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQkFBUyxDQUFDLENBQUM7WUFFbkQsTUFBTSxFQUFFLEdBQUcsbUJBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsTUFBTSxTQUFTLEdBQUcsbUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTztZQUNwQyxhQUFhO1lBQ2IsRUFBRSxVQUFVLEVBQUUsbUJBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUNqRCxRQUFRLEVBQ1IsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLG1CQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUNyRSxDQUFDO1lBQ0YsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztDQUNGIn0=