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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkNBQXdDO0FBQ3hDLDBEQUFpQztBQVdqQyxNQUFhLElBQUk7SUFRZixZQUFZLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGNBQWMsRUFDZCxXQUFXLEdBQ087UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxJQUFJO1lBQ0Ysc0NBQXNDO1lBQ3RDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sUUFBUSxHQUFHLG1CQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQVMsQ0FBQyxDQUFDO1lBRW5ELE1BQU0sRUFBRSxHQUFHLG1CQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sU0FBUyxHQUFHLG1CQUFRLENBQUMsR0FBRyxDQUFDLE9BQU87WUFDcEMsYUFBYTtZQUNiLEVBQUUsVUFBVSxFQUFFLG1CQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFDakQsUUFBUSxFQUNSLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsbUJBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxtQkFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FDckUsQ0FBQztZQUNGLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQWpFRCxvQkFpRUMifQ==