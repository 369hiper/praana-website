import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ProductVariant } from '../types';

interface CartItem {
  id: string; // Unique ID for the cart item (could be a combination of product and variant IDs)
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  color?: string;
  imageUrl: string;
  stockQuantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; variant?: ProductVariant; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART'; payload?: never }
  | { type: 'CLEAR_CART'; payload?: never };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.productId === product.id && item.variantId === variant?.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: Math.min(item.quantity + quantity, item.stockQuantity) }
              : item
          ),
        };
      }

      const newItem: CartItem = {
        id: `${product.id}-${variant?.id || 'default'}`,
        productId: product.id,
        variantId: variant?.id,
        name: variant ? `${product.name} - ${variant.name}` : product.name,
        price: variant ? variant.price : product.price,
        currency: product.currency || 'USD',
        quantity: Math.min(quantity, variant ? variant.stockQuantity : product.stockQuantity || 0),
        color: variant?.color,
        imageUrl: product.imageUrl,
        stockQuantity: variant ? variant.stockQuantity : product.stockQuantity || 0,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stockQuantity)) }
            : item
        ),
      };
    }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};