import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import CheckoutHeader from '../components/CheckoutHeader';
import { CartProvider } from '../contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Afrekenen - 123noodklaar.nl',
  description: 'Veilig afrekenen bij 123noodklaar.nl',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-off-white`}>
      <CartProvider>
        <CheckoutHeader />
        <main className="flex-grow">
          {children}
        </main>
      </CartProvider>
    </div>
  );
}