// 📁 src/components/CheckoutForm.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { addOrder } from '@/lib/redux/slices/orderSlice';
import { clearCart } from '@/lib/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    fullName: '',
    shippingAddress: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    shippingAddress: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: '', shippingAddress: '', phoneNumber: '' };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
      isValid = false;
    }
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = 'Shipping Address is required.';
      isValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone Number must be exactly 10 digits.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const order = {
        id: Date.now().toString(),
        ...formData,
        items: cartItems,
        total: cartTotal,
        timestamp: new Date().toISOString(),
      };

      dispatch(addOrder(order));
      dispatch(clearCart());
      
      router.push('/thank-you');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            🛍️ ShopEase
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/cart" className="hover:text-gray-300 transition">
              Cart
            </Link>
            <Link href="/orders" className="hover:text-gray-300 transition">
              Orders
            </Link>
          </div>
        </div>
      </nav>

      {/* Checkout Form */}
      <div className="max-w-md mx-auto mt-12 mb-20 bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-3">
          Shipping Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
              placeholder="Your full name"
              autoComplete="name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500 font-semibold">
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="shippingAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shipping Address
            </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.shippingAddress ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
              placeholder="1234 Main St, City, State"
              autoComplete="shipping address-line1"
            />
            {errors.shippingAddress && (
              <p className="mt-1 text-sm text-red-500 font-semibold">
                {errors.shippingAddress}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
              placeholder="e.g. 0123456789"
              autoComplete="tel"
              maxLength={10}
              pattern="\d{10}"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500 font-semibold">
                {errors.phoneNumber}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-extrabold py-4 rounded-xl shadow-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            Place Order - ${cartTotal.toFixed(2)}
          </button>
        </form>
      </div>
    </>
  );
}
