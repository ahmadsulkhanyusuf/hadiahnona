import connectDB from '~/server/utils/db';
import Product from '~/server/models/Product';

export default defineEventHandler(async (event) => {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return products;
});