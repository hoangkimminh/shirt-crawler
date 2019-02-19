const cheerio = require('cheerio')

const {
  Scraper,
  entities: { ProxyEntity }
} = require('@albert-team/spiderman')

const userAgents = require('../../user-agents.private.json')
const { username, password, proxies } = require('../../proxies.private.json')

module.exports = class CatalogScraper extends Scraper {
  constructor() {
    const proxyEntities = proxies.map((proxy) => {
      const { host, port } = proxy
      return new ProxyEntity(host, port, username, password)
    })
    super(userAgents, proxyEntities)
  }

  async parse(html) {
    const $ = cheerio.load(html)
    let productsInfo = []
    // get div elements
    $('.s-result-item.s-result-card-for-container.a-declarative.celwidget').map(
      (i, element) => {
        //get ASIN
        const ASIN = $(element).attr('data-asin')

        productsInfo.push({ id: ASIN })
      }
    )
    const nextUrl = 'https://www.amazon.com' + $('#pagnNextLink').attr('href')
    return { data: { products: productsInfo }, nextUrl: [nextUrl] }
  }
}
