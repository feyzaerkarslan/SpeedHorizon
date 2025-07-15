const mongoose = require('mongoose');
const PriceList = require('./PriceList');
const data = require('./pricelist-seed.json');

// Canlı Atlas bağlantı adresiyle /test veritabanına yaz
const MONGODB_URI = "mongodb://kubra32nur:kubra32kubra@ac-w5zd64r-shard-00-00.ijfvnnc.mongodb.net:27017,ac-w5zd64r-shard-00-01.ijfvnnc.mongodb.net:27017,ac-w5zd64r-shard-00-02.ijfvnnc.mongodb.net:27017/test?ssl=true&replicaSet=atlas-4y348o-shard-0&authSource=admin&retryWrites=true&w=majority&appName=speedhorizon";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await PriceList.deleteMany({});
    await PriceList.insertMany(data);
    console.log('Fiyat listesi başarıyla eklendi!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Hata:', err);
    mongoose.disconnect();
  }); 