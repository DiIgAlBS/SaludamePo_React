const fs = require('fs');
const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-esbuild'
    ],
    files: [
      { pattern: 'src/**/*.test.jsx', watched: false }
    ],
    preprocessors: {
      'src/**/*.test.jsx': ['esbuild']
    },
    esbuild: {
      target: 'es2020',
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      },
      plugins: [
        {
          name: 'resolve-jsx-tests',
          setup(build) {
            build.onResolve({ filter: /\.test\.js$/ }, (args) => {
              const jsxPath = args.path.replace(/\.test\.js$/, '.test.jsx');
              const fullPath = path.resolve(args.resolveDir, jsxPath);
              if (fs.existsSync(fullPath)) {
                return { path: fullPath };
              }
            });
          }
        }
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false
  });
};