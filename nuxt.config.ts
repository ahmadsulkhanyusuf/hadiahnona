// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon'
  ],

  runtimeConfig: {
    // Secret key untuk JWT (Biasanya di .env, di sini hardcode untuk demo)
    jwtSecret: 'rahasia_super_aman_ubah_di_production',
    mongoUri: 'mongodb://localhost:27017/hadiah-nona' // Ganti dengan MongoDB Atlas URL jika online
  },

  app: {
    head: {
      title: 'HADIAH NONA - Hampers Nostalgia ala Nona',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'HADIAH NONA, hadiah nostalgia ala Nona. Ciptakan kembali kenangan manis dengan hampers dan bunga penuh kasih.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.jpg' },
        // Ganti Font dengan tema retro
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Nunito:wght@300;400;600;700&display=swap'
        },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  },

  // Perbarui konfigurasi warna dan font
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'primary-red': '#E53935',      // Merah dari teks utama
            'secondary-blue': '#1E88E5',   // Biru dari teks secondary
            'accent-yellow': '#FFD600',    // Kuning dari aksen
            'neutral-cream': '#FFF8E1',    // Warna krem/background
            'text-dark': '#4E342E'        // Cokelat tua untuk teks (lebih hangat)
          },
          fontFamily: {
            'script': ['Dancing Script', 'cursive'], // Font untuk judul utama
            'sans': ['Nunito', 'sans-serif']        // Font untuk teks lainnya
          }
        }
      }
    }
  }
})