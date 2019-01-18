import pdfRoute from '../routes/pdf.route';
import publicRoute from '../routes/public.route';
import healthCheckRoute from '../routes/healthCheck.route';

export default (server) => {
  pdfRoute(server);
  healthCheckRoute(server);
  publicRoute(server);
};
