import { assert } from 'chai';
import { createSandbox } from 'sinon';
import httpMocks from 'node-mocks-http';
import pdfController from '../../../controllers/pdf.controller';
import pdfService from '../../../services/pdf.service';

const sandbox = createSandbox();
const { stub, spy, fake } = sandbox;

describe('PDF Controller', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should be defined', () => assert.isDefined(pdfController, 'Controller was not defined'));

  describe('`generatePdfByWebpage` functionality', () => {
    it('should be a function', () => assert.isFunction(
      pdfController.generatePdfByWebpage,
      '`generatePdfByWebpage` is not a function.',
    ));

    it('should set correct headers when the request is valid', async () => {
      // Create fake param and return values
      const url = 'http://www.google.com';
      const pdfBuffer = fake();

      // Create a request/response
      const req = httpMocks.createRequest({
        query: { url },
      });
      const res = httpMocks.createResponse();

      // Spy the res' send method
      const resSpy = spy(res, 'set');

      // Stub the htmlToPdf service
      stub(pdfService, 'webpageToPdf')
        .withArgs(url)
        .returns(pdfBuffer);

      await pdfController.generatePdfByWebpage(req, res);

      assert(
        resSpy.calledWithExactly({
          'Content-Disposition': 'attachment;filename=response.pdf',
          'Content-Type': 'application/pdf',
        }),
        'Response headers are incorrect',
      );
    });

    it('should respond a pdf buffer when the request is valid', async () => {
      // Create fake param and return values
      const url = 'http://www.google.com';
      const pdfBuffer = fake();

      // Create a request/response
      const req = httpMocks.createRequest({
        query: { url },
      });
      const res = httpMocks.createResponse();

      // Spy the res' send method
      const resSpy = spy(res, 'send');

      // Stub the htmlToPdf service
      stub(pdfService, 'webpageToPdf')
        .withArgs(url)
        .returns(pdfBuffer);

      await pdfController.generatePdfByWebpage(req, res);

      assert(resSpy.calledWithExactly(pdfBuffer), 'PDF Buffer was not returned in the client');
    });

    it('should respond an error when the request encounters an error', async () => {
      // Create fake param and return values
      const url = 'http://www.google.com';
      const error = new Error();

      // Create a request/response
      const req = httpMocks.createRequest({
        query: { url },
      });
      const res = httpMocks.createResponse();

      // Spy the res' send method
      const resSpy = spy(res, 'json');

      // Stub the htmlToPdf service
      stub(pdfService, 'webpageToPdf')
        .withArgs(url)
        .throws(error);

      await pdfController.generatePdfByWebpage(req, res);

      assert(resSpy.calledWithExactly(error), 'Error was not returned in the client');
    });
  });
});
