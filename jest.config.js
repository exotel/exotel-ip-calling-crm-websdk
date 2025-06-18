module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@exotel-npm-dev/webrtc-client-sdk)/)',
  ],
  moduleNameMapper: {
    '^@exotel-npm-dev/webrtc-client-sdk$': '<rootDir>/src/__mocks__/webrtc-client-sdk.ts'
  }
}; 