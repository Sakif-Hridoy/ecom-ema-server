const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://emaWatson:emaWatsonPotter81@cluster0.djg6r.mongodb.net/emaJohnStore?retryWrites=true&w=majority`;
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 6060;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  console.log(err)
  const products = client.db("amazonStore").collection("items");
  console.log('database connected')
  app.post('/addProduct', (req,res)=>{
    const product = req.body;
    console.log(product);
    products.insertOne(product)
    .then(result=>{
      console.log(result);
    })
  })
});

app.get('/',(req,res)=>{
  res.send("Hello Hello Express");
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})