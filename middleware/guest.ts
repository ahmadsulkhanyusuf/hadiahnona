export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token');

  // Jika token ada DAN user belum di halaman home
  if (token.value && to.path !== '/') {
    return navigateTo('/');
  }
});