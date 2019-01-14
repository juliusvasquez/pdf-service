import puppeteer from 'puppeteer';
import errors from 'restify-errors';

const isLandscape = (option = 'false') => (option.toLowerCase() === 'true');

export default {
  async webpageToPdf(url, options) {
    try {
      // Puppeteer can and should only generate pdf in headless mode.
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url);
      const pdfOptions = {
        printBackground: false,
        landscape: isLandscape(options.landscape),
        format: options.format,
        width: options.width,
        height: options.height,
        margin: {
          top: options.marginTop,
          bottom: options.marginBottom,
          left: options.marginLeft,
          right: options.marginRight,
        },
      };

      // Return the pdf buffer.
      const pdf = await page.pdf(pdfOptions);

      await browser.close();

      return pdf;
    } catch (error) {
      const { message } = error;

      throw new errors.BadRequestError(
        `Unable to generate PDF Buffer for url ${url}. Cause by ${message}`,
      );
    }
  },
};
