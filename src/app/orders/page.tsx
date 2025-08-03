'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useState } from 'react';

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.order.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          🛍️ ShopEase
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300 transition">Home</Link>
          <Link href="/cart" className="hover:text-gray-300 transition">Cart</Link>
          <Link href="/orders" className="hover:text-gray-300 transition">Orders</Link>
        </div>
      </div>
    </nav>
      {/* Orders List */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📦 My Orders</h1>

        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
          <table className="min-w-full text-sm text-left text-gray-700 bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 border">Order ID</th>
                <th className="px-6 py-4 border">Customer</th>
                <th className="px-6 py-4 border">Items</th>
                <th className="px-6 py-4 border">Amount</th>
                <th className="px-6 py-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 border">{order.id}</td>
                    <td className="px-6 py-4 border">{order.fullName}</td>
                    <td className="px-6 py-4 border">{order.items.length}</td>
                    <td className="px-6 py-4 border font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 border text-sm text-gray-500">
                      {new Date(order.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Order Details */}
        {selectedOrder && (
          <div className="mt-10 p-6 bg-white rounded-xl shadow-md ring-1 ring-gray-200 animate-fadeIn">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <p><span className="font-semibold">Order ID:</span> {selectedOrder.id}</p>
              <p><span className="font-semibold">Customer:</span> {selectedOrder.fullName}</p>
              <p><span className="font-semibold">Phone:</span> {selectedOrder.phoneNumber}</p>
              <p><span className="font-semibold">Address:</span> {selectedOrder.shippingAddress}</p>
              <p><span className="font-semibold">Total Items:</span> {selectedOrder.items.length}</p>
              <p><span className="font-semibold">Total:</span> ${selectedOrder.total.toFixed(2)}</p>
              <p><span className="font-semibold">Date:</span> {new Date(selectedOrder.timestamp).toLocaleString()}</p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-700">🧾 Items:</h3>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} — ${item.price} × {item.quantity}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded transition"
            >
              Close Details
            </button>
          </div>
        )}
      </main>
    </>
  );
}
