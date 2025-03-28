<template>
  <div class="cat-search-app">
    <CatSearchInput />
    <CatResults />
  </div>
</template>

<script setup>
import CatSearchInput from '../components/cat/CatSearchInput.vue'
import CatResults from '../components/cat/CatResults.vue'
</script>

<style>
.cat-search-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
