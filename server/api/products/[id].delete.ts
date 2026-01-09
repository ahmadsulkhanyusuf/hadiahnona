import connectDB from '~/server/utils/db';
import Product from '~/server/models/Product';

export default defineEventHandler(async (event) => {
  await connectDB();
  const id = getRouterParam(event, 'id');
  
  await Product.findByIdAndDelete(id);
  return { success: true };
});