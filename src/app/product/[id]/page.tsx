import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AddToCartButton from '@/components/AddToCartButton';
import { notFound } from 'next/navigation';

// Define the shape of a product to ensure type safety.
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Interface to define the component's props, which include the dynamic route parameters.
interface ProductPageProps {
  params: {
    id: string;
  };
}

// Function to fetch a single product from the API.
// It returns a Promise that resolves to a Product object or null if not found.
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      // If the response is not OK (e.g., 404), return null.
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// This function generates the metadata (title, description) for the page.
// It's a key part of Next.js for Search Engine Optimization (SEO).
export async function generateMetadata({ params }: ProductPageProps) {
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

// The main page component for displaying product details.
// The `params` prop is typed correctly using the ProductPageProps interface.
export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    // If the product is not found, render Next.js's built-in 404 page.
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

            {/* Add To Cart Button component. It assumes this component uses Redux hooks. */}
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
