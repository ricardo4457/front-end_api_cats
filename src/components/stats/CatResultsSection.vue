<template>
  <div class="results-section">
    <div class="results-header">
      <h2>{{ title }}</h2>
      <button @click="emit('back')" class="back-button">← Back to statistics</button>
    </div>

    <div v-if="cats.length === 0" class="empty">No cats found for this selection</div>

    <div v-else class="cats-grid">
      <div v-for="(cat, index) in cats" :key="`${cat.id}-${index}`" class="cat-card">
        <img :src="cat.imageUrl" :alt="'Cat ' + cat.id" class="cat-image" />
        <div class="cat-tags" v-if="cat.tags && cat.tags.length">
          <span v-for="tag in cat.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cats: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['back'])
</script>

<style scoped>
.results-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.75rem;
}

.back-button {
  background: #f5f5f5;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background: #e0e0e0;
}

.cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.cat-card {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cat-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.cat-tags {
  padding: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #e0f7fa;
  color: #00838f;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.empty {
  padding: 2rem;
  text-align: center;
  color: #666;
}

@media (max-width: 768px) {
  .cats-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .cat-image {
    height: 150px;
  }
}
</style>
