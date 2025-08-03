'use client';

import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/redux/slices/cartSlice';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toast.success(`${product.title} has been added to your cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
    >
      Add to Cart
    </button>
  );
}
