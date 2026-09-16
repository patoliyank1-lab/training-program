// jest.config.ts
export default {
  preset: "ts-jest",
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    // This tells Jest: "If you see an import ending in .js, 
    // look for the same filename ending in .ts"
    '^(\\.\\.?\\/.+)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
