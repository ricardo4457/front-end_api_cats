<template>
  <div class="stats-page">
    <h1 class="page-title">Search Statistics</h1>

    <div class="stats-sections">
      <TopQueriesSection @query-click="handleQueryClick" />
      <TopCategoriesSection @category-click="handleCategoryClick" />
    </div>

    <CatResultsSection
      v-if="showResults"
      :cats="displayedCats"
      :title="resultsTitle"
      @back="clearResults"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStatsStore } from '@/stores/statsStore'
import TopQueriesSection from '@/components/stats/TopQueriesSection.vue'
import TopCategoriesSection from '@/components/stats/TopCategoriesSection.vue'
import CatResultsSection from '@/components/stats/CatResultsSection.vue'

const statsStore = useStatsStore()
const showResults = ref(false)
const displayedCats = ref([])
const resultsTitle = ref('')

onMounted(() => {
  statsStore.fetchTopQueries()
  statsStore.fetchTopCategories()
})

const handleQueryClick = async (query) => {
  try {
    await statsStore.fetchCatsByCategory(query)
    displayedCats.value = statsStore.categoryCats
    resultsTitle.value = `Cats found for query: "${query}"`
    showResults.value = true
  } catch (error) {
    console.error('Error fetching cats for query:', error)
  }
}

const handleCategoryClick = async (category) => {
  try {
    await statsStore.fetchCatsByCategory(category)
    displayedCats.value = statsStore.categoryCats
    resultsTitle.value = `Cats in category: "${category}"`
    showResults.value = true
  } catch (error) {
    console.error('Error fetching cats for category:', error)
  }
}

const clearResults = () => {
  showResults.value = false
  displayedCats.value = []
}
</script>

<style scoped>
.stats-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #4caf50;
  border-radius: 3px;
}

.stats-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .stats-page {
    padding: 1.5rem 1rem;
  }

  .stats-sections {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
</style>
