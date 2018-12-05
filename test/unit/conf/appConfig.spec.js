import { expect, assert } from 'chai';
import {} from 'dotenv/config';
import { noPreserveCache } from 'proxyquire';

// Library to allow overriding dependencies (no cache)
const proxyquire = noPreserveCache();

let config;
function setAppConfig() {
  config = proxyquire(`${process.cwd()}/conf/appConfig`, {}).default;
}

// Default values in the config
const DEFAULT_PORT = '3000';
const DEFAULT_LOG = 'info';
const DEFAULT_LOG_ENABLE_CONSOLE = true;

// System environment variables
const {
  APP_NAME,
  APP_ENV,
  APP_VERSION,
  APP_PORT,
  LOG_ACCESS_PATH,
  LOG_ERROR_PATH,
  LOG_LEVEL,
  LOG_ENABLE_CONSOLE,
} = process.env;

describe('Application Config Test Suite', () => {
  let appConfig;
  let loggerConfig;

  // Load the config before running the test cases
  before(() => {
    setAppConfig();
    appConfig = config.app;
    loggerConfig = config.logger;
  });

  describe('`app` config', () => {
    it('`app` config should exist on config file', async () => expect(appConfig).to.not.empty);

    it('`APP_NAME` should exist on system environment variables', () => {
      assert(APP_NAME, "`APP_NAME` doesn't exist in system environment variables");
    });

    it('`app.name` should be the same with the `APP_NAME` from system environment variables', () => {
      assert(
        appConfig.name === APP_NAME,
        '`app.name` is not equal to the `APP_NAME` from system environment variables',
      );
    });

    it('`APP_ENV` should exist on system environment variables', () => {
      assert(APP_ENV, "APP_ENV doesn't exist in system environment variables");
    });

    it('`app.env` should be the same with the `APP_ENV` from system environment variables', () => {
      assert(
        appConfig.env === APP_ENV,
        '`app.env` is not equal to the `APP_ENV` from system environment variables',
      );
    });

    it('`APP_VERSION` should exist on system environment variables', () => {
      assert(APP_VERSION, "APP_VERSION doesn't exist in system environment variables");
    });

    it('`app.env` should be the same with the `APP_VERSION` from system environment variables', () => {
      assert(
        appConfig.version === APP_VERSION,
        '`app.version` is not equal to the `APP_VERSION` from system environment variables',
      );
    });

    it('`APP_PORT` should exist on system environment variables.', () => {
      assert(APP_PORT, "APP_PORT doesn't exist in system environment variables");
    });

    it('`app.port` should be the same with the `APP_PORT` from system environment variables', () => {
      assert(
        appConfig.port === APP_PORT,
        '`app.port` is not equal to the `APP_PORT` from system environment variables',
      );
    });

    it("`app.port` should use the default port if the APP_PORT doesn't exist in system environment variables", () => {
      const APP_PORT2 = process.env.APP_PORT;
      // Simulate the empty value of APP_PORT
      process.env.APP_PORT = '';
      setAppConfig();
      const { port } = config.app;
      assert(port === DEFAULT_PORT, '`app.port` is not using the default port');

      // Revert back the old value
      process.env.APP_PORT = APP_PORT2;
    });

    it('`app.basePath` should be `/api`', () => {
      assert(appConfig.basePath === '/api', '`appConfig.basePath` is not equal to `/api`');
    });
  });

  describe('`logger` config', () => {
    it('`logger` config should exist on config file', () => expect(loggerConfig).to.not.empty);

    it('`logger.name` should be the same with the `APP_NAME` from system environment variables', () => {
      assert(
        loggerConfig.name === APP_NAME,
        '`logger.name` is not equal to the `APP_NAME` from system environment variables',
      );
    });

    it('`LOG_ACCESS_PATH` should exist on system environment variables', () => {
      assert(LOG_ACCESS_PATH, "`LOG_ACCESS_PATH` doesn't exist in system environment variables");
    });

    it('`logger.access_log_file` should be the same with the `LOG_ACCESS_PATH` from system environment variables', () => {
      assert(
        loggerConfig.access_log_file === LOG_ACCESS_PATH,
        '`logger.access_log_file` is not equal to the `LOG_ACCESS_PATH` from system environment variables',
      );
    });

    it('`LOG_ERROR_PATH` exist on system environment variables', () => {
      assert(LOG_ERROR_PATH, "LOG_ERROR_PATH doesn't exist in system environment variables");
    });

    it('`logger.error_log_file` should be the same with the `LOG_ERROR_PATH` from system environment variables', () => {
      assert(
        loggerConfig.error_log_file === LOG_ERROR_PATH,
        '`logger.error_log_file` is not equal to the `LOG_ERROR_PATH` from system environment variables',
      );
    });

    it('`LOG_LEVEL` exist on system environment variables', () => {
      assert(LOG_LEVEL, "LOG_LEVEL doesn't exist in system environment variables");
    });

    it('`logger.level` should be the same with the `LOG_LEVEL` from system environment variables', () => {
      assert(
        loggerConfig.level === LOG_LEVEL,
        '`logger.level` is not equal to the `LOG_LEVEL` from system environment variables',
      );
    });

    it("`logger.level` should use the default log level if the LOG_LEVEL doesn't exist in system environment variables", () => {
      const LOG_LEVEL2 = process.env.LOG_LEVEL;
      // Simulate the empty value of LOG_LEVEL
      process.env.LOG_LEVEL = '';
      setAppConfig();
      const { level } = config.logger;
      assert(level === DEFAULT_LOG, '`logger.level` is not using the default log level');

      // Revert back the old value
      process.env.LOG_LEVEL = LOG_LEVEL2;
    });

    it('`LOG_ENABLE_CONSOLE` should exist on system environment variables', () => {
      assert(
        LOG_ENABLE_CONSOLE,
        "LOG_ENABLE_CONSOLE doesn't exist in system environment variables",
      );
    });

    it('`logger.console` should be the same with the `LOG_ENABLE_CONSOLE` from system environment variables', () => {
      assert(
        loggerConfig.console === LOG_ENABLE_CONSOLE,
        '`logger.console` is not equal to the `LOG_ENABLE_CONSOLE` from system environment variables',
      );
    });

    it("`logger.console` should use the default log enable console value if the LOG_ENABLE_CONSOLE doesn't exist in system environment variables", () => {
      const LOG_ENABLE_CONSOLE2 = process.env.LOG_ENABLE_CONSOLE;
      // Simulate the empty value of LOG_ENABLE_CONSOLE
      process.env.LOG_ENABLE_CONSOLE = '';
      setAppConfig();
      const { console } = config.logger;
      assert(
        console === DEFAULT_LOG_ENABLE_CONSOLE,
        '`logger.console` is not using the default log enable console value',
      );

      // Revert back the old value
      process.env.LOG_ENABLE_CONSOLE = LOG_ENABLE_CONSOLE2;
    });
  });
});
