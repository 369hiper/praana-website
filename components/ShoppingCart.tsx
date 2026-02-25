import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const ShoppingCartComponent: React.FC = () => {
  const { state, dispatch } = useCart();

  const closeCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get the currency from the first item (assuming all items have same currency)
  const getCurrency = () => {
    return state.items.length > 0 ? state.items[0].currency : 'USD';
  };

  const getTotalCurrency = () => {
    // Use the currency of the first item, or default to USD
    return state.items.length > 0 ? state.items[0].currency : 'USD';
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity ${state.isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeCart}
      ></div>

      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${state.isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Cart ({getTotalItems()})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingCart className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Your cart is empty</h3>
                <p className="text-slate-500">Add some products to your cart</p>
              </div>
            ) : (
              <div className="space-y-6">
                {state.items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-slate-900">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {item.color && (
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-4 h-4 rounded-full border border-slate-300"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm text-slate-500">Color</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-300 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-lg hover:bg-slate-100 rounded-l-full"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-lg hover:bg-slate-100 rounded-r-full"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          {/* <div className="font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                          <div className="text-xs text-slate-500">${item.price.toFixed(2)} each</div> */}
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-slate-500 mt-1">
                        <Package className="w-3 h-3 mr-1" />
                        <span>In Stock: {item.stockQuantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                {/* <span>{formatPrice(getTotalPrice(), getCurrency())}</span> */}
              </div>

              <a
                href="/checkout"
                className="block w-full bg-slate-900 text-white text-center py-4 rounded-full font-bold hover:bg-slate-800 transition-colors"
              >
                Proceed to Checkout
              </a>

              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full mt-4 text-slate-500 hover:text-slate-700 font-medium"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;