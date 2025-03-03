const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    watchForFileChanges: false,
    chromeWebSecurity: false,
    blockHosts: ["https://events.backtrace.io"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
