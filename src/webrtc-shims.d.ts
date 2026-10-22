declare module "@exotel-npm-dev/webrtc-client-sdk/src/api/omAPI/DiagnosticsListener" {
  export function initDiagnostics(
    setDiagnosticsReportCallback: any,
    keyValueSetCallback: any
  ): void;
  export function closeDiagnostics(): void;
  export function startSpeakerDiagnosticsTest(webrtcSIPPhone: any): void;
  export function stopSpeakerDiagnosticsTest(
    speakerTestResponse: any,
    webrtcSIPPhone: any
  ): void;
  export function startNetworkDiagnostics(): void;
  export function stopNetworkDiagnostics(): void;
  export function startMicDiagnosticsTest(): void;
  export function stopMicDiagnosticsTest(micTestResponse: any): void;
}

declare module "@exotel-npm-dev/webrtc-client-sdk/src/api/LogManager" {
  const LogManager: {
    onLog: (level: any, msg: any, args?: any[]) => void;
    getLogs: () => string[];
    downloadLogs: () => void;
  };
  export default LogManager;
}
