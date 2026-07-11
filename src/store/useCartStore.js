import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId)
      })),
      
      updateQuantity: (productId, newQuantity) => set((state) => {
        if (newQuantity < 1) return state;
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        };
      }),
      
      clearCart: () => set({ cartItems: [] }),
      
      getCartTotal: () => get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      
      getCartCount: () => get().cartItems.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'ctrl_eat_cart', // persist to local storage
    }
  )
);

export default useCartStore;
