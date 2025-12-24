<!-- pages/index.vue -->
<template>
  <div class="font-sans text-text-dark">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <NuxtImg
        src="/logo.jpg"
        alt="Beautiful Bouquet"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <div class="relative z-10 text-center text-white px-6">
        <h1 class="font-serif text-5xl md:text-7xl font-bold mb-4">Hadiah Nona</h1>
        <p class="font-sans text-xl md:text-2xl font-light mb-8">Ciptakan Momen Indah dengan Sentuhan Bunga</p>
        <a
          href="https://wa.me/6281234567890?text=Halo%20Hadiah%20Nona,%20saya%20tertarik%20untuk%20pesan..."
          target="_blank"
          rel="noopener noreferrer"
          class="bg-accent-gold hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Pesan Sekarang via WhatsApp
        </a>
      </div>
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 px-6 bg-neutral-cream">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">Layanan Kami</h2>
        <p class="font-sans text-lg mb-12 text-gray-600">Dari buket bunga hingga dekorasi impian, kami wujudkan untuk Anda.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="text-4xl mb-4">💐</div>
            <h3 class="font-serif text-2xl font-semibold mb-2">Bunga Custom</h3>
            <p class="font-sans text-gray-600">Buket hand bouquet dan bunga papan yang dirangkai khusus sesuai dengan momen spesial Anda.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="text-4xl mb-4">🎁</div>
            <h3 class="font-serif text-2xl font-semibold mb-2">Hampers & Parcel</h3>
            <p class="font-sans text-gray-600">Pilihan hampers unik dan elegan untuk ulang tahun, baby shower, atau corporate gifts.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="text-4xl mb-4">💒</div>
            <h3 class="font-serif text-2xl font-semibold mb-2">Dekorasi Pernikahan & Acara</h3>
            <p class="font-sans text-gray-600">Transformasi ruangan menjadi magis dengan dekorasi bunga yang memukau untuk hari bahagia Anda.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-center mb-12">Portofolio Kami</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Ganti dengan foto-foto asli dari Instagram Hadiah Nona -->
          <NuxtImg v-for="i in 9" :key="i" :src="`https://picsum.photos/seed/hadiahnona${i}/400/500.jpg`" alt="Portfolio Image" class="w-full h-80 object-cover rounded-lg hover:opacity-90 transition-opacity duration-300" />
        </div>
        <div class="text-center mt-12">
          <a href="https://www.instagram.com/hadiahnona/" target="_blank" rel="noopener noreferrer" class="inline-block bg-pink-100 hover:bg-primary-pink text-text-dark font-semibold py-3 px-8 rounded-full transition duration-300">
            Lihat Lebih Banyak di Instagram
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 px-6 bg-neutral-cream">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-12">Apa Kata Mereka</h2>
        <div class="space-y-10">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <p class="font-sans text-lg italic mb-4">"Buket bunganya sangat cantik dan segar! Saya pesan untuk anniversary, pasangan saya sangat suka. Pelayanannya juga ramah dan fast response. Highly recommended!"</p>
            <p class="font-semibold">- Sarah K.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md">
            <p class="font-sans text-lg italic mb-4">"Dekorasi pernikahan kami dari Hadiah Nona sungguh di luar ekspektasi. Semua tamu memuji betapa indahnya. Terima kasih telah membuat hari kami sempurna."</p>
            <p class="font-semibold">- Rizky & Amanda</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">Siap Menciptakan Momen Indah?</h2>
        <p class="font-sans text-lg mb-8">Hubungi kami untuk konsultasi gratis dan penawaran terbaik.</p>
        <a
          href="https://wa.me/6281234567890?text=Halo%20Hadiah%20Nona,%20saya%20mau%20konsultasi..."
          target="_blank"
          rel="noopener noreferrer"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center"
        >
          <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Hubungi Kami di WhatsApp
        </a>
        <div class="mt-8 text-gray-600">
          <p>Ikuti kami juga di Instagram: <a href="https://www.instagram.com/hadiahnona/" target="_blank" class="font-semibold text-pink-500 hover:underline">@hadiahnona</a></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Menggunakan SEO Meta
useHead({
  title: 'Hadiah Nona - Custom Bouquet, Hampers & Wedding Decor',
  meta: [
    { name: 'description', content: 'Ciptakan momen indah dengan buket bunga custom, hampers unik, dan dekorasi pernikahan & acara dari Hadiah Nona.' }
  ],
})
</script>

<style scoped>
/* Tidak perlu custom style yang banyak, Tailwind sudah menangani semuanya */
</style>