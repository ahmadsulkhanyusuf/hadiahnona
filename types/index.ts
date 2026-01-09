export interface User {
  _id: string;
  username: string;
  password: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;          // Harga Jual
  purchasePrice: number;  // Harga Beli
  stock: number;
  category: string;
  image?: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface CartItem extends Product {
  qty: number;
}

// TAMBAHKAN INI
export interface Transaction {
  _id: string;
  userId: string;
  total: number;
  items: {
    productId: string;
    name: string;
    price: number;
    qty: number;
    subtotal: number;
  }[];
  createdAt: string; // Biasanya string dari ISO Date
}