const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/xdnphb', {
      target: 'http://test.main.newrank.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/xdnphb': '/xdnphb',
      },
    })
  );
};
