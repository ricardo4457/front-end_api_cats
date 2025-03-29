<template>
  <div class="cat-search-app">
    <CatSearchInput @search="handleSearch" />
    <CatResults :search-term="currentSearch" @tag-selected="handleTagSelected" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CatSearchInput from '../components/cat/CatSearchInput.vue'
import CatResults from '../components/cat/CatResults.vue'

const currentSearch = ref('')

const handleSearch = (searchTerm) => {
  currentSearch.value = searchTerm
}

const handleTagSelected = (tag) => {
  currentSearch.value = tag
}
</script>

<style>
.cat-search-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
