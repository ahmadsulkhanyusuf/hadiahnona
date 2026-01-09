import connectDB from '~/server/utils/db';
import Category from '~/server/models/Category';

export default defineEventHandler(async (event) => {
  await connectDB();
  const id = getRouterParam(event, 'id');
  
  await Category.findByIdAndDelete(id);
  return { success: true };
});