const {
  collectCoverageFrom,
  coveragePathIgnorePatterns,
  coverageThreshold,
  watchPlugins,
  ...rest
} = require('kcd-scripts/jest')

module.exports = {
  ...rest,
  collectCoverageFrom,
  coveragePathIgnorePatterns: [
    ...coveragePathIgnorePatterns,
    '/__tests__/',
    '/__type_tests__/',
  ],
  coverageThreshold: {
    ...coverageThreshold,
    // TODO: Remove this
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  watchPlugins,
}
