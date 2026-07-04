<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import ReviewsSection from '../components/ReviewsSection.vue'
import LatestPostsSection from '../components/LatestPostsSection.vue'
import BrandsSection from '../components/BrandsSection.vue'
import InstagramSection from '../components/InstagramSection.vue'

const categories = ref<any[]>([])
const bestSelling = ref<any[]>([])
const featuredItems = ref<any[]>([])
const latestItems = ref<any[]>([])
const bestReviewed = ref<any[]>([])
const onSaleItems = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/home')
    const data = await res.json()
    
    categories.value = data.categories
    bestSelling.value = data.bestSelling
    featuredItems.value = data.featuredItems
    latestItems.value = data.latestItems
    onSaleItems.value = data.onSaleItems
    bestReviewed.value = data.bestReviewed
  } catch (error) {
    console.error('Error fetching home data:', error)
  }
})
</script>

<template>
  <div class="leading-relaxed">
    <!-- Hero Section -->
    <section class="w-full bg-[#f8f8f8] mb-20 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col md:flex-row items-center justify-between relative z-10">
        <button class="hidden md:flex absolute left-4 bg-white border border-gray-200 w-10 h-10 justify-center items-center cursor-pointer text-gray-400 hover:text-secondary hover:border-secondary transition-colors rounded-full shadow-sm z-20">&lt;</button>
        
        <div class="w-full md:w-1/2 md:pl-16 mb-10 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold tracking-widest text-gray-900 mb-4 leading-tight">GOPRO HERO9 BLACK</h1>
          <p class="text-gray-500 mb-8 text-sm max-w-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
          <button class="bg-secondary text-white font-medium tracking-wide py-3 px-10 text-sm rounded-full shadow-sm hover:opacity-90 transition-opacity">SHOP NOW</button>
        </div>
        
        <div class="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <!-- decorative circle behind the product -->
          <div class="absolute bg-white/40 rounded-full w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 blur-xl"></div>
          <img src="/gopro.png" alt="GoPro Hero 9" class="w-4/5 max-w-md drop-shadow-2xl" />
        </div>
        
        <button class="hidden md:flex absolute right-4 bg-white border border-gray-200 w-10 h-10 justify-center items-center cursor-pointer text-gray-400 hover:text-secondary hover:border-secondary transition-colors rounded-full shadow-sm z-20">&gt;</button>
      </div>
    </section>

    <!-- Features Section -->
    <FeaturesSection />

    <!-- Categories Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="flex items-center gap-5 mb-10">
        <h2 class="text-xl font-medium tracking-wide whitespace-nowrap text-gray-900">CATEGORIES</h2>
        <div class="h-2 flex-grow bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=')] opacity-50"></div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
        <!-- Category items -->
        <div v-for="category in categories" :key="category._id" class="group cursor-pointer">
          <div class="bg-gray-50 aspect-square rounded flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-2">
            <div class="w-16 h-16 bg-[url('/blog.png')] bg-cover bg-center mix-blend-multiply opacity-80"></div>
          </div>
          <h4 class="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">{{ category.name }}</h4>
        </div>
      </div>
    </section>

    <!-- Best Selling Items Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="flex items-center gap-5 mb-10">
        <h2 class="text-xl font-medium tracking-wide whitespace-nowrap text-gray-900">BEST SELLING ITEMS</h2>
        <div class="h-2 flex-grow bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=')] opacity-50"></div>
      </div>
      <div class="flex items-center gap-5">
        <button class="bg-white border border-gray-200 w-10 h-10 flex justify-center items-center cursor-pointer text-gray-400 hover:text-gray-800 hover:border-gray-800 transition-colors shrink-0 rounded-full shadow-sm">&lt;</button>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
          <!-- Product Card -->
          <div v-for="product in bestSelling" :key="product._id" class="border border-gray-100 p-6 rounded flex flex-col items-center group cursor-pointer hover:shadow-md transition-shadow bg-white text-center">
            <div class="w-full aspect-square bg-cover bg-center mix-blend-multiply mb-4" :style="`background-image: url('${product.image || '/blog.png'}')`"></div>
            <h4 class="text-sm font-medium text-gray-800 group-hover:text-black mb-1">{{ product.name }}</h4>
            <span class="text-secondary font-semibold">${{ product.price }}</span>
          </div>
        </div>
        <button class="bg-white border border-gray-200 w-10 h-10 flex justify-center items-center cursor-pointer text-gray-400 hover:text-gray-800 hover:border-gray-800 transition-colors shrink-0 rounded-full shadow-sm">&gt;</button>
      </div>
    </section>

    <!-- Promo Banner Section -->
    <section class="w-full bg-[#f9f9f9] mb-20 overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
        <div class="w-full md:w-1/2 min-h-[300px] md:min-h-[400px] bg-center bg-cover bg-no-repeat" style="background-image: url('/apple_promo.png');"></div>
        <div class="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h2 class="text-3xl font-light tracking-wider text-gray-900 mb-6 max-w-sm">30% DISCOUNT ON APPLE COLLECTION</h2>
          
          <div class="flex gap-6 mb-8 text-center">
            <div>
              <div class="text-4xl font-light text-gray-800 mb-1">21</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide border-t-2 border-secondary pt-1">Days</div>
            </div>
            <div>
              <div class="text-4xl font-light text-gray-800 mb-1">22</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide border-t-2 border-secondary pt-1">Hrs</div>
            </div>
            <div>
              <div class="text-4xl font-light text-gray-800 mb-1">19</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide border-t-2 border-secondary pt-1">Min</div>
            </div>
            <div>
              <div class="text-4xl font-light text-gray-800 mb-1">30</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide border-t-2 border-secondary pt-1">Sec</div>
            </div>
          </div>
          
          <div>
            <button class="bg-secondary text-white font-medium tracking-wide py-3 px-8 text-sm rounded shadow-sm hover:opacity-90 transition-opacity">SHOP COLLECTION</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Four Columns Product Listing -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Column 1 -->
        <div>
          <h3 class="text-base font-semibold tracking-wide mb-6 text-gray-900 uppercase">FEATURED</h3>
          <div class="space-y-4">
            <div v-for="product in featuredItems" :key="product._id" class="flex items-center gap-4 group cursor-pointer">
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-cover bg-center" :style="`background-image: url('${product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-medium text-gray-800 group-hover:text-secondary transition-colors">{{ product.name }}</h4>
                <div class="text-secondary text-sm font-semibold">${{ product.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2 -->
        <div>
          <h3 class="text-base font-semibold tracking-wide mb-6 text-gray-900 uppercase">LATEST ITEMS</h3>
          <div class="space-y-4">
            <div v-for="product in latestItems" :key="product._id" class="flex items-center gap-4 group cursor-pointer">
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-cover bg-center" :style="`background-image: url('${product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-medium text-gray-800 group-hover:text-secondary transition-colors">{{ product.name }}</h4>
                <div class="text-secondary text-sm font-semibold">${{ product.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3 -->
        <div>
          <h3 class="text-base font-semibold tracking-wide mb-6 text-gray-900 uppercase">BEST REVIEWED</h3>
          <div class="space-y-4">
            <div v-for="product in bestReviewed" :key="product._id" class="flex items-center gap-4 group cursor-pointer">
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-cover bg-center" :style="`background-image: url('${product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-medium text-gray-800 group-hover:text-secondary transition-colors">{{ product.name }}</h4>
                <div class="text-secondary text-sm font-semibold">${{ product.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 4 -->
        <div>
          <h3 class="text-base font-semibold tracking-wide mb-6 text-gray-900 uppercase">ON SALE</h3>
          <div class="space-y-4">
            <div v-for="product in onSaleItems" :key="product._id" class="flex items-center gap-4 group cursor-pointer">
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-cover bg-center" :style="`background-image: url('${product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-medium text-gray-800 group-hover:text-secondary transition-colors">{{ product.name }}</h4>
                <div class="flex gap-2">
                  <span class="text-gray-400 line-through text-xs">${{ product.originalPrice }}</span>
                  <span class="text-secondary text-sm font-semibold">${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Customers Reviews Section -->
    <ReviewsSection />

    <!-- Latest Posts Section -->
    <LatestPostsSection />

    <!-- Brand Logos Section -->
    <BrandsSection />

    <!-- Instagram Section -->
    <InstagramSection />
  </div>
</template>
