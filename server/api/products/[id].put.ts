import connectDB from '~/server/utils/db';
import Product from '~/server/models/Product';

export default defineEventHandler(async (event) => {
  await connectDB();
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  const product = await Product.findByIdAndUpdate(
    id, 
    body, 
    { new: true, runValidators: true } // new: true = return updated data
  );

  if (!product) {
    throw createError({ statusCode: 404, message: 'Produk tidak ditemukan' });
  }

  return product;
});