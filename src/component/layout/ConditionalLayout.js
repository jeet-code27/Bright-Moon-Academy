'use client';
import { usePathname } from 'next/navigation';
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current path is admin route
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // Also check for other routes where you might not want header/footer
  const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/register');
  
  // Determine if we should show header and footer
  const showHeaderFooter = !isAdminRoute && !isAuthRoute;
  
  if (showHeaderFooter) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }
  
  // For admin and auth routes, just render children without header/footer
  return <>{children}</>;
}