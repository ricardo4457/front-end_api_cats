import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useStatsStore = defineStore('StatsStore', () => {
  const topQueries = ref([])
  const topCategories = ref([])
  const categoryCats = ref([])
  const currentCategory = ref('')
  const loading = ref(false)
  const error = ref(null)

  const fetchTopQueries = async () => {
    try {
      loading.value = true
      const response = await axios.get('http://192.168.1.72:3000/api/v1/stats/top-queries')
      topQueries.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchTopCategories = async () => {
    try {
      loading.value = true
      const response = await axios.get('http://192.168.1.72:3000/api/v1/stats/top-categories')
      topCategories.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchCatsByCategory = async (tag) => {
    try {
      loading.value = true
      currentCategory.value = tag
      const response = await axios.get(
        `http://192.168.1.72:3000/api/v1/stats/category/${encodeURIComponent(tag)}`,
      )
      categoryCats.value = response.data.cats
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    //State
    topQueries,
    topCategories,
    categoryCats,
    currentCategory,
    loading,
    error,

    // Actions
    fetchTopQueries,
    fetchTopCategories,
    fetchCatsByCategory,
  }
})
