const { send } = require('micro')
const Router = require('router')
const finalhandler = require('finalhandler')

const router = new Router()
router.all('/', (req, res) =>
  send(res, 200, { message: 'Hello world', iam: '/index' })
)

module.exports = (req, res) => router(req, res, finalhandler(req, res))
