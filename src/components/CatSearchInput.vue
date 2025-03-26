<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        @input="filterTagsbySearch"
        placeholder="Search for cat tags..."
        class="search-input"
      />
      <button @click="" class="search-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <div class="autocomplete-dropdown">
        <ul v-for="tag in filteredTags">
          <li>{{ tag.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useCatsStore } from '@/stores/catsStore'

const catsStore = useCatsStore()
const searchQuery = ref('')

onMounted(async () => {
  console.log('Starting to fetch tags...') // Debug log
  await catsStore.fetchAllTags()
  console.log('Tags in component:', catsStore.allTags) // Debug log
})

const filteredTags = computed(() => {
  const query = searchQuery.value
  return catsStore.allTags.filter((tag) => tag.name && tag.name.includes(query))
})

function filterTagsbySearch(searchQuery) {
  catsStore.searchTagsBySubstr(searchQuery.value)
}

// Verify reactivity
watch(
  () => catsStore.allTags,
  (newTags) => {
    console.log('Tags updated:', newTags)
  },
  { immediate: true },
)
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
</style>
