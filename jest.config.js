/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    ".(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testMatch: ['<rootDir>/src/**/*.test.tsx'],
};
