<!-- src/App.vue -->
<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
// RouterView handles all routing (login, dashboard, etc.)
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: #f9fafb;
}

/* Import Inter font (optional but recommended) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Scrollbar (for modern browsers) */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #0f766e;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #0d5f59;
}
</style>