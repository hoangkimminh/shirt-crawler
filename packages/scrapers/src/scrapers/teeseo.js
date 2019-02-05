const cheerio = require('cheerio')
const xxhash = require('xxhashjs')

const GenericScraper = require('./generic')

module.exports = class TeeseoScraper extends GenericScraper {
  constructor() {
    super()
  }

  async parse(html) {
    const $ = cheerio.load(html)
    const title = $('#main-product-thumb > h3').text()
    const id = xxhash.h64(title, 0).toString()
    const price = $('#product-price').attr('data-product-price')
    const nextUrls = $('div.js-box > a').map((i, e) => $(e).attr('href'))
    return { data: { id, title, description: title, price }, nextUrls }
  }
}
