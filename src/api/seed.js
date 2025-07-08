const mongoose = require('mongoose');
const Motorcycle = require('./Motorcycle');
const Scooter = require('./Scooter');
const SparePart = require('./SparePart');
const Accessory = require('./Accessory');
const DiscountedProduct = require('./DiscountedProduct');

const motorcycles = [
  {
    name: 'MT-09',
    category: 'Hyper Naked',
    price: 485000,
    engineSize: 889,
    power: 119,
    stock: 1000,
    colors: ['Siyah', 'Mavi', 'Gri'],
    description: "Yeni nesil 889cc CP3 motoru, ultra hafif alüminyum şasisi ve en gelişmiş elektronik kontrol teknolojisi ile MT-09, Yamaha'nın ikonik Hyper Naked tasarımını bir adım öteye taşıyor.",
    features: [
      '889cc sıvı soğutmalı DOHC 4 zamanlı 3 silindirli motor',
      'Yeni hafif alüminyum döküm şasi',
      '6 eksenli IMU sensör',
      'QSS Hızlı Vites Değiştirme Sistemi',
      'TFT Renkli Ekran'
    ],
    specs: {
      motor: '889cc, 3 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
      şanzıman: '6 ileri',
      maksGüç: '119 PS @ 10,000 rpm',
      maksimumTork: '93 Nm @ 7,000 rpm',
      yakıtTüketimi: '5.0 l/100km',
      uzunluk: '2,090 mm',
      genişlik: '795 mm',
      yükseklik: '1,190 mm',
      seleYüksekliği: '825 mm',
      aksAralığı: '1,430 mm',
      ağırlık: '189 kg'
    },
    images: [
      '/images/motorcycles/mt-09/1.jpg',
      '/images/motorcycles/mt-09/2.jpg',
      '/images/motorcycles/mt-09/3.jpg',
      '/images/motorcycles/mt-09/4.jpg'
    ],
    new: true,
    popular: true,
    discounted: true,
    indirimliPrice: 450000
  },
  {
    name: 'R1',
    category: 'Supersport',
    price: 850000,
    engineSize: 998,
    power: 200,
    stock: 1000,
    colors: ['Mavi', 'Siyah', 'Kırmızı'],
    description: "YZF-R1, Yamaha'nın yarış pistindeki MotoGP teknolojisini sokağa taşımak için tasarlanmış, en gelişmiş süper spor motosikletidir.",
    features: [
      '998cc sıvı soğutmalı, crossplane 4 zamanlı motor',
      'MotoGP teknolojisi elektronik kontrol sistemleri',
      'Yarış tipi alüminyum şasi',
      'Yarış tipi aerodinamik tasarım',
      'Brembo ön frenler'
    ],
    specs: {
      motor: '998cc, 4 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
      şanzıman: '6 ileri',
      maksGüç: '200 PS @ 13,500 rpm',
      maksimumTork: '112.4 Nm @ 11,500 rpm',
      yakıtTüketimi: '6.8 l/100km',
      uzunluk: '2,055 mm',
      genişlik: '690 mm',
      yükseklik: '1,165 mm',
      seleYüksekliği: '855 mm',
      aksAralığı: '1,405 mm',
      ağırlık: '201 kg'
    },
    images: [
      '/images/motorcycles/r1/1.jpg',
      '/images/motorcycles/r1/2.jpg',
      '/images/motorcycles/r1/3.jpg',
      '/images/motorcycles/r1/4.jpg'
    ],
    new: false,
    popular: true,
    discounted: true,
    indirimliPrice: 800000
  },
  {
    name: 'Tracer 9 GT',
    category: 'Sport Touring',
    price: 545000,
    engineSize: 889,
    power: 119,
    stock: 1000,
    colors: ['Mavi', 'Gri'],
    description: 'Yeni nesil 889cc CP3 motoru ve gelişmiş elektronik özellikleri ile Tracer 9 GT, uzun mesafe sürüşleri için mükemmel bir sport tourer motosiklet.',
    features: [
      '889cc sıvı soğutmalı DOHC 4 zamanlı 3 silindirli motor',
      'Elektronik süspansiyon',
      'Hızlı vites değiştirme sistemi',
      'Yan çantalar',
      'LED sis farları'
    ],
    specs: {
      motor: '889cc, 3 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
      şanzıman: '6 ileri',
      maksGüç: '119 PS @ 10,000 rpm',
      maksimumTork: '93 Nm @ 7,000 rpm',
      yakıtTüketimi: '5.0 l/100km',
      uzunluk: '2,175 mm',
      genişlik: '885 mm',
      yükseklik: '1,430 mm',
      seleYüksekliği: '810 mm',
      aksAralığı: '1,500 mm',
      ağırlık: '220 kg'
    },
    images: [
      '/images/motorcycles/tracer-9-gt/1.jpg',
      '/images/motorcycles/tracer-9-gt/2.jpg',
      '/images/motorcycles/tracer-9-gt/3.jpg',
      '/images/motorcycles/tracer-9-gt/4.jpg'
    ],
    new: true,
    popular: false
  },
  {
    name: 'Tenere 700',
    category: 'Adventure',
    price: 495000,
    engineSize: 689,
    power: 73,
    stock: 1000,
    colors: ['Mavi', 'Siyah'],
    description: 'Tenere 700, zorlu arazi koşulları ve uzun yolculuklar için tasarlanmış macera motosikletidir.',
    features: [
      '689cc sıvı soğutmalı DOHC 4 zamanlı 2 silindirli motor',
      'Çift disk ön fren',
      'Ayarlanabilir süspansiyon',
      'Uzun menzilli yakıt deposu',
      'LED aydınlatma'
    ],
    specs: {
      motor: '689cc, 2 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
      şanzıman: '6 ileri',
      maksGüç: '73.4 PS @ 9,000 rpm',
      maksimumTork: '68 Nm @ 6,500 rpm',
      yakıtTüketimi: '4.3 l/100km',
      uzunluk: '2,370 mm',
      genişlik: '905 mm',
      yükseklik: '1,455 mm',
      seleYüksekliği: '875 mm',
      aksAralığı: '1,595 mm',
      ağırlık: '204 kg'
    },
    images: [
      '/images/motorcycles/tenere-700/1.jpg',
      '/images/motorcycles/tenere-700/2.jpg',
      '/images/motorcycles/tenere-700/3.jpg',
      '/images/motorcycles/tenere-700/4.jpg'
    ],
    new: false,
    popular: true
  },
  {
    name: 'XSR900',
    category: 'Sport Heritage',
    price: 515000,
    engineSize: 889,
    power: 119,
    stock: 1000,
    colors: ['Gri', 'Mavi'],
    description: 'XSR900, klasik tasarım ile modern teknolojiyi birleştiren retro tarzda bir motosiklettir.',
    features: [
      '889cc sıvı soğutmalı DOHC 4 zamanlı 3 silindirli motor',
      'Tam LED aydınlatma',
      'Ayarlanabilir süspansiyon',
      'TCS Çekiş Kontrol Sistemi',
      'Alüminyum şasi'
    ],
    specs: {
      motor: '889cc, 3 silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
      şanzıman: '6 ileri',
      maksGüç: '119 PS @ 10,000 rpm',
      maksimumTork: '93 Nm @ 7,000 rpm',
      yakıtTüketimi: '5.0 l/100km',
      uzunluk: '2,155 mm',
      genişlik: '790 mm',
      yükseklik: '1,155 mm',
      seleYüksekliği: '810 mm',
      aksAralığı: '1,495 mm',
      ağırlık: '193 kg'
    },
    images: [
      '/images/motorcycles/xsr900/1.jpg',
      '/images/motorcycles/xsr900/2.jpg',
      '/images/motorcycles/xsr900/3.jpg',
      '/images/motorcycles/xsr900/4.jpg'
    ],
    new: false,
    popular: false
  },
  {
    name: 'YZ450F',
    category: 'Off Road',
    price: 385000,
    engineSize: 450,
    power: 60,
    stock: 1000,
    colors: ['Mavi'],
    description: 'YZ450F, yarış odaklı, hafif ve güçlü bir off-road motosikletidir.',
    features: [
      '450cc sıvı soğutmalı DOHC 4 zamanlı tek silindirli motor',
      'Yarış tipi şasi',
      'Launch Control Sistemi',
      'Ayarlanabilir süspansiyon',
      'Dijital gösterge paneli'
    ],
    specs: {
      motor: '450cc, tek silindirli, sıvı soğutmalı, DOHC, 4 zamanlı',
      şanzıman: '5 ileri',
      maksGüç: 'N/A',
      maksimumTork: 'N/A',
      yakıtTüketimi: 'N/A',
      uzunluk: '2,180 mm',
      genişlik: '825 mm',
      yükseklik: '1,275 mm',
      seleYüksekliği: '965 mm',
      aksAralığı: '1,480 mm',
      ağırlık: '111 kg'
    },
    images: [
      '/images/motorcycles/yz450f/1.jpg',
      '/images/motorcycles/yz450f/2.jpg',
      '/images/motorcycles/yz450f/3.jpg',
      '/images/motorcycles/yz450f/4.jpg'
    ]
  }
];

