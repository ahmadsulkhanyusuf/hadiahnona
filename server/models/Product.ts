import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  purchasePrice: { type: Number, required: true, default: 0 }, // Tambah ini
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  image: { type: String }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);