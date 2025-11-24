
export enum TransactionType {
  SALE = 'SALE',
  EXPENSE = 'EXPENSE',
  PURCHASE = 'PURCHASE',
  INCOME = 'INCOME',
  PAYMENT = 'PAYMENT'
}

export enum PaymentMethod {
  CASH = 'CASH',
  VISA = 'VISA',
  TRANSFER = 'TRANSFER',
  CREDIT = 'CREDIT'
}

export interface Product {
  id: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  code?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  type: 'CLIENT' | 'SUPPLIER';
  balance: number; // Positive means they owe us, negative means we owe them
  notes?: string;
}

export interface TransactionItem {
  productId: string;
  quantity: number;
  price: number; // Price at moment of sale/purchase (Buy Price for PURCHASE)
  sellPrice?: number; // Intended Sell Price for this specific batch (Only for PURCHASE)
  productName: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  note?: string;
  createdBy?: { name: string; phone: string } | string; // Updated to support object with phone
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // Net amount (Total - Discount)
  date: string; // ISO string
  paymentMethod: PaymentMethod;
  contactId?: string;
  notes?: string;
  items?: TransactionItem[]; // For SALE and PURCHASE
  discount?: number;
  paidAmount?: number;
  paymentHistory?: PaymentRecord[];
  
  // New field to track who created this transaction
  createdBy?: {
      name: string;
      phone: string;
  };
}

export interface DashboardStats {
  dailySales: number;
  dailyExpenses: number;
  dailyPurchases: number;
  dailyProfit: number;
  lowStockCount: number;
}

// --- Permissions ---
export type Permission = 
  | 'DASHBOARD' 
  | 'INVENTORY' 
  | 'SALES' 
  | 'PURCHASES' 
  | 'EXPENSES' 
  | 'CONTACTS' 
  | 'REPORTS';

export interface Partner {
  id?: string; // Unique ID for the partner
  name: string; // Partner/Employee Name
  phone: string;
  permissions: Permission[];
}