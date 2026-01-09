<template>
  <!-- CONTAINER UTAMA -->
  <div class="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-50 relative font-sans">

    <!-- AREA PRODUK -->
    <main class="flex-1 flex flex-col h-full relative z-0">

      <!-- Header -->
      <header
        class="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center z-20 shrink-0 sticky top-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            <i class="fa-solid fa-store text-xl"></i>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-lg text-gray-800 tracking-tight leading-none">Hadiah Nona</span>
            <span class="text-xs text-gray-500 font-medium">Point of Sale</span>
          </div>
        </div>

        <!-- Navigasi & User -->
        <div class="flex items-center gap-2 sm:gap-4">
          <NuxtLink to="/kasir/inventory"
            class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition"
            title="Manajemen Stok">
            <i class="fa-solid fa-box"></i>
          </NuxtLink>
          <NuxtLink to="/kasir/reports"
            class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition"
            title="Laporan Penjualan">
            <i class="fa-solid fa-chart-line"></i>
          </NuxtLink>
          <div class="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
          <button @click="confirmLogout"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition text-sm font-bold">
            <i class="fa-solid fa-sign-out-alt"></i>
            <span class="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      <!-- Content Scrollable Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-6 pb-[35vh] md:pb-6 scroll-smooth">

        <!-- Search & Filter -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div class="relative w-full sm:w-72 group">
            <i
              class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition"></i>
            <input v-model="search" type="text" placeholder="Cari produk..."
              class="w-full pl-11 pr-4 py-3 rounded-xl border-none ring-1 ring-gray-200 bg-white focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm transition-all hover:shadow-md">
          </div>

          <div class="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            <button @click="selectedCategory = 'all'"
              :class="selectedCategory === 'all' ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'"
              class="px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border border-transparent">
              Semua
            </button>
            <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
              :class="selectedCategory === cat ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'"
              class="px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border border-transparent">
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Grid Produk -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div v-for="product in filteredProducts" :key="product._id" @click="addToCart(product)"
            class="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full relative overflow-hidden">

            <div class="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
              <img :src="product.image || `https://picsum.photos/seed/${product._id}/400/300`"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              <button
                class="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full shadow-lg text-emerald-600 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>

            <div class="flex flex-col flex-1 pl-1">
              <h3 class="font-bold text-gray-800 mb-1 leading-snug line-clamp-2">{{ product.name }}</h3>
              <div class="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
                <div :class="product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold">
                  {{ product.stock > 0 ? 'Ready' : 'Habis' }}
                </div>
                <span>Stok: {{ product.stock }}</span>
              </div>
              <div class="mt-auto flex items-end justify-between">
                <div class="text-emerald-600 font-extrabold text-base">
                  <span class="text-xs font-medium text-emerald-400 mr-0.5">Rp</span>{{
                    product.price.toLocaleString('id-ID') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-400">
          <i class="fa-solid fa-box-open text-6xl mb-4 opacity-20"></i>
          <p>Produk tidak ditemukan</p>
        </div>

        <div class="h-20 md:hidden"></div>
      </div>
    </main>

    <!-- CART SIDEBAR -->
    <!-- Menggunakan class dynamic untuk show/hide tanpa direct DOM manipulation -->
    <aside :class="[
      'fixed bottom-0 z-40 w-full h-[45vh] bg-white rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.1)] transition-transform duration-300 cubic-bezier',
      'md:relative md:w-96 md:h-full md:rounded-none md:border-l md:shadow-none md:translate-y-0',
      isCartOpen ? 'translate-y-0' : 'translate-y-full'
    ]" class="flex flex-col font-sans">

      <!-- Handle untuk Mobile Drag (Visual Cue) -->
      <div class="md:hidden w-full flex justify-center pt-3 pb-1" @click="toggleCart">
        <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>

      <div class="px-6 py-4 border-b flex justify-between items-center bg-white rounded-t-3xl md:rounded-none shrink-0">
        <div>
          <h2 class="font-bold text-xl text-gray-800">Keranjang</h2>
          <p class="text-xs text-gray-400">Order #{{ Math.floor(Math.random() * 10000) }}</p>
        </div>
        <button v-if="cart.length > 0" @click="clearCart"
          class="text-xs text-red-500 hover:text-red-700 font-bold hover:underline">
          Hapus Semua
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-full text-gray-300">
          <i class="fa-solid fa-basket-shopping text-6xl mb-4 text-gray-100"></i>
          <p class="font-medium">Belum ada item</p>
        </div>

        <div v-for="item in cart" :key="item._id"
          class="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 group">
          <img :src="item.image || `https://picsum.photos/seed/${item._id}/100/100`"
            class="w-14 h-14 rounded-lg object-cover bg-gray-100">
          <div class="flex-1 min-w-0">
            <div class="text-sm font-bold text-gray-800 truncate">{{ item.name }}</div>
            <div class="text-xs text-gray-500 mb-1">Rp {{ item.price.toLocaleString('id-ID') }}</div>
          </div>
          <div class="flex items-center gap-3 bg-white border rounded-full px-2 py-1 shadow-sm">
            <button @click="updateQty(item._id, -1)"
              class="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
              <i class="fa-solid fa-minus text-xs"></i>
            </button>
            <span class="text-sm font-bold w-4 text-center text-gray-700">{{ item.qty }}</span>
            <button @click="updateQty(item._id, 1)"
              class="w-6 h-6 flex items-center justify-center rounded-full text-emerald-600 hover:bg-emerald-50 transition">
              <i class="fa-solid fa-plus text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="p-6 bg-gray-50 border-t shrink-0 md:mb-0 mb-safe">
        <div class="space-y-2 mb-6">
          <div class="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>Rp {{ total.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Pajak (0%)</span>
            <span>Rp 0</span>
          </div>
          <div class="border-t border-dashed border-gray-300 my-2"></div>
          <div class="flex justify-between text-xl font-extrabold text-gray-800 items-end">
            <span>Total</span>
            <span class="text-emerald-600">Rp {{ total.toLocaleString('id-ID') }}</span>
          </div>
        </div>
        <button @click="openCheckoutModal" :disabled="cart.length === 0"
          class="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          Bayar Sekarang
        </button>
      </div>
    </aside>

    <!-- Mobile Floating Trigger -->
    <!-- Overlay background saat cart terbuka di mobile -->
    <div v-if="isCartOpen" @click="isCartOpen = false"
      class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity"></div>

    <button @click="toggleCart"
      class="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-emerald-300 shadow-2xl z-50 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
      <i :class="isCartOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-cart-shopping'" class="text-2xl"></i>
      <div v-if="!isCartOpen && cart.length > 0"
        class="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white">
        {{ cart.length }}
      </div>
    </button>

    <!-- MODAL CHECKOUT -->
    <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="showCheckout" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showCheckout = false"></div>

        <!-- Modal Content -->
        <div
          class="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
          <div class="p-6 border-b flex justify-between items-center bg-gray-50">
            <h3 class="font-bold text-xl text-gray-800">Konfirmasi Pembayaran</h3>
            <button @click="showCheckout = false"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>

          <div class="p-6 overflow-y-auto">
            <div class="flex flex-col gap-4 mb-6">
              <div class="flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <span class="text-sm text-emerald-800 font-medium">Total Tagihan</span>
                <span class="text-2xl font-bold text-emerald-700">Rp {{ total.toLocaleString('id-ID') }}</span>
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Uang Diterima</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
                  <input v-model="cashReceived" type="number"
                    class="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-lg text-gray-800 transition"
                    placeholder="0" autofocus>
                </div>
              </div>

              <div v-if="change >= 0" class="flex justify-between items-center py-2">
                <span class="text-gray-600 font-medium">Kembalian</span>
                <span class="text-lg font-bold text-gray-800">Rp {{ change.toLocaleString('id-ID') }}</span>
              </div>
              <div v-else class="text-red-500 text-sm font-medium text-right">
                Kurang Rp {{ Math.abs(change).toLocaleString('id-ID') }}
              </div>
            </div>

            <div class="space-y-3">
              <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Ringkasan Pesanan</div>
              <div v-for="item in cart" :key="item._id" class="flex justify-between text-sm">
                <span class="text-gray-600">{{ item.qty }}x {{ item.name }}</span>
                <span class="font-medium text-gray-800">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</span>
              </div>
            </div>
          </div>

          <div class="p-6 border-t bg-gray-50">
            <button @click="processPayment" :disabled="change < 0 || isProcessing"
              class="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              <span v-if="isProcessing"
                class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isProcessing ? 'Memproses...' : 'Bayar & Cetak Struk' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- MODAL SUCCESS -->
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
      <div v-if="showSuccess" class="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
        <div
          class="relative bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center max-w-sm w-full border border-gray-100">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <i class="fa-solid fa-check text-4xl text-emerald-600"></i>
          </div>
          <h2 class="text-2xl font-black text-gray-800 mb-2">Pembayaran Berhasil!</h2>
          <p class="text-gray-500 mb-6">Transaksi telah berhasil disimpan dan struk sedang dicetak.</p>
          <div class="w-full space-y-3">
            <button @click="showSuccess = false"
              class="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- MODAL LOGOUT -->
    <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="showLogoutModal" class="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showLogoutModal = false"></div>
        <div
          class="relative bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center max-w-sm w-full border border-gray-100">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <i class="fa-solid fa-arrow-right-from-bracket text-3xl text-red-500 ml-1"></i>
          </div>
          <h2 class="text-2xl font-black text-gray-800 mb-2">Konfirmasi Keluar</h2>
          <p class="text-gray-500 mb-8">Apakah Anda yakin ingin mengakhiri sesi kasir ini?</p>
          <div class="flex gap-3 w-full">
            <button @click="showLogoutModal = false"
              class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
              Batal
            </button>
            <button @click="processLogout"
              class="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-200 transition">
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

definePageMeta({
  layout: 'pos',
  middleware: 'auth'
});

const router = useRouter();

// --- LOGIC ---
const { cart, addToCart, updateQty, clearCart, total } = useCart();
const search = ref('');
const selectedCategory = ref('all');
const isCartOpen = ref(false); // Mobile state

// Modal States
const showCheckout = ref(false);
const showSuccess = ref(false);
const showLogoutModal = ref(false); // New state for logout modal
const isProcessing = ref(false);
const cashReceived = ref<number | ''>('');

// Fetch Products
const { data: products, refresh } = await useFetch<Product[]>('/api/products');

// Ambil kategori unik untuk filter
const categories = computed(() => {
  if (!products.value) return [];
  return Array.from(new Set(products.value.map(p => p.category)));
});

const filteredProducts = computed(() => {
  if (!products.value) return [];
  return products.value.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.value.toLowerCase());
    const matchCat = selectedCategory.value === 'all' || p.category === selectedCategory.value;
    return matchSearch && matchCat;
  });
});

const change = computed(() => {
  const cash = Number(cashReceived.value) || 0;
  return cash - total.value;
});

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// Checkout Flow
const openCheckoutModal = () => {
  if (cart.value.length === 0) return;
  cashReceived.value = ''; // Reset cash input
  showCheckout.value = true;
};

const processPayment = async () => {
  // if (change.value < 0) return; // Sudah dihandle disable button, tapi double check ok

  isProcessing.value = true;
  const payload = cart.value.map(item => ({ productId: item._id, qty: item.qty }));

  try {
    await $fetch('/api/checkout', { method: 'POST', body: payload });

    // Simulate delay for aesthetics
    await new Promise(resolve => setTimeout(resolve, 800));

    showCheckout.value = false;
    showSuccess.value = true;

    clearCart();
    refresh();

    // Reset mobile cart state
    isCartOpen.value = false;

  } catch (e) {
    alert('Gagal transaksi: ' + (e as any).message); // Fallback jika error API
  } finally {
    isProcessing.value = false;
  }
};

const confirmLogout = () => {
  showLogoutModal.value = true;
};

const processLogout = () => {
  const token = useCookie('auth_token');
  token.value = null;
  router.push('/login');
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>