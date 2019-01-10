import { assert } from 'chai';
import { createSandbox } from 'sinon';
import httpMocks from 'node-mocks-http';
import controller from '../../../api/controller';
import service from '../../../api/service';

const sandbox = createSandbox();
const { stub, spy, fake } = sandbox;

describe('Controller', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should be defined', () => assert.isDefined(controller, 'Controller was not defined'));

  describe('`generatePdfByHtmlReport` function', () => {
    it('should be a function', () => assert.isFunction(
      controller.generatePdfByHtmlReport,
      '`generatePdfByHtmlReport` is not a function',
    ));

    it('should respond a pdf buffer when the request is valid', async () => {
      // Create fake param and return values
      const fileName = fake();
      const options = fake();
      const pdfBuffer = fake();

      // Create a request/response
      const req = httpMocks.createRequest({
        body: { fileName, options },
      });
      const res = httpMocks.createResponse();

      // Spy the res' send method
      const resSpy = spy(res, 'send');

      // Stub the htmlToPdf service
      stub(service, 'htmlToPdf')
        .withArgs(options)
        .returns(pdfBuffer);

      await controller.generatePdfByHtmlReport(req, res);

      assert(resSpy.calledWithExactly(pdfBuffer), 'PDF Buffer was not returned in the client');
    });

    it('should respond an error when the request encounters an error', async () => {
      // Create fake param and return values
      const fileName = fake();
      const options = fake();
      const error = new Error();

      // Create a request/response
      const req = httpMocks.createRequest({
        body: { fileName, options },
      });
      const res = httpMocks.createResponse();

      // Spy the res' json method
      const resSpy = spy(res, 'json');

      // Stub the htmlToPdf service to throw an error
      stub(service, 'htmlToPdf')
        .withArgs(options)
        .throws(error);

      await controller.generatePdfByHtmlReport(req, res);

      assert(resSpy.calledWithExactly(error), 'Error was not returned in the client');
    });
  });
});
