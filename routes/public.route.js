import { plugins } from 'restify';

export default (server) => {
  server.get(
    '/*(?!api.*/).*',
    plugins.serveStatic({
      directory: './public',
      default: 'index.html',
    }),
  );
};
