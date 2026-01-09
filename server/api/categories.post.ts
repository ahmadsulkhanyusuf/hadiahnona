import connectDB from '~/server/utils/db';
import Category from '~/server/models/Category';

export default defineEventHandler(async (event) => {
  await connectDB();
  const body = await readBody(event);
  
  try {
    const category = await Category.create({ name: body.name });
    return category;
  } catch (error: any) {
    if (error.code === 11000) {
      throw createError({ statusCode: 400, message: 'Nama kategori sudah ada' });
    }
    throw error;
  }
});