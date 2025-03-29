<template>
   <div class="stats-card">
     <h2 class="stats-card-title">Top Categories</h2>
     <div v-if="statsStore.loading && !statsStore.topCategories.length" class="loading">Loading...</div>
     <div v-else-if="statsStore.error" class="error">{{ statsStore.error }}</div>
     <div v-else-if="!statsStore.topCategories.length" class="empty">No categories found</div>
     <ul v-else class="stats-list">
       <li 
         v-for="(category, index) in statsStore.topCategories" 
         :key="category.name || index"
         class="stats-item clickable"
         @click="emit('category-click', category.name)"
       >
         <span class="category">{{ category.name }}</span>
         <span class="count">{{ category.count }} cats</span>
       </li>
     </ul>
   </div>
 </template>
 
 <script setup>
 import { useStatsStore } from '@/stores/statsStore';
 
 const statsStore = useStatsStore();
 const emit = defineEmits(['category-click']);
 </script>
 
 <style scoped>

 .stats-card {
   background: white;
   border-radius: 8px;
   padding: 1.5rem;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 }
 
 .stats-card-title {
   font-size: 1.25rem;
   margin-bottom: 1rem;
   color: #333;
   border-bottom: 2px solid #f0f0f0;
   padding-bottom: 0.5rem;
 }
 
 .stats-list {
   list-style: none;
   padding: 0;
   margin: 0;
 }
 
 .stats-item {
   display: flex;
   justify-content: space-between;
   padding: 0.75rem 0;
   border-bottom: 1px solid #f5f5f5;
 }
 
 .stats-item:last-child {
   border-bottom: none;
 }
 
 .category {
   font-weight: 500;
 }
 
 .count {
   color: #666;
   font-size: 0.9rem;
 }
 
 .clickable {
   cursor: pointer;
   transition: background-color 0.2s;
 }
 
 .clickable:hover {
   background-color: #f9f9f9;
 }
 
 .loading,
 .error,
 .empty {
   padding: 1rem;
   text-align: center;
   color: #666;
 }
 
 .error {
   color: #e53935;
 }
 </style>