const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: [true, 'Telefon alanı zorunludur.'],
  },
  vehicleType: {
    type: String,
    required: [true, 'Araç tipi zorunludur.'],
    enum: ['Motosiklet', 'Scooter'],
  },
  vehicleModel: {
    type: String,
    required: [true, 'Araç modeli zorunludur.'],
  },
  serviceType: {
    type: String,
    required: [true, 'Servis tipi zorunludur.'],
  },
  preferredDate: {
    type: Date,
    required: [true, 'Tarih zorunludur.'],
  },
  notes: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Beklemede', 'Onaylandı', 'Tamamlandı', 'İptal Edildi'],
    default: 'Beklemede',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema); 