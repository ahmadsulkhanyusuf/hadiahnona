import connectDB from '~/server/utils/db';
import Category from '~/server/models/Category';

export default defineEventHandler(async (event) => {
  await connectDB();
  const categories = await Category.find({}).sort({ name: 1 });
  return categories;
});