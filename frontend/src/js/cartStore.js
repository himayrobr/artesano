import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item._id === product._id);
        
        let updatedItems;
        if (existingItem) {
          updatedItems = state.items.map(item =>
            item._id === product._id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        } else {
          updatedItems = [...state.items, { ...product, cantidad: 1 }];
        }

        const newTotal = updatedItems.reduce(
          (sum, item) => sum + (item.precio * item.cantidad), 
          0
        );

        return {
          items: updatedItems,
          total: newTotal
        };
      }),

      removeItem: (productId) => set((state) => {
        const updatedItems = state.items.filter(item => item._id !== productId);
        const newTotal = updatedItems.reduce(
          (sum, item) => sum + (item.precio * item.cantidad), 
          0
        );

        return {
          items: updatedItems,
          total: newTotal
        };
      }),

      updateQuantity: (productId, newQuantity) => set((state) => {
        if (newQuantity < 1) return state;

        const updatedItems = state.items.map(item =>
          item._id === productId
            ? { ...item, cantidad: newQuantity }
            : item
        );

        const newTotal = updatedItems.reduce(
          (sum, item) => sum + (item.precio * item.cantidad), 
          0
        );

        return {
          items: updatedItems,
          total: newTotal
        };
      }),

      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCartStore;