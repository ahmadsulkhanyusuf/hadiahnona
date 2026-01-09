import jwt from 'jsonwebtoken';
import connectDB from '~/server/utils/db';
import Transaction from '~/server/models/Transaction';

export default defineEventHandler(async (event) => {
  await connectDB();
  const config = useRuntimeConfig();
  
  // 1. Verifikasi User
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

  // 2. Ambil Data Transaksi User ini, diurutkan dari yang terbaru
  const transactions = await Transaction.find({ userId })
    .sort({ createdAt: -1 })
    .lean(); // .lean() untuk performa lebih baik

  return transactions;
});