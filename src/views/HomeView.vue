<script setup lang="ts">
import { computed, ref } from 'vue'
import PropertyCard from '@/components/PropertyCard.vue'
import { useToast } from "vue-toastification";

const toast = useToast()

const data = ref(null)
const typeFilter = ref('')
const zipCodeFilter = ref('')
const availableFilter = ref(false)
const priceRangeFilter = ref('')

fetch('dataTestTechnique.json')
  .then(res => res.json())
  .then(res => data.value = res)
  .catch(err => console.log(err))
  
const dataFiltered = computed(() => {
  let dataFiltered = data.value

  if (!dataFiltered) return dataFiltered
  
  // @ts-ignore
  return dataFiltered?.filter((item) => {
    return (!typeFilter.value || item.type === typeFilter.value) &&
      (!zipCodeFilter.value || item.zipCode === zipCodeFilter.value) &&
      (!availableFilter.value || item.available) &&
      (!priceRangeFilter.value || item.price >= priceRangeFilter.value[0] && item.price <= priceRangeFilter.value[1])
  })
})

const typeList = computed(() => { 
  const typeList: String[] = []

  if (!data.value) return typeList
  // @ts-ignore
  data.value.forEach((item: { type: String; }) => {
    if (!typeList.includes(item.type)) {
      typeList.push(item.type)
    }
  })
  return typeList
})

const zipCodeList = computed(() => {
  const zipCodeList: String[] = []

  if (!data.value) return zipCodeList
  // @ts-ignore
  data.value.forEach((item: { zipCode: String; }) => {
    if (!zipCodeList.includes(item.zipCode)) {
      zipCodeList.push(item.zipCode)
    }
  })
  return zipCodeList
})

const priceRangeList = computed(() => {
  const priceRangeList: number[][] = []

  if(!data.value) return priceRangeList

  const priceMin = Math.min(...data.value?.map((item: { price: number; }) => item.price))
  const priceMax = Math.max(...data.value?.map((item: { price: number; }) => item.price))
  const priceRange = priceMax - priceMin
  const priceRangeStep = 1000
  const priceRangeStepCount = Math.ceil(priceRange / priceRangeStep)

  for (let i = 0; i < priceRangeStepCount; i++) {
    priceRangeList.push([priceMin + (i * priceRangeStep), priceMin + ((i + 1) * priceRangeStep)])
  }

  return priceRangeList
})

const resetFilters = () => {
  typeFilter.value = ''
  zipCodeFilter.value = ''
  priceRangeFilter.value = ''
  availableFilter.value = false
  toast('Filters reset')
}
</script>

<template>
  <main v-if="dataFiltered" class="container mx-auto p-5 space-y-5">
    <div class="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
      <!-- Type Filter -->
      <div class="flex flex-col space-y-0.5">
        <label for="type-list" class="font-semibold px-1 uppercase text-xs">
          Type
        </label>
        <select 
          v-if="typeList" 
          id="type-list" 
          name="type"
          v-model="typeFilter"
          class="rounded border border-transparent text-xs uppercase p-2 drop-shadow-xl transition-colors duration-500 ease-in-out hover:bg-zinc-200 focus:border-zinc-400 focus:bg-zinc-200 focus:outline-none"
        >
          <option value="">All</option>
          <option v-for="(type, index) in typeList" :key="type+'-'+index" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <!-- ZipCode Filter -->
      <div class="flex flex-col space-y-0.5">
        <label for="type-list" class="font-semibold px-1 uppercase text-xs">
          Zipcode
        </label>
        <select 
          v-if="zipCodeList" 
          id="zip-code-list" 
          name="zipCode"
          v-model="zipCodeFilter"
          class="rounded border border-transparent text-xs uppercase p-2 drop-shadow-xl transition-colors duration-500 ease-in-out hover:bg-zinc-200 focus:border-zinc-400 focus:bg-zinc-200 focus:outline-none"
        >
          <option value="">All</option>
          <option v-for="zipCode in zipCodeList" :key="zipCode" :value="zipCode">
            {{ zipCode }}
          </option>
        </select>
      </div>
      <!-- Available Filter -->
      <div class="flex flex-col space-y-0.5">
        <label for="type-list" class="font-semibold px-1 uppercase text-xs">
          Available
        </label>
        <select 
          id="available-filter" 
          name="available"
          v-model="availableFilter"
          class="rounded border border-transparent text-xs uppercase p-2 drop-shadow-xl transition-colors duration-500 ease-in-out hover:bg-zinc-200 focus:border-zinc-400 focus:bg-zinc-200 focus:outline-none"
        >
          <option :value="false">All</option>
          <option :value="true">Only Available</option>
        </select>
      </div>
      <!-- Price Range -->
      <div class="flex flex-col space-y-0.5">
        <label for="type-list" class="font-semibold px-1 uppercase text-xs">
          Price
        </label>
        <select
          id="price-range" 
          name="type"
          v-model="priceRangeFilter"
          class="rounded border border-transparent text-xs uppercase p-2 drop-shadow-xl transition-colors duration-500 ease-in-out hover:bg-zinc-200 focus:border-zinc-400 focus:bg-zinc-200 focus:outline-none"
        >
          <option value="">All</option>
          <option v-for="(priceRange, index) in priceRangeList" :key="priceRange + '-' + index" :value="priceRange">
            {{ priceRange[0] }} - {{ priceRange[1] }}
          </option>
        </select>
      </div>
      <!-- Reset Filters -->
      <div class="flex flex-col space-y-0.5">
        <label for="type-list" class="font-semibold px-1 uppercase text-xs">
          Reset
        </label>
        <button
          id="reset-filters" 
          name="reset"
          @click="resetFilters"
          class="rounded border border-transparent text-xs uppercase p-2 drop-shadow-xl transition-colors duration-500 ease-in-out hover:bg-zinc-200 hover:border-zinc-400 focus:outline-none"
        >
          Reset All filter
        </button>
      </div>
    </div>
    <TransitionGroup
      name="list"
      tag="div"
      class="transition-all ease-in-out duration-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <PropertyCard
        v-for="data in dataFiltered"
        :key="data.ID"
        :id="data.ID"
        :type="data.type"
        :zipCode="data.zipCode"
        :price="data.price"
        :available="data.available"
        :dateAvailable="data.dateAvailable"
      />
    </TransitionGroup>
    <p v-if="dataFiltered.length < 1">
      No data founded
    </p>
  </main>
</template>
