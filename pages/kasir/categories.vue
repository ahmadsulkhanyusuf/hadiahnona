<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <!-- HEADER -->
    <header class="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center z-20 sticky top-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <i class="fa-solid fa-tag text-xl"></i>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-lg text-gray-800 tracking-tight leading-none">Kategori Produk</span>
          <span class="text-xs text-gray-500 font-medium">Manajemen Label & Grouping</span>
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
        <NuxtLink to="/kasir/reports"
          class="p-2 rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition" title="Laporan">
          <i class="fa-solid fa-chart-line text-lg"></i>
        </NuxtLink>
      </div>
    </header>

    <div class="max-w-4xl mx-auto p-6 md:p-8 pb-24">

      <!-- Form Tambah (Card style) -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div class="flex-1 w-full">
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tambah Kategori
            Baru</label>
          <div class="relative group">
            <i
              class="fa-solid fa-tag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition"></i>
            <input v-model="newCategory" @keyup.enter="submitCategory" type="text"
              placeholder="Masukkan nama kategori..."
              class="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-sm">
          </div>
        </div>
        <button @click="submitCategory" :disabled="!newCategory.trim()"
          class="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          <i class="fa-solid fa-plus"></i> Tambah
        </button>
      </div>

      <!-- List Kategori -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 class="font-bold text-gray-800">Daftar Kategori</h2>
          <span class="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">{{ categories?.length
            || 0 }} Item</span>
        </div>

        <table class="w-full text-left border-collapse">
          <thead class="bg-white text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th class="px-6 py-4 w-16 text-center">No</th>
              <th class="px-6 py-4">Nama Kategori</th>
              <th class="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="categories?.length === 0">
              <td colspan="3" class="px-6 py-12 text-center text-gray-400">
                <i class="fa-solid fa-tags text-4xl mb-3 opacity-30"></i>
                <p>Belum ada kategori</p>
              </td>
            </tr>
            <tr v-for="(cat, index) in categories" :key="cat._id" class="hover:bg-gray-50 transition group">
              <td class="px-6 py-4 text-center text-gray-400 font-mono text-sm">{{ index + 1 }}</td>
              <td class="px-6 py-4 font-bold text-gray-700">{{ cat.name }}</td>
              <td class="px-6 py-4 text-right">
                <button @click="deleteCategory(cat._id)"
                  class="w-9 h-9 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition"
                  title="Hapus Kategori">
                  <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const router = useRouter();

// Fetch Kategori
const { data: categories, refresh } = await useFetch<Category[]>('/api/categories');

const newCategory = ref('');

const submitCategory = async () => {
  if (!newCategory.value.trim()) return;

  await $fetch('/api/categories', { method: 'POST', body: { name: newCategory.value } });
  newCategory.value = ''; // Reset form
  refresh(); // Refresh list
};

const deleteCategory = async (id: string) => {
  if (!confirm('Hapus kategori ini? Produk dengan kategori ini tetap ada tapi tidak terkategori.')) return;
  await $fetch(`/api/categories/${id}`, { method: 'DELETE' });
  refresh();
};
</script>