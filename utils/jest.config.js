module.exports = {
  testEnvironment: 'node',
  globalSetup: './test/globalSetup.js',
  globalTeardown: './test/globalTeardown.js',
  setupFilesAfterEnv: ['./test/setupFile.js'],
}