const scooters = [
  {
    name: 'SpeedHorizon Sport X1',
    category: 'Sport',
    price: 125000,
    engineSize: 150,
    powerHP: 15,
    stock: 1000,
    colors: ['Kırmızı', 'Siyah'],
    description: 'Yüksek performanslı sport scooter deneyimi sunan SpeedHorizon Sport X1, şehir içi ve şehir dışı kullanım için ideal bir seçimdir.',
    features: [
      'ABS Fren Sistemi',
      'LED Aydınlatma',
      'Dijital Gösterge Paneli',
      'Sport Sürüş Modu',
      'Akıllı Anahtar Sistemi'
    ],
    specs: {
      motor: '150cc, Tek Silindir, 4 Zamanlı',
      şanzıman: 'CVT Otomatik',
      maksGüç: '15 HP',
      yakıtTüketimi: '2.5 l/100km',
      ağırlık: '130 kg'
    },
    images: [
      '/images/scooters/sport-x1/1.jpg',
      '/images/scooters/sport-x1/2.jpg',
      '/images/scooters/sport-x1/3.jpg',
      '/images/scooters/sport-x1/4.jpg'
    ],
    new: true,
    popular: true
  },
  {
    name: 'SpeedHorizon Urban G1',
    category: 'Urban',
    price: 95000,
    engineSize: 125,
    powerHP: 12,
    stock: 1000,
    colors: ['Beyaz', 'Gri'],
    description: 'Şehir hayatının karmaşasında pratik ve şık bir çözüm sunan SpeedHorizon Urban G1, konforlu sürüşü ve ekonomik yapısıyla öne çıkıyor.',
    features: [
      'Start-Stop Sistemi',
      'Geniş Sele Altı Bagaj Hacmi',
      'USB Şarj Soketi',
      'Kombine Fren Sistemi (CBS)'
    ],
    specs: {
      motor: '125cc, Tek Silindir, 4 Zamanlı',
      şanzıman: 'CVT Otomatik',
      maksGüç: '12 HP',
      yakıtTüketimi: '2.2 l/100km',
      ağırlık: '115 kg'
    },
    images: [
      '/images/scooters/urban-g1/1.jpg',
      '/images/scooters/urban-g1/2.jpg',
      '/images/scooters/urban-g1/3.jpg',
      '/images/scooters/urban-g1/4.jpg'
    ],
    new: false,
    popular: true
  },
  {
    name: 'SpeedHorizon Cruiser C1',
    category: 'Cruiser',
    price: 180000,
    engineSize: 300,
    powerHP: 28,
    stock: 1000,
    colors: ['Mat Siyah', 'Bordo'],
    description: 'Uzun yolculuklar ve konforlu sürüşler için tasarlanan SpeedHorizon Cruiser C1, güçlü motoru ve geniş oturma alanıyla maxi-scooter segmentinde fark yaratıyor.',
    features: [
      'Geniş Rüzgar Siperliği',
      'Yolcu Sırt Desteği',
      'Çift Kanallı ABS',
      'Elcik Isıtma',
      'Çekiş Kontrol Sistemi (TCS)'
    ],
    specs: {
      motor: '300cc, Tek Silindir, 4 Zamanlı, Sıvı Soğutmalı',
      şanzıman: 'CVT Otomatik',
      maksGüç: '28 HP',
      yakıtTüketimi: '3.1 l/100km',
      ağırlık: '180 kg'
    },
    images: [
      '/images/scooters/cruiser-c1/1.jpg',
      '/images/scooters/cruiser-c1/2.jpg',
      '/images/scooters/cruiser-c1/3.jpg',
      '/images/scooters/cruiser-c1/4.jpg'
    ],
    new: true,
    popular: false
  },
  {
    name: 'SpeedHorizon Adventure A1',
    category: 'Adventure',
    price: 165000,
    engineSize: 200,
    powerHP: 18,
    stock: 1000,
    colors: ['Haki', 'Turuncu'],
    description: 'Hem şehirde hem de hafif arazi koşullarında maceraya atılmak isteyenler için SpeedHorizon Adventure A1, yüksek yapısı ve dayanıklı lastikleriyle idealdir.',
    features: [
      'Uzun Salınımlı Süspansiyon',
      'Dişli Lastikler',
      'El Koruma',
      'Motor Koruma Demiri',
      'Yüksek Ön Cam'
    ],
    specs: {
      motor: '200cc, Tek Silindir, 4 Zamanlı',
      şanzıman: 'CVT Otomatik',
      maksGüç: '18 HP',
      yakıtTüketimi: '2.8 l/100km',
      ağırlık: '140 kg'
    },
    images: [
      '/images/scooters/adventure-a1/1.jpg',
      '/images/scooters/adventure-a1/2.jpg',
      '/images/scooters/adventure-a1/3.jpg',
      '/images/scooters/adventure-a1/4.jpg'
    ],
    new: false,
    popular: false
  },
  {
    name: 'SpeedHorizon Compact Z1',
    category: 'Compact',
    price: 75000,
    engineSize: 50,
    powerHP: 4,
    stock: 1000,
    colors: ['Sarı', 'Açık Mavi'],
    description: 'Şehir içi kısa mesafeler ve pratik ulaşım için tasarlanmış ultra kompakt ve hafif bir model olan SpeedHorizon Compact Z1.',
    features: [
      'Katlanabilir Gidon',
      'Hafif Tasarım',
      'Düşük Yakıt Tüketimi',
      'Dijital Mini Gösterge'
    ],
    specs: {
      motor: '50cc, Tek Silindir, 4 Zamanlı',
      şanzıman: 'Otomatik',
      maksGüç: '4 HP',
      yakıtTüketimi: '1.8 l/100km',
      ağırlık: '85 kg'
    },
    images: [
      '/images/scooters/compact-z1/1.jpg',
      '/images/scooters/compact-z1/2.jpg',
      '/images/scooters/compact-z1/3.jpg',
      '/images/scooters/compact-z1/4.jpg'
    ],
    new: false,
    popular: true
  },
  {
    name: 'SpeedHorizon Electric E1',
    category: 'Electric',
    price: 140000,
    engineSize: 0, 
    powerHP: 20,
    stock: 1000,
    colors: ['Metalik Gri', 'Beyaz'],
    description: 'Sessiz, çevreci ve teknolojik bir sürüş deneyimi sunan tam elektrikli SpeedHorizon Electric E1 ile geleceğin ulaşımına adım atın.',
    features: [
      'Tam Elektrikli Motor',
      'Rejeneratif Frenleme',
      'Akıllı Telefon Entegrasyonu',
      'Geri Vites Modu',
      'Sessiz Çalışma'
    ],
    specs: {
      motor: 'Fırçasız DC Elektrik Motoru',
      şanzıman: 'Doğrudan Sürüş',
      maksGüç: '20 HP eşdeğeri',
      yakıtTüketimi: '0 (Tam Elektrikli)',
      ağırlık: '125 kg'
    },
    images: [
      '/images/scooters/electric-e1/1.jpg',
      '/images/scooters/electric-e1/2.jpg',
      '/images/scooters/electric-e1/3.jpg',
      '/images/scooters/electric-e1/4.jpg'
    ],
    new: true,
    popular: false
  }
];

