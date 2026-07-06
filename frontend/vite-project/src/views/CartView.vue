<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '../composables/useCart'
import { 
  ShoppingBag, 
  Trash2, 
  Tag, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Truck
} from 'lucide-vue-next'

const { 
  cartItems, 
  itemsCount, 
  subtotal, 
  discountAmount, 
  total, 
  activeCoupon, 
  applyCoupon, 
  removeCoupon, 
  removeFromCart, 
  updateQuantity,
  resetCheckout
} = useCart()

onMounted(() => {
  // Always reset checkout success state when loading the cart page
  resetCheckout()
})

onUnmounted(() => {
  // Reset state when navigating away so that it doesn't stick
  resetCheckout()
})

// Local states
const couponCode = ref('')
const couponLoading = ref(false)
const couponError = ref('')
const couponSuccessMsg = ref('')

const handleApplyCoupon = async () => {
  if (!couponCode.value) return
  couponLoading.value = true
  couponError.value = ''
  couponSuccessMsg.value = ''
  try {
    await applyCoupon(couponCode.value)
    couponSuccessMsg.value = `Coupon "${couponCode.value.toUpperCase()}" applied successfully!`
    couponCode.value = ''
  } catch (err: any) {
    couponError.value = err.message || 'Invalid or expired coupon'
  } finally {
    couponLoading.value = false
  }
}

const handleRemoveCoupon = () => {
  removeCoupon()
  couponSuccessMsg.value = ''
  couponError.value = ''
}

