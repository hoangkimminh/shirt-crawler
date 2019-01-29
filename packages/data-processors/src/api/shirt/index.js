const { json, send } = require('micro')

const ShirtDataProcessor = require('../../data-processors/shirt')

module.exports = async (req, res) => {
  try {
    const { data } = await json(req)
    const scraper = new ShirtDataProcessor()
    const result = await scraper.run(data)
    send(res, 200, result)
  } catch (err) {
    console.error(err)
    send(res, 500)
  }
}
