// import pdf from 'html-pdf';
import puppeeter from 'puppeteer';

// const options = {
//   format: 'A4',
//   orientation: 'portrait',
//   margin: {
//     top: '100px',
//     bottom: '200px',
//     right: '30px',
//     left: '30px',
//   },
// };

export default {
  async htmlToPdf(options) {
    // Launch a headless browser
    const browser = await puppeeter.launch();
    try {
      // return new Promise((resolve, reject) => {
      // pdf.create(content, options).toBuffer((err, buffer) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve(buffer);
      //   }
      // });

      // Destructure the pdf options
      // This will be used by puppeeter
      const {
        header,
        footer,
        content,
        document: {
          landscape, width, height, format, margin,
        },
      } = options;

      const page = await browser.newPage();
      await page.setContent(content);

      // Generate PDF and return its buffer
      const pdfBuffer = await page.pdf({
        printBackground: true,
        width,
        height,
        format,
        landscape,
        margin,
        displayHeaderFooter: true,
        headerTemplate: header === '' ? '&nbsp;' : header,
        footerTemplate: footer === '' ? '&nbsp;' : footer,
      });

      browser.close();

      return pdfBuffer;
    } catch (err) {
      browser.close();
      throw new Error(err);
    }
  },
};
