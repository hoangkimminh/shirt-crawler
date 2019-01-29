const {
  Scraper,
  entities: { ProxyEntity }
} = require('@albert-team/spiderman')
const cheerio = require('cheerio')

const userAgents = require('../../user-agents.private.json')
const { username, password, proxies } = require('../../proxies.private.json')

module.exports = class AmazonCatalogScraper extends Scraper {
  constructor() {
    const proxyEntities = proxies.map((proxy) => {
      const { host, port } = proxy
      return new ProxyEntity(host, port, username, password)
    })
    super(userAgents, proxyEntities)
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
    return { data: { products: productsInfo }, nextUrl: [nextUrl] }
  }
}
