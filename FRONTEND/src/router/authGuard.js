export function createAuthGuard() {
  return (to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (to.meta.requiresAuth && !isAuthenticated) {
      return next('/login');
    }

    next();
  };
}