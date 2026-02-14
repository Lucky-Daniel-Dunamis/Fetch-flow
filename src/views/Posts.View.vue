
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white">

    <header class="bg-black/40 py-6 px-6 md:px-12 sticky top-0 z-20 border-b border-white/10 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <h1 class="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          FetchFlow
        </h1>

        <div class="flex gap-4 items-center">
          <button
            @click="fetchPosts"
            class="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Refresh
          </button>

          <router-link 
            to="/" 
            class="bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 rounded-full transition-all duration-300"
          >
            ← Home
          </router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-12 px-6 md:px-12">

      <div class="text-center mb-12">
        <h2 class="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Posts Feed
        </h2>
        <p class="text-indigo-200/80 text-lg">
          Real-time REST simulation powered by JSONPlaceholder
        </p>
      </div>

      <div class="max-w-xl mx-auto mb-12">
        <input
          v-model="search"
          type="text"
          placeholder="Search posts by title..."
          class="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 backdrop-blur-xl"
        />
      </div>

      <div v-if="state.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="n in 8"
          :key="n"
          class="h-64 rounded-2xl bg-white/5 animate-pulse border border-white/10"
        ></div>
      </div>

      <div v-else-if="state.error" class="text-center bg-red-900/40 border border-red-500/40 p-10 rounded-2xl backdrop-blur-xl">
        <p class="text-2xl mb-4">⚠ {{ state.error }}</p>
        <button
          @click="fetchPosts"
          class="mt-4 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-full transition"
        >
          Try Again
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]"
        >
          <div class="flex justify-between mb-4">
            <span class="text-xs text-indigo-300 font-semibold bg-indigo-900/40 px-3 py-1 rounded-full">
              #{{ post.id }}
            </span>
            <span class="text-xs text-gray-400">
              User {{ post.userId }}
            </span>
          </div>

          <h3 class="text-lg font-bold mb-3 group-hover:text-indigo-300 transition">
            {{ post.title }}
          </h3>

          <p class="text-gray-300 text-sm line-clamp-3 mb-6">
            {{ post.body }}
          </p>

          <button
            class="text-indigo-400 text-sm group-hover:text-indigo-300 transition flex items-center gap-2"
          >
            Read more →
          </button>
        </div>

      </div>

    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'

const search = ref('')

const state = reactive({
  posts: [],
  loading: false,
  error: null
})

const fetchPosts = async () => {
  state.loading = true
  state.error = null

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!res.ok) throw new Error('Failed to fetch posts.')
    state.posts = await res.json()
  } catch (err) {
    state.error = err.message || 'Something went wrong.'
  } finally {
    state.loading = false
  }
}

const filteredPosts = computed(() => {
  return state.posts.filter(post =>
    post.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(fetchPosts)
</script>
