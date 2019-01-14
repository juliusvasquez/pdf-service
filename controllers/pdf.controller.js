import pdfService from '../services/pdf.service';

export default {
  async generatePdfByWebpage(req, res) {
    try {
      const {
        url,
        landscape,
        format,
        width,
        height,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      } = req.query;

      // Get the HTML Content
      const pdfBuffer = await pdfService.webpageToPdf(url, {
        landscape,
        format,
        width,
        height,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      });

      res.set({
        'Content-Disposition': 'attachment;filename=response.pdf',
        'Content-Type': 'application/pdf',
      });
      res.send(pdfBuffer);
    } catch (error) {
      res.json(error);
    }
  },
};
