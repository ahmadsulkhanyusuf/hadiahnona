export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token');

  // Jika token tidak ada DAN user belum di halaman login
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});