<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- Sidebar Desktop + Bottom Bar Mobile -->
    <!-- showSidebar = true untuk menampilkan sidebar kiri -->
    <TheNavigation :show-sidebar="true" />
    
    <!-- Konten Utama (Dengan margin kiri di desktop) -->
    <main class="flex-1 md:ml-64 overflow-y-auto h-full relative pb-20 md:pb-0 p-4 md:p-8">
      <slot />
    </main>
  </div>
</template>