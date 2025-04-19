export interface Motorcycle {
  id: string;
  model: string;
  description: string;
  price: number;
  cc: number;
  imageUrl: string;
  stock: number;
  category: "motorsiklet" | "scooter" | "yedek-parca" | "aksesuar";
  power: number; // Beygir gücü (HP)
  colors: string[]; // Mevcut renk seçenekleri
  discount?: number; // İndirim yüzdesi (varsa)
  installmentOptions: number[]; // Taksit seçenekleri [3, 6, 9, 12] gibi
  features: string[]; // Özellikler
  isNew?: boolean; // Yeni model mi?
  tags?: string[]; // Örneğin ["indirimli", "yeni-sezon"] gibi
}

export const motorcycles: Motorcycle[] = [
  {
    id: "yzf-r1",
    model: "YZF-R1",
    description: "SpeedHorizon'ın süper spor motorsikleti, 998cc motor hacmi ile yüksek performans sunar.",
    price: 280000,
    cc: 998,
    imageUrl: "/images/yzf-r1.jpg",
    stock: 5,
    category: "motorsiklet",
    power: 200,
    colors: ["Racing Blue", "Tech Black", "Icon Performance"],
    installmentOptions: [3, 6, 9, 12],
    features: ["6 eksenli IMU", "Quickshifter", "Yarış ABS", "Yarış odaklı elektronik paket"],
    isNew: false,
    tags: ["super-sport", "premium"]
  },
  {
    id: "mt-09",
    model: "MT-09",
    description: "Naked tarzı agresif görünümlü motorsiklet, 890cc motor hacmi ile çevik sürüş sağlar.",
    price: 195000,
    cc: 890,
    imageUrl: "/images/mt-09.jpg",
    stock: 8,
    category: "motorsiklet",
    power: 119,
    colors: ["Icon Blue", "Tech Black", "Storm Grey"],
    discount: 5, // %5 indirimli
    installmentOptions: [3, 6, 9],
    features: ["CP3 üç silindirli motor", "Hafif alüminyum şasi", "TFT gösterge paneli"],
    tags: ["naked", "indirimli"]
  },
  {
    id: "tracer-9-gt",
    model: "Tracer 9 GT",
    description: "Spor tur motorsikleti, uzun yolculuklar için konfor ve performans sunar.",
    price: 230000,
    cc: 890,
    imageUrl: "/images/tracer-9-gt.jpg",
    stock: 3,
    category: "motorsiklet",
    power: 119,
    colors: ["Redline", "Icon Performance"],
    installmentOptions: [3, 6, 9, 12],
    features: ["Elektronik süspansiyon", "Yan çantalar", "Hız sabitleyici", "Isıtmalı elcikler"],
    isNew: true,
    tags: ["sport-touring", "yeni-sezon"]
  },
  {
    id: "tenere-700",
    model: "Ténéré 700",
    description: "Macera odaklı enduro motorsikleti, zorlu arazilerde üstün performans gösterir.",
    price: 210000,
    cc: 689,
    imageUrl: "/images/tenere-700.jpg",
    stock: 6,
    category: "motorsiklet",
    power: 73,
    colors: ["Ceramic Ice", "Icon Blue", "Midnight Black"],
    installmentOptions: [3, 6, 9],
    features: ["Uzun mesafe yakıt deposu", "Rally-inspired tasarım", "CP2 motor", "Tam ayarlanabilir süspansiyon"],
    tags: ["adventure", "enduro"]
  },
  {
    id: "xsr-900",
    model: "XSR 900",
    description: "Neo-retro tasarım ile klasik görünüm ve modern teknoloji bir arada.",
    price: 205000,
    cc: 890,
    imageUrl: "/images/xsr-900.jpg",
    stock: 4,
    category: "motorsiklet",
    power: 119,
    colors: ["Legend Blue", "Midnight Black", "Racing Red"],
    installmentOptions: [3, 6, 9],
    features: ["CP3 motor", "Retro tasarım", "Modern teknoloji", "Cruise control"],
    tags: ["sport-heritage", "retro"]
  },
  {
    id: "nmax-155",
    model: "NMAX 155",
    description: "Şehir içi kullanıma uygun, ekonomik ve konforlu scooter.",
    price: 85000,
    cc: 155,
    imageUrl: "/images/nmax-155.jpg",
    stock: 10,
    category: "scooter",
    power: 15,
    colors: ["Phantom Blue", "Power Grey", "Milky White"],
    discount: 10, // %10 indirimli
    installmentOptions: [3, 6],
    features: ["Start-Stop sistemi", "ABS", "Akıllı telefon bağlantısı", "Geniş bagaj alanı"],
    tags: ["scooter", "indirimli", "ekonomik"]
  },
  {
    id: "tmax-tech-max",
    model: "TMAX Tech MAX",
    description: "Premium spor scooter, yüksek performans ve lüks donanımlar sunar.",
    price: 190000,
    cc: 560,
    imageUrl: "/images/tmax-tech-max.jpg",
    stock: 2,
    category: "scooter",
    power: 47,
    colors: ["Tech Kamo", "Power Grey"],
    installmentOptions: [3, 6, 9, 12],
    features: ["Elektronik süspansiyon", "Isıtmalı koltuk", "Isıtmalı elcikler", "TFT gösterge"],
    isNew: true,
    tags: ["premium", "yeni-sezon", "scooter"]
  },
  {
    id: "mt-09-egzoz",
    model: "MT-09 Akrapovic Egzoz",
    description: "MT-09 için Akrapovic imzalı titanyum egzoz sistemi.",
    price: 28000,
    cc: 0,
    imageUrl: "/images/mt-09-exhaust.jpg",
    stock: 12,
    category: "yedek-parca",
    power: 0,
    colors: ["Titanyum"],
    installmentOptions: [3],
    features: ["Hafif titanyum yapı", "Performans artışı sağlar", "Derin ses"],
    tags: ["yedek-parca", "performance"]
  },
  {
    id: "deri-mont",
    model: "SpeedHorizon Deri Mont",
    description: "SpeedHorizon logolu, koruma pedlerine sahip, yüksek kaliteli deri mont.",
    price: 12500,
    cc: 0,
    imageUrl: "/images/leather-jacket.jpg",
    stock: 20,
    category: "aksesuar",
    power: 0,
    colors: ["Siyah", "Siyah-Mavi"],
    discount: 15, // %15 indirimli
    installmentOptions: [3],
    features: ["CE sertifikalı koruma", "Su geçirmez", "Çıkarılabilir termal astar"],
    tags: ["aksesuar", "indirimli", "giyim"]
  },
  {
    id: "yamaha-kask",
    model: "SpeedHorizon Racing Kask",
    description: "Yarış serisi, hafif, aerodinamik tam yüz kask.",
    price: 7500,
    cc: 0,
    imageUrl: "/images/racing-helmet.jpg",
    stock: 15,
    category: "aksesuar",
    power: 0,
    colors: ["Racing Blue", "Tech Black", "Icon Performance"],
    installmentOptions: [3],
    features: ["Karbon fiber yapı", "Pinlock vizör", "Havalandırma kanalları"],
    tags: ["aksesuar", "güvenlik", "giyim"]
  }
]; 