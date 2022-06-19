<template>
  <div class="xl:w-1/3 md:w-full sm:w-full p-4 m-auto">
    <div class="border border-gray-300 p-6 rounded-lg">
      <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      </div>
      <h2 class="text-lg text-gray-900 font-medium title-font mb-2">{{ name }}</h2>
      <p class="leading-relaxed text-base">{{ resource }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resource', 'name'],
  name: "CountryCard"
}
</script>

<style scoped>

</style>
