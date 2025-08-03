import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AddToCartButton from '@/components/AddToCartButton';
import { notFound } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.'
    };
  }
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-10 rounded-2xl shadow-xl transition-transform hover:scale-[1.02] duration-300">
          <article className="flex justify-center items-center">
            <Image
              src={product.image}
              alt={product.title}
              width={450}
              height={400}
              className="object-contain h-[400px] rounded-lg drop-shadow-lg"
              priority
            />
          </article>

          <article className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide leading-tight">
              {product.title}
            </h1>

            <p className="text-3xl font-extrabold text-green-700">${product.price.toFixed(2)}</p>

            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

            <p className="text-gray-500 text-sm italic">
              <span className="font-semibold">Category:</span> {product.category}
            </p>

            {/* Add To Cart Button */}
            <AddToCartButton
              product={product}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
            />
          </article>
        </section>
      </main>
    </>
  );
}
