const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const dist = 'wpBuild';

module.exports = {
  target: 'node',
  entry: ['./src/main.ts'],
  mode: 'production',
  devtool: 'source-map',
  externals: [
      nodeExternals({
          modulesFromFile: {
              exclude: ['dependencies'],
          }
      }),
  ],
  output: {
      path: path.join(__dirname, dist),
      filename: 'compiled.js',
  },
  optimization: {
      minimize: false,
      namedModules: true,
      namedChunks: true,
      moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: 'happypack/loader?id=ts',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './.env', to: '.' },
    ]),
    new HappyPack({
      id: 'ts',
      // We will leve one core for the type-checker
      threads: require('os').cpus().length - 1,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true, transpileOnly: process.env.NODE_ENV === 'development' },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
  ],
};
