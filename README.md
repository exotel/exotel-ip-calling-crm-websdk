# ExotelCRMWebSDK (Beta)

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://apache.org/licenses/LICENSE-2.0)

## Overview

**ExotelCRMWebSDK** enables seamless integration of Exotel's IP calling platform into your CRM or web application. It is designed for external developer partners who want to add robust calling features to their products with minimal effort.

> **Note:** This package is open for use and integration, but not for modification. Please contact Exotel for feature requests or issues.


# Steps

## 1. Using the Package in a Project:
### For npm users:

Refer to the [sample project](https://github.com/exotel/exotel-voip-websdk-crm-sample-app) or follow the steps below:

#### Steps:
1. You can install the package using npm:
```bash
npm install git+https://github.com/exotel/exotel-ip-calling-crm-websdk#^v1.0.0
```
2. Simply import the ExotelCRMWebSDK in your code like this:

```js
import ExotelCRMWebSDK from "exotel-ip-calling-crm-websdk";
```

### For Non-npm users:
If you are not using a package manager like NPM, you can directly use the pre-built bundle provided in this repository.

#### Steps:

1. **Download the latest release** from the [GitHub Releases page](https://github.com/ExoAbhishek/exotel-ip-calling-crm-websdk/releases) as a `.zip` or `.tar.gz` file.
2. **Extract** the downloaded archive to your project directory.
3. **Locate the `target/` directory** in the extracted folder. It contains:

    target/
        ├── beep.wav
        ├── dtmf.wav
        ├── ringbacktone.wav
        ├── ringtone.wav
        ├── crmBundle.js
        └── crmBundle.js.LICENSE.txt

4. **Copy the entire `target/` folder** into your project.
5. **Include the SDK in your HTML:**
```html
<script src="./target/crmBundle.js"></script>
```
6. **Use the SDK as described below.**
7. > **Note:**
   > - The `output/` directory is for users who want to import the SDK as a module in Node.js or TypeScript projects.
   > - The `target/` directory is for users who want a single bundle for direct browser use (no npm required).
   > - If you want to rebuild the bundle yourself, run:
   >   ```bash
   >   npm install
   >   npm run release:build
   >   ```
   >   This will regenerate both `output/` and `target/` directories.

## 2. Configure crmWebSDK
You can configure crmWebSDK object like this:
```js
const crmWebSDK = new ExotelCRMWebSDK(accessToken, userId, true);
```
- **accessToken**: Generated using the [Create Authentication Token API](https://developer.exotel.com/api/ip-pstn-intermix-webrtc-sdk-integration#create-authentication-token)
- **userId**: Obtainable via [Application user management APIs](https://developer.exotel.com/api/ip-pstn-intermix-webrtc-sdk-integration#applications-user-management)
- **autoConnectVOIP**: If true, auto-connects device on initialization. If false, call `DoRegister` on `ExotelWebPhoneSDK` manually.

### 3. Initialize the SDK
```js
const crmWebPhone = await crmWebSDK.Initialize(HandleCallEvents, RegisterationEvent);
```
- `HandleCallEvents`: Callback for incoming call events
- `RegisterationEvent`: (Optional) Callback for registration events
- `softPhoneSessionCallback`: (Optional) Callback for session events

### 4. Use the ExotelWebPhoneSDK
The `Initialize` method returns an `ExotelWebPhoneSDK` instance. You can now:
- Register/unregister device
- Accept/hangup calls
- Make calls
- Toggle hold/mute

#### Example:
```js
crmWebPhone.RegisterDevice();
crmWebPhone.MakeCall('9876543210', (status, data) => {
  if (status === 'success') {
    // handle call success
  }
});
```

## API Reference

### ExotelCRMWebSDK
- **constructor(accessToken, userId, autoConnectVOIP = false)**
- **Initialize(callListenerCallback, registerEventCallback?, sessionCallback?)**: Promise<ExotelWebPhoneSDK | void>

### ExotelWebPhoneSDK
   
   1. **RegisterDevice**: Registers the device with the call server.
   2. **UnRegisterDevice**: Un-registers the device from the call server.
   3. **AcceptCall**: Accept call
   4. **HangupCall**: Disconnect call
   5. **MakeCall**: (async) Method that places a call
        
        **Number**: A number to dial

        **dialCallback**: It is called after the call request is made to the server (An actual call may start after this with a slight day).

        **CustomField**: String; Any application-specific value like order id that will be passed back as a parameter in status callback.

   7. **ToggleHold**: Toggle state hold/un-hold state of a call. This state needs to be maintained by the client
   8. **ToggleMute** Toggle state mute/un-mute state of a call. This state needs to be maintained by the client

## Project Structure

```
src/
├── core/                # Core SDK and models
│   ├── ExotelCRMWebSDK.ts
│   ├── ExotelWebPhoneSDK.ts
│   ├── User.ts
│   └── SipAccountInfo.ts
├── interfaces/          # TypeScript interfaces
│   └── IWebRTCClient.ts
├── implementations/     # Implementations for interfaces
│   ├── WebRTCClientImpl.ts
│   └── MockWebRTCClient.ts
├── __tests__/           # Test files
├── __mocks__/           # Jest mocks
```

## Building & Testing

To build the SDK:
```bash
npm run build
```

To run tests (with coverage):
```bash
npm test
```

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](https://apache.org/licenses/LICENSE-2.0) file for details.

---