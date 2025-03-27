import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCatsStore = defineStore('catsStore', () => {
  // State
  const searchResults = ref([])
  const currentSearch = ref('')
  const suggestedTags = ref([])
  const allTags = ref([])

  // Actions
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

  const searchCatsByTag = async (tag) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cats/filter`, {
        params: {
          tag: tag,
          omit: 0,
          total: 10,
        },
      })
      searchResults.value = response.data 

    } catch (err) {
      console.error('Error searching cats:', err)
      searchResults.value = [] 
    }
  }

  return {
    // State
    searchResults,
    currentSearch,
    suggestedTags,
    allTags,

    // Actions
    fetchAllTags,
    searchTagsBySubstr,
    searchCatsByTag,
  }
})
