import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    qty: Number,
    subtotal: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);