import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      cartItems: []
    }
  },
  getters: {
    cartItemsAdded(state) {
      return state.cartItems
    }
  },
  mutations: {
    addCartItem(state, cartItem) {
      const cartItemIds = state.cartItems.map(c => c.cartItemId).filter(id => typeof id === 'number')
      state.cartItems.push({
        cartItemId: cartItemIds.length > 0 ? Math.max(...cartItemIds) : 1,
        ...cartItem
      })
    },
    removeCartItem(state, index) {
      state.cartItems.splice(index, 1)
    },
    clearCart(state) {
      state.cartItems = []
    }
  },
  plugins: [createPersistedState({
    key: 'cart'
  })],
});

export default store
