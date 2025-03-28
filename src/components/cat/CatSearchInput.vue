<template>
  <div class="search-container" ref="searchContainer">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        @input="handleInput"
        @focus="showSuggestions = true"
        placeholder="Search for cat tags..."
        class="search-input"
        ref="searchInput"
      />
      <button @click="performSearch" class="search-button">
        <img src="../../assets/search-icon.svg" width="20px" height="20px" />
      </button>

      <div v-if="showSuggestions" class="autocomplete-dropdown">
        <ul>
          <li v-for="(tag, index) in filteredTags" :key="index" @click="selectTag(tag)">
            {{ tag.name }}
          </li>
          <li v-if="filteredTags.length === 0" class="no-results">No matching tags found</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCatsStore } from '@/stores/catsStore'

const catsStore = useCatsStore()
const searchQuery = ref('')
const showSuggestions = ref(false)
const searchInput = ref(null)
const searchContainer = ref(null)

onMounted(async () => {
  await catsStore.fetchAllTags()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const filteredTags = computed(() => {
  if (!searchQuery.value) return []
  return catsStore.allTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

function handleInput() {
  showSuggestions.value = searchQuery.value.length > 0
  catsStore.currentSearch = searchQuery.value
}

function handleClickOutside(event) {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    showSuggestions.value = false
  }
}

function selectTag(tag) {
  searchQuery.value = tag.name
  showSuggestions.value = false
  performSearch()
}

async function performSearch() {
  const query = searchQuery.value.trim()
  if (query) {
    await catsStore.searchCatsByTag(query)
  }
}
</script>
<style scoped>
.search-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #4caf50;
}

.search-button {
  padding: 0 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #3d8b40;
}

.search-button svg {
  vertical-align: middle;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  margin-top: 4px;
}

.autocomplete-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.autocomplete-dropdown li {
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.1s;
}

.autocomplete-dropdown li:hover,
.autocomplete-dropdown li.highlighted {
  background-color: #f5f5f5;
}

.autocomplete-dropdown li:last-child {
  border-radius: 0 0 8px 8px;
}
.no-results {
  color: #666;
  font-style: italic;
  cursor: default;
}

.no-results:hover {
  background-color: transparent !important;
}
</style>
