/**
 * Re-export diagnostics helpers from webrtc-client-sdk so CRM consumers
 * (e.g. Cleopatra) never need a direct webrtc-* dependency.
 *
 * Prefer these over ExotelWebClient.startNetworkDiagnostics, which can call
 * DoRegister() on an un-initialised sipAccountInfo.
 */
export {
  initDiagnostics,
  closeDiagnostics,
  startSpeakerDiagnosticsTest,
  stopSpeakerDiagnosticsTest,
  startNetworkDiagnostics,
  stopNetworkDiagnostics,
  startMicDiagnosticsTest,
  stopMicDiagnosticsTest,
} from "@exotel-npm-dev/webrtc-client-sdk/src/api/omAPI/DiagnosticsListener";
