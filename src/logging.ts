/**
 * Re-export LogManager so consumers can patch logging without importing
 * webrtc-client-sdk directly.
 */
// @ts-ignore — webrtc-client-sdk ships JS without full TS types for LogManager
export { default as LogManager } from "@exotel-npm-dev/webrtc-client-sdk/src/api/LogManager";
