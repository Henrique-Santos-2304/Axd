module.exports = {
  roots: ['<rootDir>/test'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/test/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },

  clearMocks: true,

  setupFilesAfterEnv: ['<rootDir>/test/setup/setup.ts'],
  moduleNameMapper: {
    '@useCases/(.*)': '<rootDir>/src/data/use_cases/$1',
    '@root/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
    '@main/(.*)': '<rootDir>/src/main/$1',
  },
};
