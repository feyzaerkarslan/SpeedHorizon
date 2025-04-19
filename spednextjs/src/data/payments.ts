export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded";
export type PaymentType = "credit-card" | "cash" | "bank-transfer" | "installment";

export interface CardInfo {
  lastFourDigits: string;
  cardholderName: string;
  expiryMonth: number;
  expiryYear: number;
  bank: string;
}

export interface InstallmentOption {
  months: number;
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  type: PaymentType;
  cardInfo?: CardInfo;
  installmentCount?: number;
  transactionId?: string;
  receiptUrl?: string;
  createdAt: string; // ISO formatında tarih
  completedAt?: string; // ISO formatında tarih
}

export const calculateInstallmentOptions = (price: number, months: number[]): InstallmentOption[] => {
  return months.map(month => {
    let interestRate = 0;
    
    // Örnek faiz oranları
    if (month === 3) interestRate = 0;
    else if (month === 6) interestRate = 1.5;
    else if (month === 9) interestRate = 2.5;
    else if (month === 12) interestRate = 3.5;
    
    const totalAmount = price * (1 + interestRate / 100 * (month / 3));
    const monthlyPayment = totalAmount / month;
    
    return {
      months: month,
      monthlyPayment: Math.round(monthlyPayment),
      totalAmount: Math.round(totalAmount),
      interestRate
    };
  });
};

export const payments: Payment[] = [
  {
    id: "pay1",
    orderId: "order1",
    userId: "user1",
    amount: 195000,
    status: "completed",
    type: "credit-card",
    cardInfo: {
      lastFourDigits: "4567",
      cardholderName: "AHMET YILMAZ",
      expiryMonth: 9,
      expiryYear: 25,
      bank: "Garanti Bankası"
    },
    transactionId: "txn_12345678",
    receiptUrl: "/receipts/pay1.pdf",
    createdAt: "2023-12-15T10:32:15.000Z",
    completedAt: "2023-12-15T10:33:45.000Z"
  }
]; 