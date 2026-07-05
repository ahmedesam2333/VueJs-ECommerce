<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)
</script>

<template>
  <div class="font-sans">
    <!-- Top thin bar -->
    <div class="border-b border-gray-200 text-xs text-gray-500 py-2">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 sm:gap-0">
        <div>Need help? Call us: 1122334455</div>
        <div>Summer sale discount off 50%! <a href="#" class="underline font-medium text-gray-800 hover:text-secondary">Shop Now</a></div>
        <div>2-3 business days delivery & free returns</div>
      </div>
    </div>

    <!-- Main Header -->
    <header class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 flex justify-between items-center py-6 gap-4 relative">
      <!-- Logo -->
      <div class="text-2xl font-bold tracking-wide text-gray-900">
        <router-link to="/">SHOP<span class="font-light">LITE</span></router-link>
      </div>

      <!-- Navigation for Large Screens (hidden on small and middle screens) -->
      <nav class="hidden lg:block">
        <ul class="flex gap-8 text-sm font-medium tracking-wide">
          <li><router-link to="/" class="hover:text-secondary transition-colors" exact-active-class="text-secondary border-b-2 border-secondary pb-1">HOME</router-link></li>
          <li>
            <router-link to="/about" class="hover:text-secondary transition-colors" exact-active-class="text-secondary border-b-2 border-secondary pb-1">ABOUT</router-link>
          </li>
          <li><a href="#" class="hover:text-secondary transition-colors">SHOP</a></li>
          <li><a href="#" class="hover:text-secondary transition-colors">BLOGS</a></li>
          <li><a href="#" class="hover:text-secondary transition-colors">PAGES+</a></li>
          <li><router-link to="/contact" class="hover:text-secondary transition-colors" exact-active-class="text-secondary border-b-2 border-secondary pb-1">CONTACT</router-link></li>
        </ul>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-5 text-gray-800">
        <svg class="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <svg class="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <svg class="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <svg class="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        
        <!-- Burger menu icon (visible on small and middle screens, hidden on large screens) -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen" 
          class="lg:hidden p-1 text-gray-800 hover:text-secondary transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </header>

    <!-- Mobile Navigation Dropdown -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-96 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-96 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="lg:hidden border-b border-gray-200 bg-white overflow-hidden"
      >
        <ul class="flex flex-col px-6 py-4 space-y-3 text-sm font-medium tracking-wide">
          <li><router-link to="/" @click="isMobileMenuOpen = false" class="block py-1 hover:text-secondary transition-colors" exact-active-class="text-secondary font-semibold">HOME</router-link></li>
          <li><router-link to="/about" @click="isMobileMenuOpen = false" class="block py-1 hover:text-secondary transition-colors" exact-active-class="text-secondary font-semibold">ABOUT</router-link></li>
          <li><a href="#" @click="isMobileMenuOpen = false" class="block py-1 hover:text-secondary transition-colors">SHOP</a></li>
          <li><a href="#" @click="isMobileMenuOpen = false" class="block py-1 hover:text-secondary transition-colors">BLOGS</a></li>
          <li><a href="#" @click="isMobileMenuOpen = false" class="block py-1 hover:text-secondary transition-colors">PAGES+</a></li>
          <li><router-link to="/contact" @click="isMobileMenuOpen = false" class="block py-1 hover:text-secondary transition-colors" exact-active-class="text-secondary font-semibold">CONTACT</router-link></li>
        </ul>
      </div>
    </transition>
  </div>
</template>
