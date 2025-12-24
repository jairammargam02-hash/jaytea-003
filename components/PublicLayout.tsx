
import React from 'react';
import { NAVIGATION_LINKS, BRAND_NAME } from '../constants';
import { Menu, X, Phone, Coffee, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { DataService } from '../services/dataService';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  
  // Fetch dynamic config
  const config = DataService.getConfig();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Top Bar */}
      <div className="bg-earth-900 text-earth-100 py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <span className="hidden sm:inline">Premium Tea Franchise in Telangana & Andhra Pradesh</span>
          <div className="flex gap-4">
            <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-white"><Phone size={14} /> {config.contact.phone}</a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-earth-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-800">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <Coffee size={20} />
            </div>
            {BRAND_NAME}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center font-medium text-stone-600">
            {NAVIGATION_LINKS.map(link => (
              <Link 
                key={link.href} 
                to={link.href} 
                className={`hover:text-primary-600 transition-colors ${location.pathname === link.href ? 'text-primary-600 font-bold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/franchise" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg font-bold text-sm">
              Get Franchise
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-stone-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 py-4 px-4 shadow-xl absolute w-full left-0">
            <nav className="flex flex-col gap-4">
              {NAVIGATION_LINKS.map(link => (
                <Link 
                  key={link.href} 
                  to={link.href} 
                  className="text-lg font-medium text-stone-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/franchise" 
                className="bg-primary-600 text-white text-center py-3 rounded-lg font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apply for Franchise
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-earth-900 text-earth-100 py-12 border-t-4 border-primary-500">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Coffee size={24} className="text-primary-400" /> {BRAND_NAME}
            </h3>
            <p className="text-earth-300 leading-relaxed max-w-sm">
              Bringing the authentic taste of premium tea to every corner of Telangana and Andhra Pradesh. Join our growing family of successful franchise partners.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-primary-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <p className="mb-2">📍 {config.contact.address}</p>
            <p className="mb-2">📞 {config.contact.phone}</p>
            <p className="mb-4">📧 {config.contact.email}</p>
            <div className="flex gap-2">
              <a href={`https://wa.me/${config.contact.whatsapp}`} target="_blank" rel="noreferrer" className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded text-sm font-bold transition">WhatsApp Us</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-earth-800 flex flex-col md:flex-row justify-between items-center text-earth-400 text-sm">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
             <Link to="/admin" className="flex items-center gap-1 hover:text-primary-400 transition-colors opacity-60 hover:opacity-100">
               <Lock size={12} /> Admin Login
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
