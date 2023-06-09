const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/qualityBoard',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_ROOT || 'http://localhost:3000/mock/',
      changeOrigin: true
      // pathRewrite: { '/api': '' }
    })
  )
  app.use(
    '/mock',
    createProxyMiddleware({
      target: process.env.REACT_APP_MOCK_URL || 'http://localhost:3000/mock/',
      changeOrigin: true,
      pathRewrite: { '/mock': '' }
    })
  )
}