const spareParts = [
  {
    name: 'Fren Balatası',
    category: 'Fren Sistemi',
    price: 1200,
    stock: 1000,
    compatibleModels: ['MT-09', 'R1', 'Tracer 9 GT', 'SpeedHorizon Sport X1', 'SpeedHorizon Urban E1'],
    description: 'Yüksek performanslı, uzun ömürlü fren balatası.',
    features: ['Dayanıklı malzeme', 'Sessiz çalışma', 'Kolay montaj'],
    images: [
      '/images/spare-parts/brake-pad/1.jpg',
      '/images/spare-parts/brake-pad/2.jpg',
      '/images/spare-parts/brake-pad/3.jpg',
      '/images/spare-parts/brake-pad/4.jpg'
    ]
  },
  {
    name: 'Yağ Filtresi',
    category: 'Motor',
    price: 350,
    stock: 1000,
    compatibleModels: ['MT-09', 'R1', 'Tracer 9 GT', 'SpeedHorizon Sport X2'],
    description: 'Motor ömrünü uzatan yüksek kaliteli yağ filtresi.',
    features: ['Yüksek filtrasyon', 'Kolay değişim'],
    images: [
      '/images/spare-parts/oil-filter/1.jpg',
      '/images/spare-parts/oil-filter/2.jpg',
      '/images/spare-parts/oil-filter/3.jpg',
      '/images/spare-parts/oil-filter/4.jpg'
    ]
  },
  {
    name: 'Arka Amortisör',
    category: 'Süspansiyon',
    price: 2500,
    stock: 1000,
    compatibleModels: ['SpeedHorizon Urban E2', 'SpeedHorizon Sport X2'],
    description: 'Konforlu sürüş için geliştirilmiş arka amortisör.',
    features: ['Ayarlanabilir sertlik', 'Uzun ömürlü'],
    images: [
      '/images/spare-parts/rear-shock/1.jpg',
      '/images/spare-parts/rear-shock/2.jpg',
      '/images/spare-parts/rear-shock/3.jpg',
      '/images/spare-parts/rear-shock/4.jpg'
    ]
  }
];

