const path = require('path');

module.exports = function (env) {
  return {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    theme: { '@primary-color': '#ff9830' },
    extraBabelPlugins: [
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
    ],
    svgCompress: true,
    isThread: true,
    terserPluginOptions: {
      cache: true,
      parallel: true,
    },
  };
};
