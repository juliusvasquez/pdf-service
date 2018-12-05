import { createLogger, format, transports } from 'winston';

import appConfig from '../conf/appConfig';

const {
  combine, timestamp, prettyPrint, printf,
} = format;

const defaultFormat = info => `[${info.level.toUpperCase()}] ${new Date().toISOString()} - ${info.message}`;
const accessFilter = format(info => (info.level !== 'error' ? info : false));

const createTransports = (config) => {
  const customTransports = [];

  if (appConfig.app.env !== 'development') {
    // setup the file transport
    if (config.access_log_file) {
      // setup the log transport
      customTransports.push(
        new transports.File({
          filename: config.access_log_file,
          level: config.level,
          handleExceptions: false,
          json: false,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          colorize: true,
          format:
            appConfig.app.env !== 'development'
              ? combine(accessFilter(), timestamp(), prettyPrint())
              : combine(accessFilter(), printf(info => defaultFormat(info))),
        }),
      );
    }

    if (config.error_log_file) {
      // setup the log transport
      customTransports.push(
        new transports.File({
          filename: config.error_log_file,
          level: 'error',
          handleExceptions: false,
          json: false,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          colorize: true,
        }),
      );
    }
  }

  // if config.console is set to true, a console logger will be included.
  if (config.console === 'true') {
    customTransports.push(
      new transports.Console({
        level: config.level,
      }),
    );
  }
  return customTransports;
};

const logger = createLogger({
  transports: createTransports(appConfig.logger),
  exitOnError: false, // do not exit on handled exceptions
  format:
    appConfig.app.env !== 'development'
      ? combine(timestamp(), prettyPrint())
      : printf(info => defaultFormat(info)),
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    // use the 'info' log level so the output
    // will be picked up by both transports (file and console)
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export default logger;
