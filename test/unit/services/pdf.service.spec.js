import { assert } from 'chai';
import { createSandbox } from 'sinon';
import puppeteer from 'puppeteer';
import errors from 'restify-errors';
import pdfService from '../../../services/pdf.service';

const sandbox = createSandbox();
const { stub } = sandbox;

describe('PDF Service', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should be defined', () => assert.isDefined(pdfService, 'Service was not defined'));

  describe('`isLandscape` functionality', () => {
    const isLandscape = pdfService.__get__('isLandscape');
    it("should return boolean true if the option is 'true'", () => assert.isTrue(isLandscape('true')));
    it("should return boolean false if the option is 'false'", () => assert.isFalse(isLandscape('false')));
    it('should return boolean false if the option is not defined', () => assert.isFalse(isLandscape()));
  });

  describe('`webpageToPdf` functionality', () => {
    it('should be a function', () => assert.isFunction(pdfService.webpageToPdf, '`webpageToPdf` is not a function.'));

    it('should return a pdf buffer when the request is valid', async () => {
      const url = 'http://www.google.com';
      const pdfBuffer = stub();
      const options = {
        landscape: 'test',
        format: 'test',
        width: 'test',
        height: 'test',
        marginTop: 'test',
        marginBottom: 'test',
        marginLeft: 'test',
        marginRight: 'test',
      };

      const browserStub = {
        newPage: async () => ({
          goto: stub()
            .withArgs(url)
            .returns(stub()),
          pdf: stub()
            .withArgs({
              printBackground: false,
              landscape:
                (options.landscape !== undefined && options.landscape.toLowerCase()) === 'true'
                  ? true
                  : false || false,
              format: options.format,
              width: options.width,
              height: options.height,
              margin: {
                top: options.marginTop,
                bottom: options.marginBottom,
                left: options.marginLeft,
                right: options.marginRight,
              },
            })
            .returns(pdfBuffer),
        }),
        close: stub(),
      };

      stub(puppeteer, 'launch')
        .withArgs({
          headless: true,
        })
        .returns(browserStub);

      const result = await pdfService.webpageToPdf(url, options);

      assert.deepEqual(result, pdfBuffer, 'PDF buffer was not returned');
    });

    it('should throws an error when request is invalid or encountered an problem', async () => {
      const url = 'http://www.google.com';
      const errorMsg = 'Test error message';
      const error = new Error(errorMsg);
      const options = {
        landscape: 'test',
        format: 'test',
        width: 'test',
        height: 'test',
        marginTop: 'test',
        marginBottom: 'test',
        marginLeft: 'test',
        marginRight: 'test',
      };

      stub(puppeteer, 'launch')
        .withArgs({
          headless: true,
        })
        .throws(error);

      let errorThrown;
      try {
        await pdfService.webpageToPdf(url, options);
      } catch (err) {
        errorThrown = err;
      }

      const { message } = errorThrown;

      assert(
        errorThrown instanceof errors.BadRequestError
          && message === `Unable to generate PDF Buffer for url ${url}. Cause by ${errorMsg}`,
        'PDF buffer was not returned',
      );
    });
  });
});
