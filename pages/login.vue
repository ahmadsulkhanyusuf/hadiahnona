<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-50 font-sans relative overflow-hidden">

    <!-- Background Decoration -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3">
    </div>
    <div
      class="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200 rounded-full blur-[100px] opacity-30 translate-y-1/3 -translate-x-1/4">
    </div>

    <div
      class="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-md border border-white/50 relative z-10 transition-all duration-500 hover:shadow-[0_25px_70px_-10px_rgba(16,185,129,0.15)]">

      <!-- Logo / Header -->
      <div class="text-center mb-10">
        <div
          class="w-20 h-20 bg-emerald-100/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner text-emerald-600">
          <i class="fa-solid fa-store text-3xl"></i>
        </div>
        <h1 class="text-3xl font-serif font-bold text-gray-800 tracking-tight mb-2">Selamat Datang</h1>
        <p class="text-gray-500 text-sm">Masuk untuk mengelola Hadiah Nona POS system</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Username</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="fa-solid fa-user text-gray-400 group-focus-within:text-emerald-500 transition-colors"></i>
            </div>
            <input v-model="username" type="text"
              class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all duration-300 placeholder:text-gray-300 text-gray-800 font-medium shadow-sm"
              placeholder="Masukkan username anda" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Password</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="fa-solid fa-lock text-gray-400 group-focus-within:text-emerald-500 transition-colors"></i>
            </div>
            <input v-model="password" :type="showPassword ? 'text' : 'password'"
              class="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all duration-300 placeholder:text-gray-300 text-gray-800 font-medium shadow-sm"
              placeholder="••••••••" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer outline-none">
              <i class="fa-solid" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </button>
          </div>
          <div class="flex justify-end pt-1">
            <a href="#"
              class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition">Lupa
              password?</a>
          </div>
        </div>

        <button type="submit" :disabled="isLoading"
          class="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300 flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
          <span v-if="isLoading"
            class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span v-else>Masuk ke Aplikasi</span>
          <i v-if="!isLoading"
            class="fa-solid fa-arrow-right text-sm opacity-50 group-hover:translate-x-1 transition-transform"></i>
        </button>
      </form>

      <div class="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-4 text-center">
        <p class="text-xs text-gray-400">© 2024 Hadiah Nona. All rights reserved.</p>
        <NuxtLink to="/"
          class="text-sm font-bold text-gray-500 hover:text-emerald-600 transition flex items-center gap-2">
          <i class="fa-solid fa-house text-xs"></i> Kembali ke Beranda
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
});

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const authToken = useCookie('auth_token');

const handleLogin = async () => {
  if (!username.value || !password.value) return;

  isLoading.value = true;
  try {
    const data: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
      // Add fake delay for better UX
      onResponse: async () => await new Promise(r => setTimeout(r, 800))
    });

    if (data && data.token) {
      authToken.value = data.token;
      await navigateTo('/kasir/');
    }
  } catch (e: any) {
    // Custom error handling UI could be added here (e.g., toast)
    // For now we use a simple shake animation logic or alert
    alert(e.data?.message || 'Login gagal. Periksa username dan password Anda.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (authToken.value) {
    await navigateTo('/kasir/');
  }
});
</script>

<style scoped>
/* Optional: could add custom keyframes if not using tailwind-animate */
</style>