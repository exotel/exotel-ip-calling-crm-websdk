"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopMicDiagnosticsTest = exports.startMicDiagnosticsTest = exports.stopNetworkDiagnostics = exports.startNetworkDiagnostics = exports.stopSpeakerDiagnosticsTest = exports.startSpeakerDiagnosticsTest = exports.closeDiagnostics = exports.initDiagnostics = void 0;
/**
 * Re-export diagnostics helpers from webrtc-client-sdk so CRM consumers
 * (e.g. Cleopatra) never need a direct webrtc-* dependency.
 *
 * Prefer these over ExotelWebClient.startNetworkDiagnostics, which can call
 * DoRegister() on an un-initialised sipAccountInfo.
 */
var DiagnosticsListener_1 = require("@exotel-npm-dev/webrtc-client-sdk/src/api/omAPI/DiagnosticsListener");
Object.defineProperty(exports, "initDiagnostics", { enumerable: true, get: function () { return DiagnosticsListener_1.initDiagnostics; } });
Object.defineProperty(exports, "closeDiagnostics", { enumerable: true, get: function () { return DiagnosticsListener_1.closeDiagnostics; } });
Object.defineProperty(exports, "startSpeakerDiagnosticsTest", { enumerable: true, get: function () { return DiagnosticsListener_1.startSpeakerDiagnosticsTest; } });
Object.defineProperty(exports, "stopSpeakerDiagnosticsTest", { enumerable: true, get: function () { return DiagnosticsListener_1.stopSpeakerDiagnosticsTest; } });
Object.defineProperty(exports, "startNetworkDiagnostics", { enumerable: true, get: function () { return DiagnosticsListener_1.startNetworkDiagnostics; } });
Object.defineProperty(exports, "stopNetworkDiagnostics", { enumerable: true, get: function () { return DiagnosticsListener_1.stopNetworkDiagnostics; } });
Object.defineProperty(exports, "startMicDiagnosticsTest", { enumerable: true, get: function () { return DiagnosticsListener_1.startMicDiagnosticsTest; } });
Object.defineProperty(exports, "stopMicDiagnosticsTest", { enumerable: true, get: function () { return DiagnosticsListener_1.stopMicDiagnosticsTest; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ25vc3RpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGlhZ25vc3RpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsMkdBUzZFO0FBUjNFLHNIQUFBLGVBQWUsT0FBQTtBQUNmLHVIQUFBLGdCQUFnQixPQUFBO0FBQ2hCLGtJQUFBLDJCQUEyQixPQUFBO0FBQzNCLGlJQUFBLDBCQUEwQixPQUFBO0FBQzFCLDhIQUFBLHVCQUF1QixPQUFBO0FBQ3ZCLDZIQUFBLHNCQUFzQixPQUFBO0FBQ3RCLDhIQUFBLHVCQUF1QixPQUFBO0FBQ3ZCLDZIQUFBLHNCQUFzQixPQUFBIn0=