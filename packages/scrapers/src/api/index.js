const { json, send } = require('micro')
const Router = require('router')
const finalhandler = require('finalhandler')

const resSetHeaders = require('../middlewares/resSetHeaders')
const CatalogScraper = require('../scrapers/catalog')

const router = new Router()
router.use(resSetHeaders)

router.all('/', (req, res) => send(res, 200, { message: 'Hello world' }))
router.post('/catalog', async (req, res) => {
  const { url } = await json(req)
  const scraper = new CatalogScraper()
  const result = await scraper.run(url)
  send(res, 200, result)
})

module.exports = (req, res) => router(req, res, finalhandler(req, res))
