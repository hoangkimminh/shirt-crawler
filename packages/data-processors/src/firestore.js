const admin = require('firebase-admin')

const serviceAccount = require('../firebase-key.private.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shirt-crawler.firebaseio.com'
})
const db = app.firestore()

module.exports = {
  Shirt: db.collection('shirt')
}
