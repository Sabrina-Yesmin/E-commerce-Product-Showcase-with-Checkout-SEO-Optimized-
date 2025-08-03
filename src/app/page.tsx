'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

export default function Home() {
const someFunction = (data: Product[]) => { ... }
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // 
      const resProducts = await fetch('https://fakestoreapi.com/products');
      const productsData = await resProducts.json();

      // 
      const resCategories = await fetch('https://fakestoreapi.com/products/categories');
      const categoriesData = await resCategories.json();

      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    }
    fetchData();
  }, []);

  // product list
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Our Products
        </h1>

        {/* select category */}
        <section className="mb-8 flex justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </section>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-700">No products found.</p>
        ) : (
          <section
            aria-label="Product List"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-xl transition duration-300"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={250}
                  height={250}
                  className="object-contain mx-auto mb-6 h-[250px]"
                  priority
                />
                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 h-[48px]">
                  {product.title}
                </h2>
                <p className="text-green-600 font-bold text-xl mb-4">${product.price}</p>
                <Link
                  href={`/product/${product.id}`}
                  className="mt-auto inline-block text-white bg-green-600 hover:bg-green-700 font-semibold py-3 rounded-lg text-center transition"
                  aria-label={`View details of ${product.title}`}
                >
                  View Details →
                </Link>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