const accessories = [
  {
    name: 'Yolcu Sırt Dayama',
    category: 'Konfor',
    price: 1800,
    stock: 1000,
    compatibleModels: ['MT-09', 'Tracer 9 GT', 'SpeedHorizon Sport X1'],
    description: 'Uzun yolculuklarda yolcu konforunu artıran sırt dayama aparatı.',
    features: ['Kolay montaj', 'Dayanıklı malzeme'],
    images: [
      '/images/accessories/backrest/1.jpg',
      '/images/accessories/backrest/2.jpg',
      '/images/accessories/backrest/3.jpg',
      '/images/accessories/backrest/4.jpg'
    ]
  },
  {
    name: 'Telefon Tutucu',
    category: 'Teknoloji',
    price: 450,
    stock: 1000,
    compatibleModels: ['MT-09', 'R1', 'Tracer 9 GT', 'SpeedHorizon Sport X1', 'SpeedHorizon Urban E1'],
    description: 'Güvenli ve kullanışlı telefon tutucu.',
    features: ['Su geçirmez', 'Şok emici', '360° döndürme'],
    images: [
      '/images/accessories/phone-holder/1.jpg',
      '/images/accessories/phone-holder/2.jpg',
      '/images/accessories/phone-holder/3.jpg',
      '/images/accessories/phone-holder/4.jpg'
    ]
  },
  {
    name: 'Yan Çanta Seti',
    category: 'Depolama',
    price: 3200,
    stock: 1000,
    compatibleModels: ['Tracer 9 GT', 'Tenere 700', 'SpeedHorizon Sport X2'],
    description: 'Geniş depolama alanı sunan yan çanta seti.',
    features: ['Su geçirmez', 'Çıkarılabilir', 'Güvenlik kilidi'],
    images: [
      '/images/accessories/side-bags/1.jpg',
      '/images/accessories/side-bags/2.jpg',
      '/images/accessories/side-bags/3.jpg',
      '/images/accessories/side-bags/4.jpg'
    ]
  }
];

