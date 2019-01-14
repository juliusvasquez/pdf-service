import appConfig from '../conf/appConfig';

function formatError(res, body) {
  const isClientError = res.statusCode >= 400 && res.statusCode < 500;
  let response;
  if (isClientError) {
    response = {
      status: 'error',
      message: body.message,
      code: body.code,
    };
  } else {
    const inDebugMode = appConfig.app.env === 'development';
    response = {
      status: 'error',
      message: inDebugMode ? body.message : 'Internal Server Error',
      code: inDebugMode ? body.code : 'INTERNAL_SERVER_ERROR',
      data: inDebugMode ? body.stack : undefined,
    };
  }
  return response;
}

function formatSuccess(res, body) {
  return {
    status: 'success',
    data: body,
  };
}

export default (req, res, body) => {
  let response;
  if (body instanceof Error) {
    response = formatError(res, body);
  } else {
    response = formatSuccess(res, body);
  }
  response = JSON.stringify(response);
  res.header('Content-Length', Buffer.byteLength(response));
  res.header('Content-Type', 'application/json');
  return response;
};
