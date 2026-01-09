import { readFormData } from 'h3'; // Utilitas bawaan Nuxt untuk form data
import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get('file') as File;

  if (!file) {
    throw createError({ statusCode: 400, message: 'Tidak ada file yang diupload' });
  }

  // Validasi tipe file (Hanya gambar)
  if (!file.type.startsWith('image/')) {
    throw createError({ statusCode: 400, message: 'Hanya file gambar yang diperbolehkan' });
  }

  // Generate nama file unik (timestamp + nama asli)
  const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '');
  
  // Tentukan path penyimpanan (Root/public/uploads)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, filename);

  // Buat folder jika belum ada
  await fs.mkdir(uploadDir, { recursive: true });

  // Convert File ke Buffer dan tulis ke disk
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filePath, buffer);

  // Return URL yang bisa diakses oleh browser
  return {
    url: `/uploads/${filename}`
  };
});