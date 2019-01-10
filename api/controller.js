import service from './service';

export default {
  async generatePdfByHtmlReport(req, res) {
    // Get request params
    const { fileName, options } = req.body;

    try {
      // Convert HTML to PDF
      const pdfBuffer = await service.htmlToPdf(options);

      // Set the required headers
      res.header('Content-disposition', `attachment;filename=${fileName}.pdf`);
      res.contentType('application/pdf');
      res.send(pdfBuffer);
    } catch (err) {
      res.json(err);
    }
  },
};
