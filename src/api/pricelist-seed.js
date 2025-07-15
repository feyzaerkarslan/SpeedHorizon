const mongoose = require('mongoose');
const PriceList = require('./PriceList');
const data = require('./pricelist-seed.json');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/speedhorizon';

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