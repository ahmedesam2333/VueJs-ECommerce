import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth'

export interface CartItem {
  product: {
    _id: string
    title: string
    price: number
    thumbnail?: string
    image?: string
    stock: number
    brand?: string
  }
  quantity: number
}

export interface CouponData {
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
}

export interface GuestCustomer {
  name: string
  email: string
  phone: string
  address: string
}

// Global shared state
const cartItems = ref<CartItem[]>([])
const activeCoupon = ref<CouponData | null>(null)
const checkoutError = ref('')
const checkoutSuccess = ref(false)
const orderDetails = ref<any>(null)

export function useCart() {
  const { user, token } = useAuth()

  // Dynamic storage key based on user email to keep carts isolated per user
  const getCartKey = () => {
    return user.value ? `cart_${user.value.email}` : 'cart_guest'
  }

  // Load cart from localStorage
  const loadCart = () => {
    const key = getCartKey()
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        cartItems.value = JSON.parse(stored)
      } catch (e) {
        cartItems.value = []
      }
    } else {
      cartItems.value = []
    }
    activeCoupon.value = null
  }

  // Save cart to localStorage
  const saveCart = () => {
    const key = getCartKey()
    localStorage.setItem(key, JSON.stringify(cartItems.value))
  }

  const resetCheckout = () => {
    checkoutSuccess.value = false
    orderDetails.value = null
    checkoutError.value = ''
  }

  // Watch for user changes to reload the correct cart
  watch(user, () => {
    loadCart()
    resetCheckout()
  }, { immediate: true })

  const itemsCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  })

  const discountAmount = computed(() => {
    if (!activeCoupon.value) return 0
    if (activeCoupon.value.discountType === 'percentage') {
      return (subtotal.value * activeCoupon.value.discountValue) / 100
    } else {
      return Math.min(activeCoupon.value.discountValue, subtotal.value)
    }
  })

  const total = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value)
  })

  /**
   * Add a product to the cart.
   */
  const addToCart = (product: any, quantity: number = 1) => {
    // Reset checkout success state whenever a new item is added to the cart
    resetCheckout()

    const existingIndex = cartItems.value.findIndex(item => item.product._id === product._id)

    if (existingIndex > -1) {
      const newQty = cartItems.value[existingIndex].quantity + quantity
      if (newQty > product.stock) {
        throw new Error(`Only ${product.stock} items available in stock.`)
      }
      cartItems.value[existingIndex].quantity = newQty
    } else {
      if (quantity > product.stock) {
        throw new Error(`Only ${product.stock} items available in stock.`)
      }
      cartItems.value.push({
        product: {
          _id: product._id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || product.image,
          stock: product.stock,
          brand: product.brand
        },
        quantity
      })
    }

    saveCart()
  }

  const removeFromCart = (productId: string) => {
    cartItems.value = cartItems.value.filter(item => item.product._id !== productId)
    saveCart()
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cartItems.value.find(i => i.product._id === productId)
    if (item) {
      if (quantity > item.product.stock) {
        throw new Error(`Only ${item.product.stock} items available in stock.`)
      }
      item.quantity = Math.max(1, quantity)
      saveCart()
    }
  }

  const clearCart = () => {
    cartItems.value = []
    activeCoupon.value = null
    saveCart()
  }

  /**
   * Apply coupon discount from server
   */
  const applyCoupon = async (code: string) => {
    if (!token.value) throw new Error('Authentication required')
    checkoutError.value = ''
    try {
      const res = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({ code })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Invalid coupon')
      }

      const data = await res.json()
      activeCoupon.value = {
        code: data.code,
        discountType: data.discountType,
        discountValue: data.discountValue
      }
    } catch (e: any) {
      activeCoupon.value = null
      throw new Error(e.message || 'Error validating coupon')
    }
  }

  const removeCoupon = () => {
    activeCoupon.value = null
  }

  /**
   * Submit the order to backend
   */
  const submitCheckout = async (shippingAddress: string, paymentMethod: string = 'cod', guestCustomer?: GuestCustomer) => {
    checkoutError.value = ''
    checkoutSuccess.value = false
    orderDetails.value = null

    if (cartItems.value.length === 0) {
      throw new Error('Your cart is empty')
    }

    try {
      const itemsPayload = cartItems.value.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }))

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token.value ? { 'Authorization': `Bearer ${token.value}` } : {})
        },
        body: JSON.stringify({
          items: itemsPayload,
          shippingAddress,
          paymentMethod,
          guestCustomer
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to place order')
      }

      const order = await res.json()
      orderDetails.value = order
      checkoutSuccess.value = true
      clearCart()
      return order
    } catch (e: any) {
      checkoutError.value = e.message || 'Failed to process checkout'
      throw new Error(checkoutError.value)
    }
  }

  return {
    cartItems,
    itemsCount,
    subtotal,
    discountAmount,
    total,
    activeCoupon,
    checkoutError,
    checkoutSuccess,
    orderDetails,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    submitCheckout,
    loadCart,
    resetCheckout
  }
}
