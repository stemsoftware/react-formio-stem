module.exports = {
  //mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/env', {modules: false}],
            '@babel/preset-react',
            {
              'plugins': ['@babel/plugin-proposal-class-properties']
            }
          ]
        }
      }
    ]
  }
};
