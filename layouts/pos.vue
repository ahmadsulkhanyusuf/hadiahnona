<template>
  <!-- Layout khusus Kasir: Tanpa Sidebar Desktop, tapi ada Mobile Nav -->
  <div class="relative h-screen bg-gray-100 w-full">
    <!-- showSidebar = false (Hanya menu mobile yang muncul) -->
    <TheNavigation :show-sidebar="false" />
    
    <main class="h-full pb-20 md:pb-0">
      <slot />
    </main>
  </div>
</template>