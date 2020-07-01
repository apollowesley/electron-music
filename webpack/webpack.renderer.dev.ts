import path from 'path';
import merge from 'webpack-merge';

import { Env } from './type';
import common from './webpack.renderer.common';

export default (env: Env) => merge(common(env), {
  mode: 'development',
  target: "electron-renderer",
  devtool: 'inline-source-map',
  devServer: {
    // This tells webpack-dev-server to serve the files from the dist/webpack directory on localhost:8080.
    contentBase: path.join(__dirname, '../dist-webpack/renderer'),
    hot: true,
  },
});