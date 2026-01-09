<template>
  <div class="font-sans text-gray-800 bg-white">

    <!-- NAVIGATION -->
    <nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" class="font-serif text-2xl font-bold text-emerald-800 flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" class="w-8 h-8 rounded-full object-cover">
          Hadiah Nona
        </a>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#about" class="hover:text-emerald-600 transition">Tentang Kami</a>
          <a href="#services" class="hover:text-emerald-600 transition">Layanan</a>
          <a href="#portfolio" class="hover:text-emerald-600 transition">Galeri</a>
          <a href="#contact" class="hover:text-emerald-600 transition">Kontak</a>
        </div>

      </div>
    </nav>

    <!-- HERO SECTION -->
    <header class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image with Parallax Effect (Simulated) -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1920&auto=format&fit=crop"
          class="w-full h-full object-cover" alt="Flower Bouquet">
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto" data-aos="fade-up">
        <span
          class="inline-block py-1 px-3 border border-white/30 rounded-full text-white/80 text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">Est.
          2024</span>
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Merangkai <br class="hidden md:block" /> <span class="text-emerald-300 italic">Kenangan</span> Manis
        </h1>
        <p class="text-lg md:text-xl text-gray-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
          Kami menghadirkan keindahan melalui rangkaian bunga segar, hampers eksklusif, dan dekorasi penuh makna untuk
          setiap momen spesial Anda.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/6281234567890" target="_blank"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold transition transform hover:-translate-y-1 shadow-xl hover:shadow-emerald-500/30">
            Pesan Sekarang
          </a>
          <a href="#portfolio"
            class="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition">
            Lihat Karya Kami
          </a>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <i class="fa-solid fa-chevron-down text-2xl opacity-70"></i>
      </div>
    </header>

    <!-- STORY SECTION -->
    <section id="about" class="py-24 px-6 bg-white overflow-hidden">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-16">
          <div class="w-full md:w-1/2 relative">
            <div
              class="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition duration-500">
              <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop"
                class="w-full h-auto" alt="Florist at work">
            </div>
            <div class="absolute -bottom-10 -left-10 w-full h-full border-2 border-emerald-100 rounded-[3rem] -z-0">
            </div>
            <div class="absolute top-10 -right-10 w-24 h-24 bg-emerald-50 rounded-full blur-2xl -z-0"></div>
          </div>
          <div class="w-full md:w-1/2">
            <span class="text-emerald-600 font-bold tracking-widest text-sm uppercase">Tentang Kami</span>
            <h2 class="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">Lebih Dari Sekadar Bunga</h2>
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Berawal dari kecintaan pada estetika dan ketulusan dalam memberi, <strong>Hadiah Nona</strong> hadir
                sebagai jembatan perasaan Anda. Kami percaya bahwa setiap kelopak bunga dan setiap pita simpul memiliki
                ceritanya sendiri.
              </p>
              <p>
                Kami tidak hanya menjual produk, tetapi kami membantu Anda menyampaikan pesan cinta, terima kasih, dan
                perayaan yang tak terucapkan. Dengan sentuhan personal dan material terbaik, kami pastikan hadiah Anda
                berkesan.
              </p>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-100 flex gap-8">
              <div>
                <span class="block text-3xl font-bold text-emerald-800">500+</span>
                <span class="text-sm text-gray-500 uppercase tracking-wide">Customer Bahagia</span>
              </div>
              <div>
                <span class="block text-3xl font-bold text-emerald-800">1.2k</span>
                <span class="text-sm text-gray-500 uppercase tracking-wide">Pesanan Selesai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES SECTION -->
    <section id="services" class="py-24 px-6 bg-stone-50">
      <div class="max-w-7xl mx-auto text-center mb-16">
        <span class="text-emerald-600 font-bold tracking-widest text-sm uppercase">Layanan Kami</span>
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2">Kreasikan Momen Spesial Anda</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <!-- Service 1 -->
        <div
          class="group bg-white p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] transition duration-300 relative overflow-hidden text-center md:text-left">
          <div
            class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition transform group-hover:scale-110">
            <i class="fa-solid fa-fan text-8xl text-emerald-900"></i>
          </div>
          <div
            class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl mb-6 mx-auto md:mx-0 group-hover:scale-110 transition">
            <i class="fa-solid fa-bouquet"></i>
          </div>
          <h3 class="font-serif text-2xl font-bold text-gray-800 mb-3">Bloom Box & Buket</h3>
          <p class="text-gray-600 leading-relaxed mb-6">Rangkaian bunga segar atau artificial yang dirancang elegan
            untuk ulang tahun, wisuda, atau sekadar ungkapan sayang.</p>
          <a href="#"
            class="text-emerald-600 font-bold text-sm uppercase tracking-wide border-b border-transparent hover:border-emerald-600 transition">Lihat
            Katalog</a>
        </div>

        <!-- Service 2 -->
        <div
          class="group bg-white p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] transition duration-300 relative overflow-hidden text-center md:text-left">
          <div
            class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition transform group-hover:scale-110">
            <i class="fa-solid fa-gift text-8xl text-purple-900"></i>
          </div>
          <div
            class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 text-2xl mb-6 mx-auto md:mx-0 group-hover:scale-110 transition">
            <i class="fa-solid fa-gift"></i>
          </div>
          <h3 class="font-serif text-2xl font-bold text-gray-800 mb-3">Premium Hampers</h3>
          <p class="text-gray-600 leading-relaxed mb-6">Bingkisan kurasi eksklusif untuk perayaan hari raya, corporate
            gift, atau baby newborn dengan packaging premium.</p>
          <a href="#"
            class="text-purple-600 font-bold text-sm uppercase tracking-wide border-b border-transparent hover:border-purple-600 transition">Lihat
            Pilihan</a>
        </div>

        <!-- Service 3 -->
        <div
          class="group bg-white p-10 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] transition duration-300 relative overflow-hidden text-center md:text-left">
          <div
            class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition transform group-hover:scale-110">
            <i class="fa-solid fa-ring text-8xl text-pink-900"></i>
          </div>
          <div
            class="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 text-2xl mb-6 mx-auto md:mx-0 group-hover:scale-110 transition">
            <i class="fa-solid fa-heart"></i>
          </div>
          <h3 class="font-serif text-2xl font-bold text-gray-800 mb-3">Wedding Decor</h3>
          <p class="text-gray-600 leading-relaxed mb-6">Dekorasi aesthetic untuk intimate wedding, engagement, atau
            photo booth corner yang instagramable.</p>
          <a href="#"
            class="text-pink-600 font-bold text-sm uppercase tracking-wide border-b border-transparent hover:border-pink-600 transition">Konsultasi
            Gratis</a>
        </div>
      </div>
    </section>

    <!-- PORTFOLIO SECTION -->
    <section id="portfolio" class="py-24 px-0 bg-white">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end mb-12">
        <div class="text-center md:text-left">
          <span class="text-emerald-600 font-bold tracking-widest text-sm uppercase">Portofolio</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2">Karya Terbaru Kami</h2>
        </div>
        <a href="https://instagram.com/hadiahnona" target="_blank"
          class="hidden md:flex items-center gap-2 text-gray-800 hover:text-emerald-600 font-bold transition">
          Lihat Instagram <i class="fa-brands fa-instagram"></i>
        </a>
      </div>

      <!-- Scrolling Gallery -->
      <div class="flex overflow-x-auto pb-8 gap-4 px-6 md:px-0 scrollbar-hide snap-x">
        <div class="shrink-0 w-80 md:w-96 snap-center group relative rounded-2xl overflow-hidden cursor-pointer"
          v-for="i in 5" :key="i">
          <img :src="`https://picsum.photos/seed/flower${i + 10}/400/600`"
            class="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-100" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-8">
            <span class="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">Collection 2024</span>
            <h3 class="text-white font-serif text-2xl">Elegant Rose Series</h3>
          </div>
        </div>
      </div>

      <div class="text-center mt-8 md:hidden">
        <a href="https://instagram.com/hadiahnona" target="_blank" class="text-emerald-600 font-bold">Lihat Lebih Banyak
          di Instagram</a>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section id="testimonials" class="py-24 px-6 bg-emerald-900 text-white relative overflow-hidden">
      <!-- Decoration Elements -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400 rounded-full blur-[120px] opacity-20"></div>

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <i class="fa-solid fa-quote-left text-6xl text-emerald-700 mb-8 opacity-50"></i>
        <h2 class="font-serif text-3xl md:text-5xl font-bold mb-12 leading-snug">
          "Hasilnya sangat memuaskan! Bunganya segar, wrapping-nya rapi dan mewah. Pasangan saya suka sekali hadiah
          anniversary-nya."
        </h2>
        <div class="flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/women/44.jpg"
            class="w-16 h-16 rounded-full border-2 border-emerald-500 mb-4" alt="User desc">
          <h4 class="font-bold text-xl">Amanda Pratiwi</h4>
          <div class="flex text-yellow-400 text-sm gap-1 mt-1">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
              class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer id="contact" class="bg-gray-900 text-gray-400 pt-20 pb-10 px-6 font-sans">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-1">
          <div class="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <div class="w-8 h-8 bg-emerald-600 rounded-full"></div> Hadiah Nona
          </div>
          <p class="leading-relaxed mb-6">
            Menghadirkan kehangatan dan keindahan dalam setiap momen spesial Anda melalui karya tangan penuh cinta.
          </p>
          <div class="flex gap-4">
            <a href="#"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"><i
                class="fa-brands fa-instagram"></i></a>
            <a href="#"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"><i
                class="fa-brands fa-whatsapp"></i></a>
            <a href="#"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition"><i
                class="fa-brands fa-tiktok"></i></a>
          </div>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 text-lg uppercase tracking-wider">Layanan</h4>
          <ul class="space-y-4">
            <li><a href="#" class="hover:text-emerald-500 transition">Flower Bouquet</a></li>
            <li><a href="#" class="hover:text-emerald-500 transition">Custom Hampers</a></li>
            <li><a href="#" class="hover:text-emerald-500 transition">Wedding Decoration</a></li>
            <li><a href="#" class="hover:text-emerald-500 transition">Corporate Gifts</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 text-lg uppercase tracking-wider">Informasi</h4>
          <ul class="space-y-4">
            <li><a href="#" class="hover:text-emerald-500 transition">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-emerald-500 transition">Cara Pemesanan</a></li>
            <li><a href="#" class="hover:text-emerald-500 transition">FAQ</a></li>
            <li><a href="#" class="hover:text-emerald-500 transition">Kontak</a></li>
            <li>
              <NuxtLink to="/login" class="hover:text-emerald-500 transition">Login Staff</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 text-lg uppercase tracking-wider">Hubungi Kami</h4>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <i class="fa-solid fa-location-dot mt-1 text-emerald-600"></i>
              <span>Jl. Bunga Mawar No. 123, Kemang, Jakarta Selatan</span>
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-phone text-emerald-600"></i>
              <span>+62 812 3456 7890</span>
            </li>
            <li class="flex items-center gap-3">
              <i class="fa-solid fa-envelope text-emerald-600"></i>
              <span>hello@hadiahnona.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 text-center text-sm">
        <p>&copy; 2024 Hadiah Nona. All rights reserved.</p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
// Page Meta
definePageMeta({
  layout: false // Custom layout (no wrapper needed)
});

useHead({
  title: 'Hadiah Nona - Premium Florist & Gifting Studio',
  meta: [
    { name: 'description', content: 'Studio florist dan gifting premium di Jakarta. Menyediakan buket bunga custom, hampers eksklusif, dan dekorasi pernikahan.' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
  ]
})
</script>

<style scoped>
/* Custom Utilities if needed */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>