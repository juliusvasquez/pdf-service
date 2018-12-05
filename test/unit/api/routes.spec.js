import { createSandbox } from 'sinon';
import { assert } from 'chai';
import express from 'express';
import { noCallThru } from 'proxyquire';
import testUtil from '../testUtil';

const sandbox = createSandbox();
const { spy } = sandbox;

// Spy declaration for the controller
const controllerSpy = {
  generatePdf: spy(),
};

// Prevent to call the original dependency
const proxyquire = noCallThru();

// Import the service route thru proxyquire in order to stub its methods
const route = proxyquire(`${process.cwd()}/api/route`, {
  './controller': {
    generatePdf: controllerSpy.generatePdf,
  },
}).default;

const routes = testUtil.getRoutes(route);

describe('PDF Microservice Route Test Suite', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should be an instance of router', () => {
    assert.isTrue(
      Object.getPrototypeOf(route) === express.Router,
      'Forms Route is not an instance of route',
    );
  });

  it('should be contains a render `/generate`', () => {
    assert.isTrue('/generate' in routes, '`/generate` route was not declared');
  });

  it('should route `/generate` to controller.generatePdf', () => {
    routes['/generate'].post();
    assert(controllerSpy.generatePdf.called, '`controller.generatePdf` was not called');
  });
});
