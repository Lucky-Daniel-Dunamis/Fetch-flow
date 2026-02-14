<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-950 flex flex-col items-center justify-center p-6">
    <h1 class="text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-8 drop-shadow-lg">
      FetchFlow
    </h1>
    
    <p class="text-xl md:text-2xl text-indigo-200 mb-12 max-w-2xl text-center">
      Fetch, display, and explore posts from JSONPlaceholder — built with Vue 3 + Tailwind v4
    </p>

    <button 
      class="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-10 py-5 rounded-xl shadow-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
      @click="$router.push('/posts')"
    >
      Start Exploring
    </button>
  </div>
</template>

<script setup>
const startExploring = () => {
  alert('API fetching coming soon! Next: load real posts from JSONPlaceholder.')
}
</script>