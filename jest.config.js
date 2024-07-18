module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
};
