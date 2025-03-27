import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useCatsStore = defineStore('catsStore', () => {
  const searchResults = ref([])
  const currentSearch = ref('')
  const suggestedTags = ref([])
  const allTags = ref([])

  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalResults = ref(0)

  const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value)) // Check who may pages are required

  const fetchAllTags = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tags')
      allTags.value = response.data
    } catch (err) {
      console.error('Error fetching tags:', err)
      allTags.value = []
    }
  }

  const searchTagsBySubstr = async (search) => {
    currentSearch.value = search
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cats/match?string=${search}`)
      suggestedTags.value = response.data.matchedTags
      return response.data.matchedTags
    } catch (err) {
      console.error('Error searching tags:', err)
      suggestedTags.value = []
      return []
    }
  }

  const searchCatsByTag = async (tag, page = 1) => {
    currentPage.value = page
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cats/filter`, {
        params: {
          tag: tag,
          omit: (page - 1) * itemsPerPage.value,
          total: itemsPerPage.value,
        },
      })

      searchResults.value = response.data.cats || response.data
      totalResults.value = response.data.totalCount || response.data.length || 0

      extractSuggestedTagsFromResults()
    } catch (err) {
      console.error('Error searching cats:', err)
      searchResults.value = []
      totalResults.value = 0
      suggestedTags.value = []
    }
  }

  const extractSuggestedTagsFromResults = () => {
    const tagMap = {}
    searchResults.value.forEach((cat) => {
      const tags = cat.tags || []
      tags.forEach((tag) => {
        if (tag !== currentSearch.value) {
          tagMap[tag] = (tagMap[tag] || 0) + 1
        }
      })
    })

    suggestedTags.value = Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => ({ name }))
  }

  return {
    // State
    searchResults,
    currentSearch,
    suggestedTags,
    allTags,
    currentPage,
    itemsPerPage,
    totalResults,

    // Computed
    totalPages,

    // Actions
    fetchAllTags,
    searchTagsBySubstr,
    searchCatsByTag,
  }
})
