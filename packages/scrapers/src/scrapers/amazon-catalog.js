const cheerio = require('cheerio')

const GenericScraper = require('./generic')

module.exports = class AmazonCatalogScraper extends GenericScraper {
  constructor() {
    super()
  }

  async parse(html) {
    const $ = cheerio.load(html)
    const products = []
    $(
      '.s-result-item.s-result-card-for-container.a-declarative.celwidget'
    ).each((i, element) => {
      const asin = $(element).attr('data-asin')
      products.push({ asin })
    })
    const nextUrl = 'https://www.amazon.com' + $('#pagnNextLink').attr('href')
    return { data: { products }, nextUrls: [nextUrl] }
  }
}
