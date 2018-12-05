import morgan from 'morgan';
import appConfig from '../conf/appConfig';
import logger from '../lib/logger';

export default morgan(appConfig.logger.format, {
  stream: logger.stream,
});
