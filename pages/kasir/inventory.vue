<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <!-- HEADER -->
    <header class="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center z-20 sticky top-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <i class="fa-solid fa-box text-xl"></i>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-lg text-gray-800 tracking-tight leading-none">Manajemen Stok</span>
          <span class="text-xs text-gray-500 font-medium">Inventaris Produk</span>
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
        <NuxtLink to="/kasir/categories"
          class="p-2 rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition" title="Kategori">
          <i class="fa-solid fa-tag text-lg"></i>
        </NuxtLink>
        <NuxtLink to="/kasir/reports"
          class="p-2 rounded-xl text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition" title="Laporan">
          <i class="fa-solid fa-chart-line text-lg"></i>
        </NuxtLink>
      </div>
    </header>

    <div class="max-w-6xl mx-auto p-6 md:p-8 pb-24">

      <!-- Action Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div class="relative w-full md:w-96">
          <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input type="text" placeholder="Cari produk..."
            class="w-full pl-11 pr-4 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500 shadow-sm transition outline-none">
        </div>
        <button @click="openModal"
          class="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
          <i class="fa-solid fa-plus"></i> Tambah Produk
        </button>
      </div>

      <!-- Tabel Produk -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th class="px-6 py-4">Produk</th>
                <th class="px-6 py-4">Kategori</th>
                <th class="px-6 py-4">Harga Beli</th>
                <th class="px-6 py-4">Harga Jual</th>
                <th class="px-6 py-4">Stok</th>
                <th class="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-if="products?.length === 0">
                <td colspan="6" class="p-8 text-center text-gray-400">
                  <i class="fa-solid fa-box-open text-4xl mb-2 opacity-50"></i>
                  <p>Belum ada data produk</p>
                </td>
              </tr>
              <tr v-for="product in products" :key="product._id" class="hover:bg-gray-50/80 transition-colors group">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      <img :src="product.image || `https://picsum.photos/seed/${product._id}/100/100`"
                        class="w-full h-full object-cover">
                    </div>
                    <span class="font-bold text-gray-700 leading-tight">{{ product.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">{{
                    product.category }}</span>
                </td>
                <td class="px-6 py-4 text-gray-500 font-mono text-sm">Rp {{
                  product.purchasePrice.toLocaleString('id-ID') }}</td>
                <td class="px-6 py-4 text-emerald-600 font-bold font-mono text-sm">Rp {{
                  product.price.toLocaleString('id-ID') }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div
                      :class="['w-2 h-2 rounded-full', product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500']">
                    </div>
                    <span :class="['font-bold text-sm', product.stock < 5 ? 'text-red-600' : 'text-gray-700']">
                      {{ product.stock }} Unit
                    </span>
                  </div>
                </td>
                <!-- Kolom Aksi -->
                <td class="px-4 py-4 text-right sticky right-0 bg-white group-hover:bg-gray-50/80 transition-colors">
                  <div class="flex justify-end gap-2">
                    <button @click="editProduct(product)"
                      class="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition shadow-sm border border-blue-100"
                      title="Edit">
                      <i class="fa-solid fa-pen text-sm"></i>
                    </button>
                    <button @click="deleteProduct(product._id)"
                      class="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition shadow-sm border border-red-100"
                      title="Hapus">
                      <i class="fa-solid fa-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL FORM -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="showModal"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

          <div class="px-6 py-5 border-b bg-gray-50 flex justify-between items-center">
            <h2 class="font-bold text-xl text-gray-800">{{ form._id ? 'Edit Produk' : 'Tambah Produk Baru' }}</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition"><i
                class="fa-solid fa-times text-xl"></i></button>
          </div>

          <form @submit.prevent="submitProduct" class="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div class="space-y-5">

              <!-- Input Gambar -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Foto Produk</label>
                <div
                  class="flex items-start gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-white hover:border-emerald-400 transition">
                  <div
                    class="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                    <img v-if="imageUrl" :src="imageUrl" class="w-full h-full object-cover" />
                    <i v-else class="fa-solid fa-image text-gray-400 text-3xl"></i>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-gray-500 mb-2">Upload gambar produk (Max 2MB)</p>
                    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*"
                      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" />
                    <p v-if="uploading" class="text-xs text-emerald-600 mt-2 font-bold flex items-center gap-1"><i
                        class="fa-solid fa-spinner animate-spin"></i> Mengupload...</p>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nama Produk</label>
                <input v-model="form.name" type="text" required placeholder="Contoh: Paket Hampers Lebaran"
                  class="w-full border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-bold text-gray-600 mb-1">Harga Beli (Modal)</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rp</span>
                    <input v-model="form.purchasePrice" type="number" required
                      class="w-full border-gray-200 rounded-xl pl-8 pr-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition font-mono">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-bold text-emerald-700 mb-1">Harga Jual</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rp</span>
                    <input v-model="form.price" type="number" required
                      class="w-full border-emerald-100 rounded-xl pl-8 pr-4 py-3 bg-emerald-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition font-bold text-gray-800 font-mono">
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Stok Awal</label>
                  <input v-model="form.stock" type="number" required
                    class="w-full border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition">
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
                  <select v-model="form.category" required
                    class="w-full border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition appearance-none">
                    <option value="" disabled>Pilih Kategori</option>
                    <option v-for="cat in categories" :key="cat._id" :value="cat.name">{{ cat.name }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="pt-6 mt-6 border-t flex justify-end gap-3">
              <button type="button" @click="closeModal"
                class="px-6 py-3 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition">Batal</button>
              <button type="submit" :disabled="uploading"
                class="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed">
                {{ form._id ? 'Simpan Perubahan' : 'Tambah Produk' }}
              </button>
            </div>
          </form>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import type { Product, Category } from '~/types';

definePageMeta({
  layout: 'default',
  middleware: 'auth'
});

const router = useRouter();

// Data Ref
const { data: products, refresh } = await useFetch<Product[]>('/api/products');
const { data: categories } = await useFetch<Category[]>('/api/categories');

const showModal = ref(false);
const uploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref('');

// Form Reactive
const form = reactive({
  _id: '',
  name: '',
  price: 0,
  purchasePrice: 0,
  stock: 0,
  category: '',
  image: ''
});

const openModal = () => {
  Object.assign(form, { _id: '', name: '', price: 0, purchasePrice: 0, stock: 0, category: '', image: '' });
  imageUrl.value = '';
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
}

const editProduct = (product: Product) => {
  Object.assign(form, product);
  imageUrl.value = product.image || '';
  showModal.value = true;
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  imageUrl.value = URL.createObjectURL(file);
  uploading.value = true;

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: formData });
    form.image = res.url;
  } catch (error) {
    alert('Gagal mengupload gambar');
    imageUrl.value = '';
    form.image = '';
  } finally {
    uploading.value = false;
  }
};

const submitProduct = async () => {
  try {
    if (form._id) {
      await $fetch(`/api/products/${form._id}`, { method: 'PUT', body: form });
    } else {
      await $fetch('/api/products', { method: 'POST', body: form });
    }
    showModal.value = false;
    refresh();
  } catch (error) {
    console.error(error);
    alert('Terjadi kesalahan saat menyimpan');
  }
};

const deleteProduct = async (id: string) => {
  if (!confirm('Hapus produk?')) return;
  await $fetch(`/api/products/${id}`, { method: 'DELETE' });
  refresh();
};
</script>