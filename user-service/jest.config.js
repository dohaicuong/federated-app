module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/src/schema/**/__tests__/*.spec.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
}