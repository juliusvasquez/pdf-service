import { assert } from 'chai';
import { createSandbox } from 'sinon';
import express from 'express';
import { noCallThru } from 'proxyquire';
import testUtil from '../../util/testUtil';

const sandbox = createSandbox();
const { spy } = sandbox;

// Prevent to call the original dependency
const proxyquire = noCallThru();

const controllerSpy = {
  generatePdfByHtmlReport: spy(),
};

// Import the route thru proxyquire in order to stub its dependencies
const route = proxyquire(
  `${process.cwd()}/api/route`,
  {
    './controller': {
      generatePdfByHtmlReport: controllerSpy.generatePdfByHtmlReport,
    },
  },
  {},
);

const routes = testUtil.getRoutes(route.default);

describe('Inspections Search Route', () => {
  it('should be an instance of router', () => {
    assert.equal(
      Object.getPrototypeOf(route.default),
      express.Router,
      'Service Route is not an instance of route',
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('HTML to PDF service', () => {
    it('should contains a route `/html-to-pdf`', () => {
      assert(
        Object.prototype.hasOwnProperty.call(routes, '/html-to-pdf'),
        '`/html-to-pdf`` route was not declared',
      );
    });

    it("should call the the controller's generatePdfByHtmlReport method for POST `/html-to-pdf`", () => {
      routes['/html-to-pdf'].post();
      assert(
        controllerSpy.generatePdfByHtmlReport.called,
        'generatePdfByHtmlReport method was not called',
      );
    });

    it("should call the the controller's generatePdfByHtmlReport method for POST `/html-to-pdf`", () => {
      routes['/html-to-pdf'].post();
      assert(
        controllerSpy.generatePdfByHtmlReport.called,
        'generatePdfByHtmlReport method was not called',
      );
    });
  });
});
