import { assert } from 'chai';
import { createSandbox } from 'sinon';
import httpMocks from 'node-mocks-http';
import controller from '../../../api/controller';
import service from '../../../api/service';
import { reqBodyGeneratePDF } from '../testData';

const sandbox = createSandbox();
const { stub, spy, mock } = sandbox;

describe('PDF Microservice Test Suite', () => {
  const mockError = new Error();

  let req;
  let res;
  beforeEach(() => {
    res = httpMocks.createResponse();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should exist', () => assert.isDefined(controller, 'Controller is not defined'));

  describe('`getForm` function test', () => {
    it('should be a function', () => assert.isFunction(controller.generatePdf, '`generatePdf` is a function'));

    it('should respond pdf file when the `Accept` header is `application/pdf` and no error thrown', async () => {
      // Mock express' request/response
      req = httpMocks.createRequest({
        headers: { accept: 'application/pdf' },
        body: reqBodyGeneratePDF,
      });

      // Stub the `htmlToPdf` service function
      const pdfBuffer = stub();
      stub(service, 'htmlToPdf')
        .withArgs(reqBodyGeneratePDF.template)
        .returns(pdfBuffer);

      // Set expectations for correct headers and content type
      const mockRes = mock(res);
      mockRes
        .expects('header')
        .withExactArgs('Content-disposition', `attachment;filename=${reqBodyGeneratePDF.fileName}`);
      mockRes.expects('contentType').withExactArgs('application/pdf');

      const resSpy = spy(res, 'send');

      await controller.generatePdf(req, res);

      // Verify if passed headers and content type are correct
      mockRes.verify();

      assert(resSpy.calledWithExactly(pdfBuffer), 'PDF file was not returned');
    });

    it('should respond an error when the `Accept` header is not `application/pdf`', async () => {
      req = httpMocks.createRequest({
        headers: { accept: 'application/xml' },
        body: reqBodyGeneratePDF,
      });
      const resSpy = spy(res, 'json');
      await controller.generatePdf(req, res);
      assert(resSpy.firstCall.args[0] instanceof Error, 'Error was not returned');
    });

    it('should respond an error when the function catches an error', async () => {
      req = httpMocks.createRequest({
        headers: { accept: 'application/pdf' },
        body: reqBodyGeneratePDF,
      });

      // Stub the `htmlToPdf` service function to throw an error
      stub(service, 'htmlToPdf')
        .withArgs(reqBodyGeneratePDF.template)
        .throws(mockError);

      const resSpy = spy(res, 'json');

      await controller.generatePdf(req, res);
      assert(resSpy.calledWithExactly(mockError), 'Error was not returned');
    });
  });
});
