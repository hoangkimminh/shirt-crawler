const {
  Scraper,
  entities: { ProxyEntity }
} = require('@albert-team/spiderman')

const userAgents = require('../../user-agents.private.json')
const { username, password, proxies } = require('../../proxies.private.json')

module.exports = class GenericScraper extends Scraper {
  constructor() {
    const proxyEntities = proxies.map((proxy) => {
      const { host, port } = proxy
      return new ProxyEntity(host, port, username, password)
    })
    super(userAgents, proxyEntities)
  }
}
