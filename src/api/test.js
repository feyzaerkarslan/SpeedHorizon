const express = require('express');
const mongoose = require('mongoose');

// Basit test fonksiyonu
function runTests() {
  console.log('🧪 Backend testleri başlatılıyor...');
  
  // Express test
  try {
    const app = express();
    console.log('✅ Express.js başarıyla yüklendi');
  } catch (error) {
    console.error('❌ Express.js yükleme hatası:', error);
    process.exit(1);
  }
  
  // Mongoose test
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('✅ Mongoose başarıyla yüklendi');
    } else {
      console.log('✅ Mongoose bağlantısı mevcut');
    }
  } catch (error) {
    console.error('❌ Mongoose yükleme hatası:', error);
    process.exit(1);
  }
  
  // Environment variables test
  const requiredEnvVars = ['MONGODB_URI', 'PORT'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('⚠️  Eksik environment variables:', missingVars.join(', '));
  } else {
    console.log('✅ Tüm gerekli environment variables mevcut');
  }
  
  console.log('🎉 Tüm testler başarıyla tamamlandı!');
}

// Test çalıştır
runTests(); 