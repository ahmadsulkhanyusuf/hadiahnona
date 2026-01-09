<template>
  <div class="nav-container">
    
    <!-- 1. DESKTOP SIDEBAR (Hanya muncul jika showSidebar = true) -->
    <aside v-if="showSidebar" class="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:h-screen md:fixed md:left-0 md:top-0 z-20 shadow-sm">
      <div class="p-6 flex items-center gap-2 border-b">
        <i class="fa-solid fa-store text-3xl text-emerald-600"></i>
        <h1 class="text-xl font-bold text-gray-800">Nuxt POS</h1>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <!-- Link Kasir -->
        <NuxtLink to="/" class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-emerald-50 text-gray-600 hover:text-emerald-600" :class="isActive('/') ? 'bg-emerald-50 text-emerald-600' : ''">
          <i class="fa-solid fa-cash-register text-xl"></i>
          <span>Kasir</span>
        </NuxtLink>
        <!-- Link Stok -->
        <NuxtLink to="/inventory" class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-emerald-50 text-gray-600 hover:text-emerald-600" :class="isActive('/inventory') ? 'bg-emerald-50 text-emerald-600' : ''">
          <i class="fa-solid fa-box text-xl"></i>
          <span>Manajemen Stok</span>
        </NuxtLink>
        <!-- Link Laporan -->
        <NuxtLink to="/reports" class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-emerald-50 text-gray-600 hover:text-emerald-600" :class="isActive('/reports') ? 'bg-emerald-50 text-emerald-600' : ''">
          <i class="fa-solid fa-chart-line text-xl"></i>
          <span>Laporan Penjualan</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t bg-gray-50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">A</div>
          <div>
            <div class="text-sm font-bold">Admin Toko</div>
            <div class="text-xs text-gray-500">admin@nuxt-pos.com</div>
          </div>
        </div>
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-500 py-2 rounded-lg hover:bg-red-50 transition">
          <i class="fa-solid fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </aside>

    <!-- 2. MOBILE BOTTOM BAR (Muncul di semua halaman) -->
    <nav class="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-2 z-50 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <NuxtLink to="/kasir" class="flex flex-col items-center py-2 px-4 rounded-lg w-full" :class="isActive('/kasir') ? 'text-emerald-600' : 'text-gray-400'">
        <i class="fa-solid fa-cash-register text-2xl mb-0.5"></i>
        <span class="text-[10px] font-medium">Kasir</span>
      </NuxtLink>
      
      <NuxtLink to="/kasir/inventory" class="flex flex-col items-center py-2 px-4 rounded-lg w-full" :class="isActive('/kasir/inventory') ? 'text-emerald-600' : 'text-gray-400'">
        <i class="fa-solid fa-box text-2xl mb-0.5"></i>
        <span class="text-[10px] font-medium">Stok</span>
      </NuxtLink>
      
      <NuxtLink to="/kasir/reports" class="flex flex-col items-center py-2 px-4 rounded-lg w-full" :class="isActive('/kasir/reports') ? 'text-emerald-600' : 'text-gray-400'">
        <i class="fa-solid fa-chart-bar text-2xl mb-0.5"></i>
        <span class="text-[10px] font-medium">Laporan</span>
      </NuxtLink>
      
      <button @click="handleLogout" class="flex flex-col items-center py-2 px-4 rounded-lg w-full text-gray-400 hover:text-red-500">
        <i class="fa-solid fa-sign-out-alt text-2xl mb-0.5"></i>
        <span class="text-[10px] font-medium">Keluar</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

defineProps<{
  showSidebar?: boolean
}>();

// Cek aktif untuk styling
const isActive = (path: string) => route.path === path;

const handleLogout = () => {
  if (confirm('Yakin ingin keluar?')) {
    const token = useCookie('auth_token');
    token.value = null;
    router.push('/login');
  }
};
</script>