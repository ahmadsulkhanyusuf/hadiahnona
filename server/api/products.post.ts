import connectDB from '~/server/utils/db';
import Product from '~/server/models/Product';

export default defineEventHandler(async (event) => {
  await connectDB();
  const body = await readBody(event);
  
  const product = await Product.create(body);
  return product;
});