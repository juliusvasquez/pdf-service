import errors from 'http-errors';
import message from '../util/messages';
import service from './service';

export default {
  async generatePdf(req, res) {
    // Get request params
    const { content, fileName = new Date().getTime() } = req.body;

    // Get headers
    const { accept } = req.headers;

    try {
      if (accept === 'application/pdf') {
        // Get the PDF buffer
        const pdfBuffer = await service.htmlToPdf(content);
        // Set the required headers
        res.header('Content-disposition', `attachment;filename=${fileName}.pdf`);
        res.contentType('application/pdf');
        res.send(pdfBuffer);
      } else {
        // Send an error if the accept header is not recognized.
        res.json(errors.NotAcceptable(message.NOT_ACCEPTABLE));
      }
    } catch (err) {
      res.json(err);
    }
  },
};
