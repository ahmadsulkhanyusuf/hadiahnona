import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '~/server/utils/db';
import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  await connectDB();
  
  // Hardcode admin pertama kali jika belum ada (Untuk demo)
  let user = await User.findOne({ username });
  if (!user) {
    const hashedPassword = await bcrypt.hash('1kisahya', 10);
    user = await User.create({ username: 'satukisahya@gmail.com', password: hashedPassword });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw createError({ statusCode: 401, message: 'Password salah' });
  }

  const config = useRuntimeConfig();
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: { username: user.username }
  };
});