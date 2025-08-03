// 📁 src/app/cart/page.tsx

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { removeItem, clearCart } from '@/lib/redux/slices/cartSlice';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <div className="w-24 h-24 relative mr-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-green-600 font-bold text-md">${item.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center bg-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-gray-900">
                Total: <span className="text-green-600">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}