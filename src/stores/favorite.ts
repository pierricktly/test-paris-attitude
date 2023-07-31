import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//store useFavorite to store list of favorite
export const useFavoriteStore = defineStore('favorite', () => {
  const favorite = ref([] as Object[])
  
  // addFavorite add item to favorite list
  function addFavorite(item: Object) {
    favorite.value.push(item)
  }

  // removeFavorite remove item from favorite list
  function removeFavorite(id: number) {
    const index = favorite.value.findIndex((item: any) => item.id === id)
    favorite.value.splice(index, 1)
  }

  // isFavorite check if item id is in favorite list
  function isFavorite(id: number) {
    return computed(() => favorite.value.some((item: any) => item.id === id))
  }

  return { favorite, addFavorite, removeFavorite, isFavorite }
},{ persist: true })
