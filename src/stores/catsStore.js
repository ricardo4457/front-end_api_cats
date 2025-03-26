import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCatsStore = defineStore('catsStore', () => {
  const searchResults = ref([])
  const currentSearch = ref('')
  const suggestedTags = ref([])
  const allTags = ref([])

  const fetchAllTags = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/tags')
      allTags.value = response.data
    } catch (err) {
      console.error(err)
    }
  }

  const searchTagsBySubstr = async (search) => {
    currentSearch.value = search

    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cats/match?string=${search}`)
      searchResults.value = response.data.tags.flatMap((tag) => tag)
    } catch (err) {
      console.error(err)
    }
  }

  const searchCatsByTag = async (tag) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cats/filter`, {
        params: {
          tag: tag,
          omit: 0, // Default value
          total: 10, // Default value
        },
      })
      searchResults.value = response.data
    } catch (err) {
      console.error(err)
    }
  }

  return {
    searchTagsBySubstr,
    currentSearch,
    suggestedTags,
    allTags,
    fetchAllTags,
    searchCatsByTag,
  }
})
