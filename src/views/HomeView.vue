<template>
  <div class="cat-search-app">
    <CatSearchInput />
  </div>
</template>

<script setup>
import CatSearchInput from '../components/CatSearchInput.vue'

import { useCatsStore } from '@/stores/catsStore'
</script>

<style>
.cat-search-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
