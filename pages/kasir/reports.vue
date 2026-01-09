<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <!-- HEADER -->
    <header class="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center z-20 sticky top-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <i class="fa-solid fa-chart-line text-xl"></i>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-lg text-gray-800 tracking-tight leading-none">Laporan Keuangan</span>
          <span class="text-xs text-gray-500 font-medium">Ringkasan Penjualan & Laba</span>
        </div>
      </div>

      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Back to Kasir -->
        <NuxtLink to="/kasir/"
          class="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition font-bold text-sm">
          <i class="fa-solid fa-arrow-left"></i>
          <span class="hidden sm:inline">Kembali ke Kasir</span>
        </NuxtLink>
        <div class="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
        <NuxtLink to="/kasir/inventory"
          class="p-2 rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition" title="Stok">
          <i class="fa-solid fa-box text-lg"></i>
        </NuxtLink>
        <NuxtLink to="/kasir/categories"
          class="p-2 rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition" title="Kategori">
          <i class="fa-solid fa-tag text-lg"></i>
        </NuxtLink>
      </div>
    </header>

    <div class="max-w-6xl mx-auto p-6 md:p-8 pb-24">

      <!-- Loading State -->
      <div v-if="pending" class="flex flex-col justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <span class="text-gray-500">Menghitung Laporan...</span>
      </div>

      <div v-else-if="transactions?.length === 0"
        class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <i class="fa-solid fa-file-invoice text-4xl text-gray-300"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">Belum Ada Transaksi</h3>
        <p class="text-gray-500 max-w-sm text-center">Data penjualan akan muncul di sini setelah Anda melakukan
          transaksi di kasir.</p>
      </div>

      <div v-else class="space-y-8">

        <!-- DASHBOARD SUMMARY -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Kartu 1: Total Omzet -->
          <div
            class="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6 border border-gray-100 relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition transform group-hover:scale-110">
              <i class="fa-solid fa-wallet text-6xl text-blue-500"></i>
            </div>
            <div class="relative z-10">
              <span class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 block">Total Omzet</span>
              <div class="text-3xl font-black text-gray-800 mb-2">
                Rp {{ totalOmzet.toLocaleString('id-ID') }}
              </div>
              <div
                class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                <i class="fa-solid fa-receipt"></i>
                {{ transactions?.length }} Transaksi
              </div>
            </div>
          </div>

          <!-- Kartu 2: Total Modal -->
          <div
            class="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6 border border-gray-100 relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition transform group-hover:scale-110">
              <i class="fa-solid fa-boxes-stacked text-6xl text-orange-500"></i>
            </div>
            <div class="relative z-10">
              <span class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 block">Total Modal (HPP)</span>
              <div class="text-3xl font-black text-gray-800 mb-2">
                Rp {{ totalModal.toLocaleString('id-ID') }}
              </div>
              <div
                class="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                Aset Keluar
              </div>
            </div>
          </div>

          <!-- Kartu 3: Keuntungan -->
          <div
            class="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-6 border border-gray-100 relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition transform group-hover:scale-110">
              <i class="fa-solid fa-sack-dollar text-6xl text-emerald-500"></i>
            </div>
            <div class="relative z-10">
              <span class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 block">Keuntungan Bersih</span>
              <div :class="['text-3xl font-black mb-2', totalLaba >= 0 ? 'text-emerald-600' : 'text-red-600']">
                Rp {{ totalLaba.toLocaleString('id-ID') }}
              </div>
              <div
                class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                <i class="fa-solid fa-chart-simple"></i>
                {{ totalLaba >= 0 ? 'Profit' : 'Loss' }}
              </div>
            </div>
          </div>
        </div>

        <!-- DAFTAR TRANSAKSI DETAIL -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
          <div class="px-8 py-6 border-b bg-white flex justify-between items-center shrink-0 z-10">
            <div>
              <h2 class="font-bold text-xl text-gray-800">Riwayat Transaksi</h2>
              <p class="text-xs text-gray-400 mt-1">Daftar semua transaksi yang tercatat</p>
            </div>
            <button @click="handleRefresh"
              class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition">
              <i class="fa-solid fa-rotate-right" :class="{ 'animate-spin': refreshPending }"></i>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 custom-scrollbar bg-gray-50/50">
            <div v-for="trx in transactions" :key="trx._id"
              class="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300">

              <!-- Header Card Transaksi -->
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
                    <i class="fa-solid fa-bag-shopping"></i>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-gray-400 uppercase tracking-wide">ID: #{{
                      trx._id.substring(trx._id.length - 6) }}</div>
                    <div class="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <i class="fa-regular fa-clock text-xs"></i> {{ formatDate(trx.createdAt) }}
                    </div>
                  </div>
                </div>
                <div class="text-right self-end sm:self-auto">
                  <div class="text-xl font-black text-gray-800">Rp {{ trx.total.toLocaleString('id-ID') }}</div>
                  <div class="text-xs text-gray-400 font-medium">{{ trx.items.length }} Item Terjual</div>
                </div>
              </div>

              <!-- List Item Detail (Expandable look) -->
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="flex flex-col gap-2">
                  <div v-for="item in trx.items" :key="item.productId"
                    class="flex justify-between items-center text-sm">
                    <div class="flex gap-3 items-center">
                      <span
                        class="bg-white border px-2 py-0.5 rounded text-gray-600 font-bold text-xs min-w-[24px] text-center shadow-sm">{{
                        item.qty }}x</span>
                      <span class="font-medium text-gray-700">{{ item.name }}</span>
                    </div>
                    <div class="font-bold text-gray-500">Rp {{ item.subtotal.toLocaleString('id-ID') }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Spacer -->
            <div class="h-8"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction, Product } from '~/types';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

// State refresh
const refreshPending = ref(false);

// 1. Fetch Transaksi (Limit opsional di sini, misal 1000 terakhir)
const { data: transactions, pending, refresh } = await useFetch<Transaction[]>('/api/transactions', {
  // Query params if needed
});

// 2. Fetch Produk untuk hitung modal
const { data: products } = await useFetch<Product[]>('/api/products');

// Fungsi Helper Refresh Manual
const handleRefresh = async () => {
  refreshPending.value = true;
  await refresh();
  refreshPending.value = false;
};

// 3. Fungsi Format Tanggal
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// 4. Computed Properties
const totalOmzet = computed(() => {
  if (!transactions.value) return 0;
  return transactions.value.reduce((sum, trx) => sum + trx.total, 0);
});

const totalModal = computed(() => {
  if (!transactions.value || !products.value) return 0;

  let modal = 0;
  transactions.value.forEach(trx => {
    trx.items.forEach(item => {
      const product = products.value?.find(p => p._id === item.productId);
      const purchasePrice = product ? product.purchasePrice : 0;
      modal += (purchasePrice * item.qty);
    });
  });

  return modal;
});

const totalLaba = computed(() => {
  return totalOmzet.value - totalModal.value;
});
</script>

<style scoped>
/* Styling scrollbar custom */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>