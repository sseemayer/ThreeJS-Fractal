'use strict';
require.config({
  shim: {
    threejs: {
      deps: [],
      exports: 'THREE'
    }

  },

  paths: {
    jquery: 'vendor/jquery.min',
    threejs: '../components/threejs/build/three',
    lodash: '../components/lodash/lodash',
    text: '../components/requirejs-text/text',
  }
});
 
require(['jquery', 'app'], function ($, app) {
  
  app($('#main'));

});
