module.exports = (req, res, next) => {
  res.setHeaders = (headers = {}) => {
    Object.entries(headers).forEach(([k, v]) => {
      res.setHeader(k, v)
    })
  }
  next()
}
