<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <nav class="app-nav">
      <RouterLink to="/" class="nav-link" active-class="active"> Home </RouterLink>
      <RouterLink to="/statistics" class="nav-link" active-class="active"> Statistics </RouterLink>
    </nav>
  </header>

  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  background-color: #f8f9fa;
  padding: 15px 0;
  margin-bottom: 30px;
  border-bottom: 1px solid #dee2e6;
}

.app-nav {
  display: flex;
  gap: 20px;
  padding: 0 20px;
}

.nav-link {
  color: #495057;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #0d6efd;
  background-color: #e9ecef;
}

.nav-link.active {
  color: #0d6efd;
  font-weight: 500;
}

.app-main {
  padding: 0 20px;
}
</style>
