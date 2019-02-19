const AmazonDetailsScraper = require('./amazon-details')
let scraper = new AmazonDetailsScraper()
// async function run() {
//   return await scraper.run(
//     'https://www.amazon.com/True-Crime-Valentines-T-Shirt-Addict/dp/B07MBFDX3J/ref=sr_1_1?m=ATVPDKIKX0DER&s=apparel&ie=UTF8&qid=1548993527&sr=1-1&nodeID=7147445011&psd=1'
//   )
// }

// run()
//   .then((value) => {
//     console.log(value)
//   })
//   .catch((error) => {
//     console.log(error + '')
//   })

scraper
  .run(
    'https://www.amazon.com/True-Crime-Valentines-T-Shirt-Addict/dp/B07MBFDX3J/ref=sr_1_1?m=ATVPDKIKX0DER&s=apparel&ie=UTF8&qid=1548993527&sr=1-1&nodeID=7147445011&psd=1'
  )
  .then((value) => {
    console.log(value)
  })
  .catch((error) => {
    console.log(error + '')
  })
