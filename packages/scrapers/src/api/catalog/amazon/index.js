const { json, send } = require('micro')

const AmazonCatalogScraper = require('../../../scrapers/amazon-catalog')

module.exports = async (req, res) => {
  try {
    const { url } = await json(req)
    const scraper = new AmazonCatalogScraper()
    const result = await scraper.run(url)
    send(res, 200, result)
  } catch (err) {
    console.error(err)
    send(res, 500)
  }
}
