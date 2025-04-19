import { CartItem } from "@/context/CartContext";

export type PaymentMethod = "credit-card" | "cash" | "bank-transfer";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  orderDate: string; // ISO formatında tarih
  estimatedDeliveryDate?: string;
  deliveredDate?: string;
  trackingNumber?: string;
  notes?: string;
  invoiceUrl?: string;
}

export const orders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    items: [
      {
        motorcycle: {
          id: "mt-09",
          model: "MT-09",
          description: "SpeedHorizon'ın naked tarzı agresif görünümlü motorsikleti, 890cc motor hacmi ile çevik sürüş sağlar.",
          price: 195000,
          cc: 890,
          imageUrl: "/images/mt-09.jpg",
          stock: 8,
          category: "motorsiklet",
          power: 119,
          colors: ["Icon Blue", "Tech Black", "Storm Grey"],
          discount: 5,
          installmentOptions: [3, 6, 9],
          features: ["CP3 üç silindirli motor", "Hafif alüminyum şasi", "TFT gösterge paneli"],
          tags: ["naked", "indirimli"]
        },
        quantity: 1,
        selectedColor: "Icon Blue"
      }
    ],
    totalAmount: 195000,
    status: "delivered",
    paymentMethod: "credit-card",
    shippingAddress: "Atatürk Cad. No: 123 İstanbul",
    orderDate: "2023-12-15T10:30:00.000Z",
    estimatedDeliveryDate: "2023-12-22T12:00:00.000Z",
    deliveredDate: "2023-12-21T14:35:00.000Z",
    trackingNumber: "SH12345678",
    notes: "Teslimatta zil çalın lütfen.",
    invoiceUrl: "/invoices/SH-INV-2023-001.pdf"
  },
  {
    id: "order2",
    userId: "user1",
    items: [
      {
        motorcycle: {
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
          discount: 15,
          installmentOptions: [3],
          features: ["CE sertifikalı koruma", "Su geçirmez", "Çıkarılabilir termal astar"],
          tags: ["aksesuar", "indirimli", "giyim"]
        },
        quantity: 1,
        selectedColor: "Siyah"
      },
      {
        motorcycle: {
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
        },
        quantity: 1,
        selectedColor: "Racing Blue"
      }
    ],
    totalAmount: 20000,
    status: "shipped",
    paymentMethod: "credit-card",
    shippingAddress: "Atatürk Cad. No: 123 İstanbul",
    orderDate: "2024-05-01T09:15:00.000Z",
    estimatedDeliveryDate: "2024-05-08T12:00:00.000Z",
    trackingNumber: "SH87654321",
    invoiceUrl: "/invoices/SH-INV-2024-042.pdf"
  },
  {
    id: "order3",
    userId: "user2",
    items: [
      {
        motorcycle: {
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
        quantity: 1,
        selectedColor: "Midnight Black"
      }
    ],
    totalAmount: 210000,
    status: "processing",
    paymentMethod: "bank-transfer",
    shippingAddress: "Cumhuriyet Mah. 1453 Sok. No: 7 Ankara",
    orderDate: "2024-05-10T11:20:00.000Z",
    estimatedDeliveryDate: "2024-05-17T12:00:00.000Z",
    invoiceUrl: "/invoices/SH-INV-2024-053.pdf"
  }
]; 