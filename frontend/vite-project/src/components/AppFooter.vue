<script setup lang="ts">
</script>

<template>
  <footer class="border-t border-gray-200 pt-16 text-sm w-full mt-auto font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
      <div class="lg:col-span-4">
        <div class="text-xl font-bold tracking-wide mb-4 text-gray-900">SHOP<span class="font-light">LITE</span></div>
        <p class="text-gray-500 mb-6 leading-relaxed">Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. Gravida massa volutpat aenean odio erat nullam fringilla.</p>
        <div class="flex gap-4 text-gray-400">
           <a href="#" class="hover:text-secondary transition-colors">fb</a> 
           <a href="#" class="hover:text-secondary transition-colors">ig</a> 
           <a href="#" class="hover:text-secondary transition-colors">tw</a> 
           <a href="#" class="hover:text-secondary transition-colors">in</a> 
           <a href="#" class="hover:text-secondary transition-colors">yt</a>
        </div>
      </div>
      <div class="lg:col-span-2">
        <h4 class="text-base font-medium mb-5 tracking-wide text-gray-900">QUICK LINKS</h4>
        <ul class="space-y-3">
          <li><router-link to="/" class="text-gray-500 hover:text-secondary transition-colors">HOME</router-link></li>
          <li><router-link to="/about" class="text-gray-500 hover:text-secondary transition-colors">ABOUT</router-link></li>
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">SHOP</a></li>
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">BLOGS</a></li>
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">CONTACT</a></li>
        </ul>
      </div>
      <div class="lg:col-span-3">
        <h4 class="text-base font-medium mb-5 tracking-wide text-gray-900">HELP & INFO</h4>
        <ul class="space-y-3">
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">TRACK YOUR ORDER</a></li>
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">RETURNS POLICIES</a></li>
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">SHIPPING + DELIVERY</a></li>
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">CONTACT US</a></li>
          <li><a href="#" class="text-gray-500 hover:text-secondary transition-colors">FAQS</a></li>
        </ul>
      </div>
      <div class="lg:col-span-3">
        <h4 class="text-base font-medium mb-5 tracking-wide text-gray-900">CONTACT US</h4>
        <p class="text-gray-500 mb-1">Do you have any queries or suggestions?</p>
        <a href="mailto:yourinfo@gmail.com" class="block font-medium text-gray-900 underline mb-4 hover:text-secondary transition-colors">yourinfo@gmail.com</a>
        <p class="text-gray-500 mb-1">If you need support? Just give us a call.</p>
        <a href="tel:+5511122233344" class="block font-medium text-gray-900 underline hover:text-secondary transition-colors">+55 111 222 333 44</a>
      </div>
    </div>
    
    <div class="border-t border-gray-200 py-5 w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4 md:gap-0">
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <span>We ship with: <span class="text-gray-300">(Logos)</span></span>
          <span>Payment options: <span class="text-gray-300">(Logos)</span></span>
        </div>
        <div>
          © Copyright 2024 ShopLite. Design by <a href="#" class="underline hover:text-secondary transition-colors">TemplatesJungle</a>
        </div>
      </div>
    </div>
  </footer>
</template>
