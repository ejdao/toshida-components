const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const webpack = require('webpack');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  /* mapped paths to share */
]);

const prod = false;

function generateMfUrl(folder, port, production, version) {
  const localhost = 'http://localhost';
  const prodhost = 'https://production-url.com';
  const v = version ? `${version}/` : '';
  if (production) return `${prodhost}/apps/${v}${folder}/remoteEntry.js`;
  else return `${localhost}:${port}/remoteEntry.js`;
}

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      ngDevMode: 'undefined',
    }),
    new ModuleFederationPlugin({
      library: { type: 'module' },

      remotes: {},

      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        rxjs: {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: true,
        },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