const handleQuantityChange = (productId: string, qty: number) => {
  try {
    updateQuantity(productId, qty)
  } catch (err: any) {
    alert(err.message || 'Failed to update quantity')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-left">
    
    <!-- Breadcrumb -->
    <div class="flex items-center text-xs text-gray-500 gap-1.5 uppercase font-medium tracking-wide mb-8">
      <router-link to="/" class="hover:text-secondary transition-colors">Home</router-link>
      <span>/</span>
      <router-link to="/shop" class="hover:text-secondary transition-colors">Shop</router-link>
      <span>/</span>
      <span class="text-gray-900 font-semibold">Shopping Cart</span>
    </div>

    <h1 class="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

    <!-- EMPTY CART STATE -->
    <div v-if="cartItems.length === 0" class="bg-white border border-gray-100 rounded-lg p-16 text-center max-w-xl mx-auto shadow-sm">
      <div class="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <ShoppingBag class="w-10 h-10" />
      </div>
      
      <h2 class="text-xl font-bold text-gray-900 mb-2">
        Your Shopping Cart is Empty
      </h2>
      
      <p class="text-gray-500 text-sm mb-8 leading-relaxed max-w-md mx-auto">
        It looks like you haven't added any products to your shopping cart yet. Visit our shop catalog to explore our electronics, cosmetics, and more.
      </p>

      <router-link 
        to="/shop" 
        class="bg-secondary text-white font-bold text-sm tracking-wide py-3 px-8 rounded shadow hover:opacity-95 active:scale-95 transition-all inline-block uppercase"
      >
        Go Shopping
      </router-link>
    </div>

    <!-- MAIN CART CONTENT -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Items List -->
      <div class="lg:col-span-8 space-y-4">
        <div class="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-100 hidden sm:grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <div class="col-span-6">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-2 text-center">Quantity</div>
            <div class="col-span-2 text-right">Subtotal</div>
          </div>

          <div class="divide-y divide-gray-100">
            <div 
              v-for="item in cartItems" 
              :key="item.product._id"
              class="p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
            >
              <!-- Info -->
              <div class="col-span-1 sm:col-span-6 flex gap-4 items-center">
                <div class="w-16 h-16 bg-gray-50 border border-gray-100 rounded p-1 flex items-center justify-center shrink-0">
                  <img :src="item.product.thumbnail" :alt="item.product.title" class="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div class="min-w-0">
                  <h3 class="text-sm font-bold text-gray-800 truncate hover:text-secondary">
                    <router-link :to="`/products/${item.product._id}`">{{ item.product.title }}</router-link>
                  </h3>
                  <p v-if="item.product.brand" class="text-xs text-gray-400 mt-0.5">{{ item.product.brand }}</p>
                  <button 
                    @click="removeFromCart(item.product._id)"
                    class="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 mt-2 transition-colors cursor-pointer"
                  >
                    <Trash2 class="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>

              <!-- Price -->
              <div class="col-span-1 sm:col-span-2 text-left sm:text-center">
                <span class="sm:hidden text-xs font-bold text-gray-400 uppercase mr-1">Price:</span>
                <span class="text-sm font-semibold text-gray-800">${{ item.product.price.toFixed(2) }}</span>
              </div>

              <!-- Qty selection -->
              <div class="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                <div class="flex items-center border border-gray-200 rounded">
                  <button 
                    @click="handleQuantityChange(item.product._id, item.quantity - 1)"
                    class="px-2.5 py-1 text-gray-500 hover:text-secondary font-bold text-xs"
                  >-</button>
                  <span class="px-2.5 text-xs font-semibold text-gray-850">{{ item.quantity }}</span>
                  <button 
                    @click="handleQuantityChange(item.product._id, item.quantity + 1)"
                    class="px-2.5 py-1 text-gray-500 hover:text-secondary font-bold text-xs"
                  >+</button>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="col-span-1 sm:col-span-2 text-left sm:text-right">
                <span class="sm:hidden text-xs font-bold text-gray-400 uppercase mr-1">Total:</span>
                <span class="text-sm font-extrabold text-secondary">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
              </div>

            </div>
          </div>
        </div>

        <!-- Coupon code section -->
        <div class="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <h3 class="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Tag class="w-4 h-4 text-gray-400" /> Have a Coupon?
          </h3>

          <!-- Form inputs -->
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 relative">
              <input 
                v-model="couponCode"
                type="text"
                placeholder="ENTER COUPON CODE"
                class="w-full bg-white border border-gray-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-secondary transition-all uppercase font-mono font-bold"
                :disabled="!!activeCoupon"
              />
            </div>
            <button 
              v-if="!activeCoupon"
              @click="handleApplyCoupon"
              :disabled="couponLoading || !couponCode"
              class="bg-gray-800 text-white font-bold text-xs py-2 px-6 rounded uppercase hover:bg-gray-900 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1"
            >
              <Loader2 v-if="couponLoading" class="w-3.5 h-3.5 animate-spin" />
              Apply
            </button>
            <button 
              v-else
              @click="handleRemoveCoupon"
              class="bg-red-500 text-white font-bold text-xs py-2 px-6 rounded uppercase hover:bg-red-650 transition-all cursor-pointer flex items-center justify-center"
            >
              Remove Coupon
            </button>
          </div>

          <p v-if="couponError" class="text-xs text-red-600 mt-2 flex items-center gap-1 font-medium">
            <AlertCircle class="w-3.5 h-3.5" /> {{ couponError }}
          </p>
          <p v-if="couponSuccessMsg" class="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-medium">
            <CheckCircle class="w-3.5 h-3.5" /> {{ couponSuccessMsg }}
          </p>

          <!-- Current active coupon badge -->
          <div v-if="activeCoupon" class="mt-3 flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md p-2 text-xs">
            <span class="font-mono font-bold tracking-wider bg-emerald-150 py-0.5 px-1.5 rounded">{{ activeCoupon.code }}</span>
            <span>
              discount: {{ activeCoupon.discountType === 'percentage' ? activeCoupon.discountValue + '%' : '$' + activeCoupon.discountValue }}
            </span>
          </div>
        </div>
      </div>

      <!-- Checkout / Order summary Column -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Summary details -->
        <div class="bg-white border border-gray-100 rounded-lg p-6 shadow-sm text-left">
          <h2 class="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-4 mb-4">Order Summary</h2>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-gray-500 font-medium">
              <span>Items Total ({{ itemsCount }} items)</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div v-if="activeCoupon" class="flex justify-between text-emerald-600 font-medium">
              <span>Discount ({{ activeCoupon.code }})</span>
              <span>-${{ discountAmount.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between text-gray-500 font-medium">
              <span>Shipping Fee</span>
              <span class="text-emerald-600">FREE</span>
            </div>

            <div class="border-t border-gray-100 pt-4 mt-2 flex justify-between items-baseline">
              <span class="text-base font-extrabold text-gray-900">Total Amount</span>
              <span class="text-xl font-black text-secondary">${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Checkout Form details -->
        <div class="bg-white border border-gray-100 rounded-lg p-6 shadow-sm text-left">
          <h2 class="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-4 mb-4">Checkout</h2>
          
          <p class="text-gray-500 text-xs mb-6 leading-relaxed">
            Ready to complete your purchase? Click below to proceed to checkout where you can specify your shipping information and choose credit/debit card or cash on delivery options.
          </p>

          <!-- Action submit -->
          <router-link 
            to="/checkout"
            class="w-full bg-secondary text-white font-bold text-sm tracking-widest py-4 px-6 rounded shadow hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase cursor-pointer block text-center"
          >
            <ShoppingBag class="w-4 h-4" /> Proceed to Checkout
          </router-link>
          
          <div class="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center mt-4">
            <Truck class="w-3.5 h-3.5" /> 2-3 business days delivery
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
