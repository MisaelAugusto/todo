/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    'mocks/data': '<rootDir>/src/mocks/data'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coveragePathIgnorePatterns: ['src/main.tsx'],
  collectCoverageFrom: ['src/**/*.[jt]s?(x)', '!src/**/__tests__/*'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura', 'json-summary']
};
