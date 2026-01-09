import type { CartItem } from '~/types';

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []);

  const addToCart = (product: any) => {
    const existingItem = cart.value.find((item) => item._id === product._id);
    if (existingItem) {
      if (existingItem.qty < product.stock) {
        existingItem.qty++;
      }
    } else {
      cart.value.push({ ...product, qty: 1 });
    }
  };

  const removeFromCart = (productId: string) => {
    cart.value = cart.value.filter((item) => item._id !== productId);
  };

  const updateQty = (productId: string, delta: number) => {
    const item = cart.value.find((i) => i._id === productId);
    if (item) {
      const newQty = item.qty + delta;
      if (newQty <= 0) removeFromCart(productId);
      else item.qty = newQty;
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const total = computed(() => 
    cart.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
  );

  return { cart, addToCart, removeFromCart, updateQty, clearCart, total };
};