interface Motorcycle {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  description: string;
  features: string[];
  specs: {
    motor: string;
    şanzıman: string;
    maksGüç: string;
    maksimumTork: string;
    yakıtTüketimi: string;
    uzunluk: string;
    genişlik: string;
    yükseklik: string;
    seleYüksekliği: string;
    aksAralığı: string;
    ağırlık: string;
  };
  images: string[];
}

const motorcycles: Record<string, Motorcycle> = {
  'mt-09': {
    id: 'mt-09',
    name: 'MT-09',
    category: 'Hyper Naked',
    price: 485000,
    colors: ['Siyah', 'Mavi', 'Gri'],
    description: 'Yeni nesil 889cc CP3 motoru, ultra hafif alüminyum şasisi ve en gelişmiş elektronik kontrol teknolojisi ile MT-09, Yamaha\'nın ikonik Hyper Naked tasarımını bir adım öteye taşıyor.',
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
      '/motorcycles/mt-09/1.jpg',
      '/motorcycles/mt-09/2.jpg',
      '/motorcycles/mt-09/3.jpg',
      '/motorcycles/mt-09/4.jpg'
    ]
  },
  'r1': {
    id: 'r1',
    name: 'R1',
    category: 'Supersport',
    price: 850000,
    colors: ['Mavi', 'Siyah', 'Kırmızı'],
    description: 'YZF-R1, Yamaha\'nın yarış pistindeki MotoGP teknolojisini sokağa taşımak için tasarlanmış, en gelişmiş süper spor motosikletidir.',
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
      '/motorcycles/r1/1.jpg',
      '/motorcycles/r1/2.jpg',
      '/motorcycles/r1/3.jpg',
      '/motorcycles/r1/4.jpg'
    ]
  },
  'tracer-9-gt': {
    id: 'tracer-9-gt',
    name: 'Tracer 9 GT',
    category: 'Sport Touring',
    price: 545000,
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
      '/motorcycles/tracer-9-gt/1.jpg',
      '/motorcycles/tracer-9-gt/2.jpg',
      '/motorcycles/tracer-9-gt/3.jpg',
      '/motorcycles/tracer-9-gt/4.jpg'
    ]
  }
};

export function getMotorcycle(id: string): Motorcycle | null {
  return motorcycles[id] || null;
}

export function getAllMotorcycles(): Motorcycle[] {
  return Object.values(motorcycles);
}

export function getColorCode(color: string): string {
  const colorMap: Record<string, string> = {
    'Siyah': '#000000',
    'Mavi': '#0000FF',
    'Gri': '#808080',
    'Kırmızı': '#FF0000'
  };
  return colorMap[color] || '#CCCCCC';
} 