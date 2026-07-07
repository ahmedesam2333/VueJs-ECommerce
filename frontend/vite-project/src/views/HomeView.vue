<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import FeaturesSection from '../components/FeaturesSection.vue'
import ReviewsSection from '../components/ReviewsSection.vue'
import BrandsSection from '../components/BrandsSection.vue'
import { API_BASE_URL } from '../config'

const router = useRouter()

const categories = ref<any[]>([])
const bestSelling = ref<any[]>([])
const featuredItems = ref<any[]>([])
const latestItems = ref<any[]>([])
const bestReviewed = ref<any[]>([])
const onSaleItems = ref<any[]>([])

// Carousel Slider state & functions
const activeSlide = ref(0)
const slideDirection = ref('next')
const slides = [
  {
    title: 'ESSENCE MASCARA LASH PRINCESS',
    subtitle: 'POPULAR BEAUTY COSMETICS',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting formula.',
    price: '$9.99',
    link: '/shop?category=beauty',
    image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp'
  },
  {
    title: 'CALVIN KLEIN CK ONE',
    subtitle: 'CLASSIC UNISEX FRAGRANCES',
    description: 'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It\'s a versatile fragrance suitable for everyday wear.',
    price: '$49.99',
    link: '/shop?category=fragrances',
    image: 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp'
  },
  {
    title: 'ANNIBALE COLOMBO BED',
    subtitle: 'LUXURIOUS HOME FURNITURE',
    description: 'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.',
    price: '$1899.99',
    link: '/shop?category=furniture',
    image: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp'
  }
]

const nextSlide = () => {
  slideDirection.value = 'next'
  activeSlide.value = (activeSlide.value + 1) % slides.length
}

const prevSlide = () => {
  slideDirection.value = 'prev'
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  slideDirection.value = index > activeSlide.value ? 'next' : 'prev'
  activeSlide.value = index
}

let slideInterval: any

