import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-4">
        Your order has been placed successfully.
      </p>
      <Link href="/" className="text-green-600 underline">
        Continue Shopping
      </Link>
    </div>
  );
}
