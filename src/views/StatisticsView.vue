<template>
  <div class="stats-page">
    <h1 class="page-title">Search Statistics</h1>

    <div class="stats-sections">

    </div>


  </div>
</template>

<script setup>

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
