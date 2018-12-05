import _ from 'lodash';

export default {
  /**
   * Get and load all route paths/methods in a route module.
   * @param {Object} route
   */
  getRoutes(route) {
    const routes = {};

    function getMethodsForRoute(stack) {
      const methods = {};
      _.map(stack, ({ handle, method }) => {
        methods[method] = handle;
      });
      return methods;
    }

    _.map(route.stack, ({ route: { path, stack } }) => {
      routes[path] = getMethodsForRoute(stack);
    });

    return routes;
  },
};