mongoose.connect('mongodb://localhost:27017/speedhorizon')
  .then(async () => {
    await Promise.all([
      Motorcycle.deleteMany({}),
      Scooter.deleteMany({}),
      SparePart.deleteMany({}),
      Accessory.deleteMany({}),
      DiscountedProduct.deleteMany({}),
    ]);
    const insertedMotorcycles = await Motorcycle.insertMany(motorcycles);
    console.log('insertedMotorcycles:', insertedMotorcycles.map(m => ({ name: m.name, discounted: m.discounted, indirimliPrice: m.indirimliPrice })));
    const insertedScooters = await Scooter.insertMany(scooters);
    const insertedSpareParts = await SparePart.insertMany(spareParts);
    const insertedAccessories = await Accessory.insertMany(accessories);

    // İndirimli ürünleri DiscountedProduct koleksiyonuna ekle
    const discountedProducts = [];
    // Motorlar
    insertedMotorcycles.forEach(moto => {
      if (moto.discounted && moto.indirimliPrice) {
        discountedProducts.push({
          productType: 'motorcycle',
          productId: moto._id,
          name: moto.name,
          image: moto.images[0],
          originalPrice: moto.price,
          discountedPrice: moto.indirimliPrice,
        });
      }
    });
    // Scooterlar
    insertedScooters.forEach(scooter => {
      if (scooter.discounted && scooter.indirimliPrice) {
        discountedProducts.push({
          productType: 'scooter',
          productId: scooter._id,
          name: scooter.name,
          image: scooter.images[0],
          originalPrice: scooter.price,
          discountedPrice: scooter.indirimliPrice,
        });
      }
    });
    // Yedek Parçalar
    insertedSpareParts.forEach(part => {
      if (part.discounted && part.indirimliPrice) {
        discountedProducts.push({
          productType: 'spare-part',
          productId: part._id,
          name: part.name,
          image: part.images[0],
          originalPrice: part.price,
          discountedPrice: part.indirimliPrice,
        });
      }
    });
    // Aksesuarlar
    insertedAccessories.forEach(acc => {
      if (acc.discounted && acc.indirimliPrice) {
        discountedProducts.push({
          productType: 'accessory',
          productId: acc._id,
          name: acc.name,
          image: acc.images[0],
          originalPrice: acc.price,
          discountedPrice: acc.indirimliPrice,
        });
      }
    });
    if (discountedProducts.length > 0) {
      console.log('DiscountedProduct olarak eklenecekler:', discountedProducts);
      await DiscountedProduct.insertMany(discountedProducts);
      const allDiscounted = await DiscountedProduct.find({});
      console.log('EKLEME SONRASI discountedproducts:', allDiscounted);
      setTimeout(() => process.exit(), 10000); // 10 saniye bekle
    } else {
      console.log('Hiç indirimli ürün bulunamadı! discountedProducts dizisi:', discountedProducts);
      setTimeout(() => process.exit(), 10000);
    }
  })
  .catch(err => {
    console.error('Hata:', err);
    process.exit(1);
  }); 