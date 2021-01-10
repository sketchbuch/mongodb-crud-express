require('dotenv-safe').config()
const bodyParser = require('body-parser')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const config = require('../config/index')

const app = express()
const DB_COLLECTION = config.get('db.collection')
const DB_NAME = config.get('db.name')
const NAME = config.get('name')
const OPTIONS = { useUnifiedTopology: true }
const PW = config.get('password')
const UN = config.get('username')
const CONNECTION = `mongodb+srv://${UN}:${PW}@cluster0.utgru.mongodb.net/${NAME}?retryWrites=true&w=majority`

MongoClient.connect(CONNECTION, OPTIONS)
  .then(client => {
    const db = client.db(DB_NAME)
    const quotesCollection = db.collection(DB_COLLECTION)

    app.use(bodyParser.urlencoded({ extended: true }))
    app.set('view engine', 'ejs')
    app.set('views', `${__dirname}/views/`);

    app.get('/', (req, res) => {
      db.collection(DB_COLLECTION).find().toArray()
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