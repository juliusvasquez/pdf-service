import { assert } from 'chai';
import { createSandbox } from 'sinon';
import route from '../../../routes/pdf.route';

const sandbox = createSandbox();
const { stub } = sandbox;

describe('PDF Routes', () => {
  it('should be defined', () => assert.isDefined(route));

  afterEach(() => {
    sandbox.restore();
  });

  const serverGetStub = stub();
  const conditionalHandlerStub = stub();

  const stubServer = {
    get: serverGetStub,
  };

  // Stub import dependencies
  let importRestore;
  before(() => {
    importRestore = route.__set__({
      plugins: {
        conditionalHandler: conditionalHandlerStub,
      },
    });
  });
  after(() => {
    importRestore();
  });

  describe('Webpage to PDF service route', () => {
    const generatePdfByWebpageStub = stub();

    // Stub required controllers
    let restore;
    before(() => {
      restore = route.__set__({
        pdfController: {
          generatePdfByWebpage: generatePdfByWebpageStub,
        },
      });
    });

    after(() => {
      restore();
    });

    it('should have the /webpage-to-pdf route', () => {
      route(stubServer);
      assert(
        serverGetStub.getCall(0).calledWith('/webpage-to-pdf'),
        '/webpage-to-pdf was not defined',
      );
    });

    it('should have a schema validator for GET /webpage-to-pdf route', () => {
      const validatorStub = stub();
      const queryStub = stub();

      const schemaRestore = route.__set__({
        schemaValidator: validatorStub,
        webpageToPdfValidator: {
          query: queryStub,
        },
      });

      route(stubServer);

      schemaRestore();

      assert(
        validatorStub.getCall(0).calledWith(queryStub),
        'Schema validation was not specified or incorrect',
      );
    });

    it('should have correct conditional handler for v1 ', () => {
      route(stubServer);
      assert(
        conditionalHandlerStub
          .getCall(0)
          .calledWithExactly([{ version: '1.0.0', handler: generatePdfByWebpageStub }]),
        'Conditional handler for v1 is incorrect',
      );
    });
  });
});
