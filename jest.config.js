/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testMatch: ["**/dist/**/*.test.js"],
  testEnvironment: 'node',
};