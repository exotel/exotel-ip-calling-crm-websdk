export class ExotelCRMWebSDKError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ExotelCRMWebSDKError';
  }
}

export const ErrorCodes = {
  INVALID_ACCESS_TOKEN: 'INVALID_ACCESS_TOKEN',
  INVALID_AGENT_USER_ID: 'INVALID_AGENT_USER_ID',
  APP_LOAD_FAILED: 'APP_LOAD_FAILED',
  APP_SETTINGS_LOAD_FAILED: 'APP_SETTINGS_LOAD_FAILED',
  USER_MAPPING_FAILED: 'USER_MAPPING_FAILED',
  SIP_INFO_MISSING: 'SIP_INFO_MISSING',
  INITIALIZATION_FAILED: 'INITIALIZATION_FAILED'
} as const; 