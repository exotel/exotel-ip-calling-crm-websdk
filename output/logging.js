"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = void 0;
/**
 * Re-export LogManager so consumers can patch logging without importing
 * webrtc-client-sdk directly.
 */
// @ts-ignore — webrtc-client-sdk ships JS without full TS types for LogManager
var LogManager_1 = require("@exotel-npm-dev/webrtc-client-sdk/src/api/LogManager");
Object.defineProperty(exports, "LogManager", { enumerable: true, get: function () { return __importDefault(LogManager_1).default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7R0FHRztBQUNILCtFQUErRTtBQUMvRSxtRkFBNkY7QUFBcEYseUhBQUEsT0FBTyxPQUFjIn0=