# Changelog


## 2.0.0


Compared with **1.3.0** (v1.3.0, 4 Feb 2026). Major bump. Three changes alter existing CRM integrations.


### Breaking


**Initialize() rejects instead of resolving empty.** A failed settings load used to log and return, so await Initialize(...) became undefined. Missing SIP info used to warn and return. Both now throw. The settings error is rethrown as-is. Missing SIP info throws Error("[crm-websdk] No SIP info available, initialization aborted."). Callers that treated a resolved undefined as failure need try/catch. The TypeScript return type is still Promise<ExotelWebPhoneSDK | void>, and the README still describes that contract.


**RegisterDevice() and UnRegisterDevice() return Promise<void>.** They used to return nothing and send SIP immediately. They are now queued on one chain. A newer call bumps a generation counter, and an older queued call returns without sending. UnRegisterDevice() resolves after the client unregister handoff. On a webrtc client without that handoff, it resolves after 500ms, the same delay unregister() already uses. JavaScript callers that ignore the return value still run. TypeScript signatures change, and anything that sequences register and unregister must await the promise.


**@exotel-npm-dev/webrtc-client-sdk moves from ^3.0.4 to ^3.0.17.** 1.3.0 locked 3.0.4. The old range already allowed 3.0.16 and later, so an unpinned install could already be on auto-retry. 2.0.0 makes 3.0.17 the floor. From webrtc-client-sdk 3.0.16, ExotelWebClient starts with auto-retry on. A transport failure, or a silent network drop reported as registration unregistered, re-registers after 5 seconds and keeps retrying until it succeeds or auto-retry is turned off. RegisterDevice() calls enableAutoRetry() before DoRegister(). UnRegisterDevice() calls disableAutoRetry() before UnRegister(), including a retry already armed for the current session. An agent who unregisters stays offline. An agent who stays registered is re-registered after a drop without any app code.


### Added


The constructor takes an optional fourth argument, SipRegisterContext (accountSid, region, voipDomain, optional icoreBaseURL). Omit it and the SDK still uses the app ExotelAccountSid, the hardcoded registrar, and https://integrationscore.mum1.exotel.com. When it is set, those values are used for the app, app-settings, and usermapping requests, and region and account_sid are added to the usermapping query. MakeCall still posts to the hardcoded icore host.
ChangeAudioInputDevice(deviceId, onSuccess?, onError?, forceDeviceChange = true) and ChangeAudioOutputDevice(...) forward to the webrtc client. If the client has no such method, they call onError and do not throw.
The package exports ./diagnostics and ./logging, and the root entry re-exports the same symbols: initDiagnostics, closeDiagnostics, speaker, network, and mic diagnostics, plus LogManager.
The session callback may take a third argument, error, and a fourth, eventData. Existing two-argument callbacks still work. eventData is set for signaling-state-change and connection-state-change as { state }, and for init-get-stats as { pc, callId, username }. pc is a live RTCPeerConnection. stop-call-stat passes undefined.


### Fixes


The WebSocket host keeps an existing numeric port and otherwise gets :443. The default voip.in1.exotel.com:443 used to be sent as voip.in1.exotel.com:443:443. SIP.js reads the port from split(":")[1], so the port stayed 443. The host string stored on the account is now a single :443.
A session event with no session callback no longer throws. The SDK skips the call when the callback was omitted.


### Behavior inherited from webrtc-client-sdk 3.0.5–3.0.17


These apply to every 2.0.0 install because the CRM SDK embeds that client. callDetails() is what the CRM call listener receives.


| Version | What integrators will see |
| --- | --- |
| 3.0.5 | Public-IP fetch removed from initWebrtc, fixing a registration race. |
| 3.0.6 | Noise-suppression fix. Contact parameters include the wss transport. |
| 3.0.13 | Default incoming ring is 30 seconds, up from about 15. Ringtone auto-start is on. Logger callbacks receive the real severity (log, info, warn, error) instead of log for every line. |
| 3.0.15 | legSid is read from X-Exotel-LegSid and returned by callDetails(). callSid, callId, and legSid no longer carry over from the previous call. sipHeaders is populated again, including custom X-* headers. SIP.js stores names headerized, so X-Exotel-CallSid is keyed X-Exotel-Callsid. |
| 3.0.16 | Auto-retry, covered above. Session callbacks get an error on WebSocket disconnect. |
| 3.0.17 | Fourth session-callback argument, covered above. Connection-state changes are forwarded into that session event. |
