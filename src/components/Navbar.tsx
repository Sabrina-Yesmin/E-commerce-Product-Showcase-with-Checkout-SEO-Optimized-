// 📁 src/components/Navbar.tsx
'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
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
  );
}