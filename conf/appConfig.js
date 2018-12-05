export default {
  app: {
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    version: process.env.APP_VERSION,
    port: process.env.APP_PORT || '3000',
    basePath: '/api',
  },
  logger: {
    name: process.env.APP_NAME,
    access_log_file: process.env.LOG_ACCESS_PATH,
    error_log_file: process.env.LOG_ERROR_PATH,
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true,
    format: ':remote-addr - :method :url :status :response-time ms - :res[content-length]',
  },
};
