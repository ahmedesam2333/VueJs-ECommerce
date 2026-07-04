<script setup lang="ts">
</script>

<template>
  <div class="font-sans">
    <!-- Top thin bar -->
    <div class="border-b border-gray-200 text-xs text-gray-500 py-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 sm:gap-0">
        <div>Need help? Call us: 1122334455</div>
        <div>Summer sale discount off 50%! <a href="#" class="underline font-medium text-gray-800 hover:text-secondary">Shop Now</a></div>
        <div>2-3 business days delivery & free returns</div>
      </div>
    </div>

    <!-- Main Header -->
    <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center py-6 gap-4">
      <div class="text-2xl font-bold tracking-wide text-gray-900">
        SHOP<span class="font-light">LITE</span>
      </div>
      <nav class="hidden md:block">
        <ul class="flex gap-8 text-sm font-medium tracking-wide">
          <li><router-link to="/" class="hover:text-secondary transition-colors" exact-active-class="text-secondary border-b-2 border-secondary pb-1">HOME</router-link></li>
          <li>
            <router-link to="/about" class="hover:text-secondary transition-colors" exact-active-class="text-secondary border-b-2 border-secondary pb-1">ABOUT</router-link>
          </li>
          <li><a href="#" class="hover:text-secondary transition-colors">SHOP</a></li>
          <li><a href="#" class="hover:text-secondary transition-colors">BLOGS</a></li>
          <li><a href="#" class="hover:text-secondary transition-colors">PAGES+</a></li>
          <li><a href="#" class="hover:text-secondary transition-colors">CONTACT</a></li>
        </ul>
      </nav>
      <div class="flex gap-5 text-gray-800">
        <svg class="w-5 h-5 cursor-pointer hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <svg class="w-5 h-5 cursor-pointer hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <svg class="w-5 h-5 cursor-pointer hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <svg class="w-5 h-5 cursor-pointer hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      </div>
    </header>
  </div>
</template>
