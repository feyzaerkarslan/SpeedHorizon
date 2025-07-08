const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim alanı zorunludur.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'E-posta alanı zorunludur.'],
    trim: true,
  },
  feedbackType: {
    type: String,
    required: [true, 'Geri bildirim türü zorunludur.'],
    enum: ['Şikayet', 'Öneri', 'Teşekkür', 'Diğer'],
  },
  subject: {
    type: String,
    required: [true, 'Konu alanı zorunludur.'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Mesaj alanı zorunludur.'],
  },
  status: {
    type: String,
    enum: ['Yeni', 'İnceleniyor', 'Çözüldü', 'Kapatıldı'],
    default: 'Yeni',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema); 