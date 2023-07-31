<script setup lang="ts">
import HeartFilled from '@/components/icons/HeartFilled.vue'
import HeartOutline from '@/components/icons/HeartOutline.vue'
import { useFavoriteStore } from '@/stores/favorite';
import { useToast } from "vue-toastification";
import { computed } from 'vue';
// props declaration
const { id, type, zipCode, price, available, dateAvailable } = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  dateAvailable: {
    type: String,
    required: false,
  }
})

const main = useFavoriteStore()
const isFavorite = computed(() => main.isFavorite(id)).value
const toast = useToast()

const toggleFavorite = () => {
  if (isFavorite.value) {
    main.removeFavorite(id)
    toast.error('Favorite removed')
  } else {
    main.addFavorite({
      id,
      type,
      zipCode,
      price,
      available,
      dateAvailable,
    })
    toast.success('Favorite added')
  }
}
</script>

<template>
  <div class="bg-zinc-300 p-3 rounded space-y-3 relative">
    <div class="flex justify-between">
      <p>{{ type }}</p>
      <div class="flex items-center space-x-2">
        <p class="font-semibold">{{ price }}€</p>
        <button @click="toggleFavorite()" class="flex space-x-1">
          <HeartFilled v-if="isFavorite" class="w-5 h-5 text-red-500" />
          <HeartOutline v-else class="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
    <div class="flex items-end justify-between">
      <p>
        {{ zipCode }}
      </p>
      <div>
        <p v-if="dateAvailable">
          Disponible à partir du {{ dateAvailable }}
        </p>
        <div v-else>
          <p class="bg-green-500 text-xs uppercase font-semibold rounded px-2 py-0.5">
            Disponible
          </p>
        </div>
      </div>
    </div>
  </div>
</template>