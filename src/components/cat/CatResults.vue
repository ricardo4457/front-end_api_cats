<template>
  <div class="results-section">
    <div v-if="suggestedTags.length > 0" class="suggested-searches">
      <h3>You might also like:</h3>
      <div class="tags-container">
        <button
          v-for="tag in suggestedTags"
          :key="tag.name"
          @click="searchTag(tag.name)"
          class="tag-button"
        >
          {{ tag.name }}
        </button>
      </div>
    </div>

    <div v-if="searchResults.length > 0" class="results-table">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in searchResults" :key="cat.id">
            <td>
              <img :src="cat.imageUrl" :alt="'Cat ' + cat.id" class="cat-image" />
            </td>
            <td>
              <div class="cat-tags">
                <span v-for="(tag, index) in cat.tags" :key="index" class="tag">
                  {{ tag }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">
          Previous
        </button>
        <span class="page-info"> Page {{ currentPage }} of {{ totalPages }} </span>
        <button @click="nextPage" :disabled="currentPage >= totalPages" class="pagination-button">
          Next
        </button>
      </div>
    </div>

    <div v-else-if="currentSearch" class="no-results">No cats found for "{{ currentSearch }}"</div>
  </div>
</template>

<script setup>
import { useCatsStore } from '@/stores/catsStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const catsStore = useCatsStore()

const { searchResults, suggestedTags, currentSearch, currentPage, totalResults, itemsPerPage } =
  storeToRefs(catsStore)

const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value))

const searchTag = (tag) => {
  catsStore.currentSearch = tag
  catsStore.searchCatsByTag(tag, 1)
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    catsStore.searchCatsByTag(currentSearch.value, currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    catsStore.searchCatsByTag(currentSearch.value, currentPage.value - 1)
  }
}
</script>

<style scoped>
.results-section {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.suggested-searches {
  margin-bottom: 1.5rem;
}

.suggested-searches h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-button {
  padding: 0.5rem 1rem;
  background: #e9ecef;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.tag-button:hover {
  background: #dee2e6;
}

.results-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.cat-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 4px;
}

.cat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: #f1f3f5;
  border-radius: 4px;
  font-size: 0.8rem;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.page-info {
  color: #666;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>
