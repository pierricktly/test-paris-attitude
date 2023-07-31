<script setup lang="ts">
import { ref } from 'vue'
import { useFavoriteStore } from '@/stores/favorite';
import PropertyCard from '@/components/PropertyCard.vue'

const store = useFavoriteStore()

const favorites = ref(store.favorite)
</script>

<template>
  <main v-if="favorites" class="container mx-auto p-5 space-y-5">
    <TransitionGroup name="list" tag="div"
      class="transition-all ease-in-out duration-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <PropertyCard 
        v-for="data in favorites" 
        :key="data.id"
        :id="data.id" 
        :type="data.type" 
        :zipCode="data.zipCode"
        :price="data.price" 
        :available="data.available" 
        :dateAvailable="data.dateAvailable"
      />
    </TransitionGroup>
    <p v-if="favorites.length < 1">
      No favorite, you can add favorite by clicking the heart icon on <a href="/" class="text-red-500 font-semibold">Home page</a>
    </p>
  </main>
</template>
