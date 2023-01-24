const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    })
  ],
  devServer: {
    proxy: {
      "*": {
        target:"http://127.0.0.1:4444",
        // headers: {
        //   "Connection": "keep-alive"
        // },
        changeOrigin: true,
        secure: false
      }
    },
    hot: true,
    port: 9001
  }
}
