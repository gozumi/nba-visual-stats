import * as CleanWebpackPlugin from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import { InjectManifest } from 'workbox-webpack-plugin'

const config: webpack.Configuration = {
  mode: 'development',

  entry: ['react-hot-loader/patch', './src/index.tsx'],

  output: {
    filename: 'app.[hash].js',
    path: path.join(__dirname, './dist')
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      ['web-workers']: path.resolve(__dirname, 'src/web-workers')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        // exclude: /.+\.spec\.tsx?$/,
        loader: 'awesome-typescript-loader',
        test: /\.tsx?$/
      },

      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/
      },
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: 'WorkerName.[hash].js'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    hot: true,
    port: 3000
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CleanWebpackPlugin(['dist']),
    CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { from : './src/_assets' }
    ]),
    new InjectManifest({
      // include: [/\.(html|css|png)$/],
      swSrc: './src/service-worker.js'
    })
  ]
}

export default config
