import { assert } from 'chai';
import { createSandbox } from 'sinon';
import route from '../../../api/route';

const sandbox = createSandbox();
const { stub } = sandbox;

describe('API Routes', () => {
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
    let restoreController;
    beforeEach(() => {
      restoreController = route.__set__({
        controller: {
          generatePdfByWebpage: generatePdfByWebpageStub,
        },
      });
    });

    afterEach(() => {
      restoreController();
    });

    it('should have the /webpage-to-pdf route', () => {
      route(stubServer);
      assert(
        serverGetStub.getCall(0).calledWith('/webpage-to-pdf'),
        '/webpage-to-pdf was not defined',
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
