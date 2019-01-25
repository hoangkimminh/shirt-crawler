const { json, send } = require('micro')
const Router = require('router')

const CatalogScraper = require('../scrapers/catalog')

const router = new Router()
router.all('/', (req, res) =>
  send(res, 200, { message: 'Hello world', iam: '/api' })
)
router.post('/catalog', async (req, res) => {
  const { url } = await json(req)
  const scraper = new CatalogScraper()
  const result = await scraper.run(url)
  send(res, 200, result)
})

module.exports = router
