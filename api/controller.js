import axios from 'axios';
import service from './service';

export default {
  async generatePdfByWebpage(req, res, next) {
    try {
      const { url } = req.query;

      // Get the HTML Content
      const { data } = await axios.get('http://google.com');
      console.log(data);
      const pdfBuffer = await service.webpageToPdf(url);

      res.set({
        'content-disposition': 'attachment;filename=dummy.pdf',
        'Content-Type': 'application/pdf',
      });
      res.send(pdfBuffer);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  // generatePdfByHtmlReport(req, res) {
  //   // Get request params
  //   // const { fileName, options } = req.body;
  //   res.json({
  //     hello: 'world',
  //   });
  //   // try {
  //   //   // Convert HTML to PDF
  //   //   const pdfBuffer = await service.htmlToPdf(options);
  //   //   // Set the required headers
  //   //   res.header('Content-disposition', `attachment;filename=${fileName}.pdf`);
  //   //   res.contentType('application/pdf');
  //   //   res.send(pdfBuffer);
  //   // } catch (err) {
  //   //   res.json(err);
  //   // }
  // },
};
