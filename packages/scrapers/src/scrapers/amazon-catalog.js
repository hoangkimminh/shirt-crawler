const cheerio = require('cheerio')

const GenericScraper = require('./generic')

module.exports = class AmazonCatalogScraper extends GenericScraper {
  constructor() {
    super()
  }

  async parse(html) {
    const $ = cheerio.load(html)
    const productsInfo = []
    // get div elements
    $('.s-result-item.s-result-card-for-container.a-declarative.celwidget').map(
      (i, element) => {
        // get ASIN
        const asin = $(element).attr('data-asin')

        productsInfo.push({ asin })
      }
    )
    const nextUrl = 'https://www.amazon.com' + $('#pagnNextLink').attr('href')
    return { data: { products: productsInfo }, nextUrls: [nextUrl] }
  }
}