onMounted(async () => {
  // Start slide autoplay
  slideInterval = setInterval(nextSlide, 8000)

  try {
    const res = await fetch(`${API_BASE_URL}/api/home`)
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

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})
</script>

<template>
  <div class="leading-relaxed">
    <!-- Hero Slider Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mb-20">
      <div class="relative overflow-hidden rounded-3xl h-[480px] md:h-[540px] border border-gray-100 bg-[#f9f9fa]">
        
        <!-- Background Ambient Glows -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <!-- Slides -->
        <Transition :name="slideDirection === 'next' ? 'slide-next' : 'slide-prev'">
          <div 
            :key="activeSlide" 
            class="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 md:py-0"
          >
            <!-- Text Content -->
            <div class="w-full md:w-1/2 text-left z-10 space-y-4 md:space-y-6">
              
              <h1 class="text-3xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight uppercase">
                {{ slides[activeSlide].title }}
              </h1>
              
              <p class="text-xs md:text-sm font-semibold tracking-wider text-secondary/90 uppercase">
                {{ slides[activeSlide].subtitle }}
              </p>
              
              <p class="text-xs md:text-sm text-gray-500 max-w-md leading-relaxed font-normal">
                {{ slides[activeSlide].description }}
              </p>
              
              <!-- Price & CTA -->
              <div class="flex items-center gap-6 pt-2">
                <div>
                  <span class="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Special Price</span>
                  <span class="text-2xl font-black text-gray-900">{{ slides[activeSlide].price }}</span>
                </div>
                <button 
                  @click="router.push(slides[activeSlide].link)" 
                  class="bg-secondary text-white font-bold tracking-widest py-3.5 px-8 text-xs rounded-full hover:bg-opacity-90 active:scale-[0.98] transition-all cursor-pointer uppercase"
                >
                  Shop Now
                </button>
              </div>
            </div>
            
            <!-- Image Area -->
            <div class="w-full md:w-1/2 flex justify-center md:justify-end relative mt-6 md:mt-0">
              <!-- Glowing Accent Backdrop -->
              <div class="absolute bg-secondary/10 rounded-full w-72 h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl -z-10 animate-pulse"></div>
              
              <!-- Floating Image -->
              <img 
                :src="slides[activeSlide].image" 
                :alt="slides[activeSlide].title" 
                class="w-[68%] md:w-[82%] max-w-md object-contain mix-blend-multiply drop-shadow-[0_15px_30px_rgba(255,101,67,0.15)] animate-float select-none pointer-events-none" 
              />
            </div>
          </div>
        </Transition>

        <!-- Slider Controls -->
        <div class="absolute inset-x-0 bottom-6 flex justify-between items-center px-8 z-25">
          <!-- Slide indicators -->
          <div class="flex gap-2">
            <button 
              v-for="(_, index) in slides" 
              :key="index"
              @click="goToSlide(index)"
              class="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              :class="activeSlide === index ? 'w-8 bg-secondary' : 'w-2 bg-gray-200 hover:bg-gray-300'"
              :aria-label="`Go to slide ${index + 1}`"
            ></button>
          </div>

          <!-- Navigation arrows -->
          <div class="flex gap-2">
            <button 
              @click="prevSlide"
              class="w-10 h-10 flex justify-center items-center rounded-full border border-gray-200 bg-white text-gray-500 hover:text-secondary hover:border-secondary hover:shadow-sm transition-all active:scale-90 cursor-pointer text-center"
              aria-label="Previous Slide"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>
            <button 
              @click="nextSlide"
              class="w-10 h-10 flex justify-center items-center rounded-full border border-gray-200 bg-white text-gray-500 hover:text-secondary hover:border-secondary hover:shadow-sm transition-all active:scale-90 cursor-pointer text-center"
              aria-label="Next Slide"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- Features Section -->
    <FeaturesSection />



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
          <div 
            v-for="product in bestSelling" 
            :key="product._id" 
            @click="router.push('/products/' + product._id)"
            class="border border-gray-100 p-6 rounded flex flex-col items-center group cursor-pointer hover:shadow-md transition-shadow bg-white text-center"
          >
            <div class="w-full aspect-square bg-contain bg-center bg-no-repeat mix-blend-multiply mb-4" :style="`background-image: url('${product.thumbnail || product.image || '/blog.png'}')`"></div>
            <h4 class="text-sm font-medium text-gray-800 group-hover:text-secondary mb-1 line-clamp-2 h-10">{{ product.title || product.name }}</h4>
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
            <button @click="router.push('/shop')" class="bg-secondary text-white font-medium tracking-wide py-3 px-8 text-sm rounded shadow-sm hover:opacity-90 transition-opacity cursor-pointer">SHOP COLLECTION</button>
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
            <div 
              v-for="product in featuredItems" 
              :key="product._id" 
              @click="router.push('/products/' + product._id)"
              class="flex items-center gap-4 group cursor-pointer"
            >
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-contain bg-center bg-no-repeat mix-blend-multiply" :style="`background-image: url('${product.thumbnail || product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-bold text-gray-800 group-hover:text-secondary transition-colors line-clamp-1" :title="product.title || product.name">{{ product.title || product.name }}</h4>
                <div class="text-secondary text-sm font-semibold">${{ product.price.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2 -->
        <div>
          <h3 class="text-base font-semibold tracking-wide mb-6 text-gray-900 uppercase">LATEST ITEMS</h3>
          <div class="space-y-4">
            <div 
              v-for="product in latestItems" 
              :key="product._id" 
              @click="router.push('/products/' + product._id)"
              class="flex items-center gap-4 group cursor-pointer"
            >
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-contain bg-center bg-no-repeat mix-blend-multiply" :style="`background-image: url('${product.thumbnail || product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-bold text-gray-800 group-hover:text-secondary transition-colors line-clamp-1" :title="product.title || product.name">{{ product.title || product.name }}</h4>
                <div class="text-secondary text-sm font-semibold">${{ product.price.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3 -->
        <div>
          <h3 class="text-base font-semibold tracking-wide mb-6 text-gray-900 uppercase">BEST REVIEWED</h3>
          <div class="space-y-4">
            <div 
              v-for="product in bestReviewed" 
              :key="product._id" 
              @click="router.push('/products/' + product._id)"
              class="flex items-center gap-4 group cursor-pointer"
            >
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-contain bg-center bg-no-repeat mix-blend-multiply" :style="`background-image: url('${product.thumbnail || product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-bold text-gray-800 group-hover:text-secondary transition-colors line-clamp-1" :title="product.title || product.name">{{ product.title || product.name }}</h4>
                <div class="text-secondary text-sm font-semibold">${{ product.price.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 4 -->
        <div>
          <h3 class="text-base font-semibold tracking-wide mb-6 text-gray-900 uppercase">ON SALE</h3>
          <div class="space-y-4">
            <div 
              v-for="product in onSaleItems" 
              :key="product._id" 
              @click="router.push('/products/' + product._id)"
              class="flex items-center gap-4 group cursor-pointer"
            >
              <div class="w-16 h-16 bg-gray-50 rounded flex-shrink-0 bg-contain bg-center bg-no-repeat mix-blend-multiply" :style="`background-image: url('${product.thumbnail || product.image || '/blog.png'}')`"></div>
              <div>
                <h4 class="text-sm font-bold text-gray-800 group-hover:text-secondary transition-colors line-clamp-1" :title="product.title || product.name">{{ product.title || product.name }}</h4>
                <div class="flex gap-2">
                  <span v-if="product.originalPrice" class="text-gray-400 line-through text-xs">${{ product.originalPrice.toFixed(2) }}</span>
                  <span class="text-secondary text-sm font-semibold">${{ product.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Customers Reviews Section -->
    <ReviewsSection />

    <!-- Categories Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="flex items-center gap-5 mb-10">
        <h2 class="text-xl font-medium tracking-wide whitespace-nowrap text-gray-900">CATEGORIES</h2>
        <div class="h-2 flex-grow bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=')] opacity-50"></div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
        <!-- Category items -->
        <div 
          v-for="category in categories" 
          :key="category._id" 
          @click="router.push({ path: '/shop', query: { category: category.name } })"
          class="group cursor-pointer"
        >
          <div class="bg-gray-50 aspect-square rounded flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-2 p-4">
            <img :src="category.image || '/blog.png'" :alt="category.name" class="w-full h-full object-contain mix-blend-multiply opacity-80" />
          </div>
          <h4 class="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">{{ category.name }}</h4>
        </div>
      </div>
    </section>

    <!-- Brand Logos Section -->
    <BrandsSection />
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Slide transition animations (Hardware-accelerated horizontal slide) */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
}

/* Slide Next (Slides moving left) */
.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide Prev (Slides moving right) */
.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
