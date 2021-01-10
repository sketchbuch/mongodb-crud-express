const bodyParser = require('body-parser')
const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
const MONGO_CONNECTION = 'mongodb+srv://cruduser:9Kx1uIj34BRl@cluster0.utgru.mongodb.net/test?retryWrites=true&w=majority'
const MONGO_OPTIONS = { useUnifiedTopology: true }
const MONGO_DB_NAME = 'crud-tutorial'
const MONGO_DB_COLLECTION = 'quotes'

MongoClient.connect(MONGO_CONNECTION, MONGO_OPTIONS)
  .then(client => {
    const db = client.db(MONGO_DB_NAME)
    const quotesCollection = db.collection(MONGO_DB_COLLECTION)

    app.use(bodyParser.urlencoded({ extended: true }))
    app.set('view engine', 'ejs')
    app.set('views', `${__dirname}/views/`);

    app.get('/', (req, res) => {
      db.collection(MONGO_DB_COLLECTION).find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.listen(3000, function () {
      console.log('listening on 3000')
    })
  })
  .catch(error => console.error(error))