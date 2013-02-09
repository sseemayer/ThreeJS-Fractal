'use strict';
/*global define */
define(['lodash', 'threejs', 'text!../shader/vertex.glsl', 'text!../shader/mandelbrot.glsl'], function (_, THREE, vs, fs) {

  window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            };
  })();


  var app = function ($container) {
    app.initThree($container, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    app.renderLoop();
  };

  app.initThree = function ($container, options) {

    var opts = _.extend({
      width: 1024,
      height: 600,
      angle: 45,
      near: -500,
      far: 10000,
    }, options);

    app.renderer = new THREE.WebGLRenderer();
    app.scene = new THREE.Scene();

    app.camera = new THREE.OrthographicCamera(-opts.width / 2, opts.width / 2, -opts.height / 2, opts.height / 2, opts.near, opts.far);
    app.scene.add(app.camera);


    app.uniforms = {
      'zoom': {
        type: 'f',
        value: 1.0
      },
      'offset': {
        type: 'v2',
        value: new THREE.Vector2(1.150, 0.275)
      }
    };

    var material = new THREE.ShaderMaterial({
      uniforms: app.uniforms,
      vertexShader: vs,
      fragmentShader: fs
    });


    var geom = new THREE.PlaneGeometry(opts.width, opts.height, 1, 1);

    var sphere = new THREE.Mesh(
      geom,
      material
    );

    sphere.rotation.x = -Math.PI;

    app.scene.add(sphere);



    app.renderer.setSize(opts.width, opts.height);

    $container.append(app.renderer.domElement);

  };

  app.render = function (time) {

    console.log(time);

    app.uniforms.zoom.value *= 1 + 0.4 * time;

    app.renderer.render(app.scene, app.camera);
  };

  app.renderLoop = function () {
    var clock = new THREE.Clock(true);

    var loop = function () {
      app.render(clock.getDelta());
      window.requestAnimFrame(loop);
    };

    loop();
  };

  return app;

});
