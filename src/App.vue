<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="container mx-auto text-center space-x-5 p-5">
      <RouterLink to="/" :class="{'text-red-500 font-semibold': $route.path === '/'}">
        Home
      </RouterLink>
      <RouterLink to="/favorite" :class="{'text-red-500 font-semibold': $route.path == '/favorite'}">
        Your Favorites
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
