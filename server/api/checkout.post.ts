import jwt from 'jsonwebtoken';
import connectDB from '~/server/utils/db';
import Product from '~/server/models/Product';
import Transaction from '~/server/models/Transaction';

export default defineEventHandler(async (event) => {
  await connectDB();
  const config = useRuntimeConfig();
  const body = await readBody(event); // Array of { productId, qty }
  
  // 1. Ambil User dari Token
  const token = getCookie(event, 'auth_token');
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    userId = decoded.userId;
  } catch (e) {
    throw createError({ statusCode: 401, message: 'Invalid Token' });
  }

  // 2. Persiapan Data Transaksi
  let total = 0;
  const transactionItems = [];

  // 3. Update Stok & Kalkulasi Total
  for (const item of body) {
    const product = await Product.findById(item.productId);
    if (!product) continue; // Skip jika produk tidak ditemukan

    if (product.stock < item.qty) {
      throw createError({ statusCode: 400, message: `Stok tidak cukup untuk ${product.name}` });
    }

    // Kurangi Stok
    product.stock -= item.qty;
    await product.save();

    const subtotal = product.price * item.qty;
    total += subtotal;

    // Simpan detail item untuk transaksi
    transactionItems.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: item.qty,
      subtotal: subtotal
    });
  }

  // 4. Simpan Transaksi Baru
  await Transaction.create({
    userId,
    total,
    items: transactionItems
  });

  return { success: true, message: 'Transaksi berhasil disimpan', total };
});