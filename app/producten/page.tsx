import { redirect } from 'next/navigation';

export default function ProductsPage() {
  // Redirect old products page to new catalog page
  redirect('/noodpakketten');
}