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
    const nextUrls = []
    $('div.js-box > a').each((i, e) => {
      const relativePath = $(e).attr('href')
      nextUrls.push(`https://www.teeseo.top${relativePath}`)
    })

    const productTypes = []
    $('#product_types')
      .find('option')
      .each((i, e) =>
        productTypes.push(
          $(e)
            .attr('value')
            .toLowerCase()
        )
      )
    const colors = []
    $('#product_colors')
      .find('option')
      .each((i, e) => colors.push($(e).attr('value')))
    const imageLinks = []
    $('#product_designs > div')
      .find('img')
      .each((i, e) => imageLinks.push($(e).attr('data-src')))
    const variants = []
    for (let i = 0; i < productTypes.length; i++)
      for (let j = 0; j < colors.length; j++)
        variants.push({
          type: productTypes[i],
          color: colors[j],
          image: imageLinks[j]
        })

    return {
      data: { id, title, description: title, price, variants },
      nextUrls
    }
  }
}
