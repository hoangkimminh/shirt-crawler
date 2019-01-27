const { json, send } = require('micro')
const Router = require('router')

const ShirtDataProcessor = require('../data-processors/shirt')

const router = new Router()
router.all('/', (req, res) =>
  send(res, 200, { message: 'Hello world', iam: '/api' })
)
router.post('/shirt', async (req, res) => {
  try {
    const { data } = await json(req)
    const scraper = new ShirtDataProcessor()
    const result = await scraper.run(data)
    send(res, 200, result)
  } catch (err) {
    console.error(err)
    send(res, 500)
  }
})

module.exports = router
