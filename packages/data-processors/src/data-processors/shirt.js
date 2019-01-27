const { DataProcessor } = require('@albert-team/spiderman')

const Shirt = require('../firestore')

module.exports = class ShirtDataProcessor extends DataProcessor {
  constructor() {
    super()
  }

  async process(data) {
    const { products } = data
    await Promise.all(
      products.map(async (product) => Shirt.add({ asin: product.id }))
    )
    return { success: true }
  }
}
