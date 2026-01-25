import React, { useState } from 'react';
import { Menu, X, Activity, FileText, Shield, Home, BookOpen, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PageRoute } from '../types';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();

  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: PageRoute.HOME, icon: <Home className="w-4 h-4" /> },
    { name: 'Blog', path: PageRoute.BLOG, icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Privacy Policy', path: PageRoute.PRIVACY_POLICY, icon: <Shield className="w-4 h-4" /> },
    { name: 'EULA', path: PageRoute.EULA, icon: <FileText className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-praana-dark/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to={PageRoute.HOME} className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-praana-accent" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-wide text-white leading-none">
                  PRAANA<span className="text-praana-accent">.</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">Coil Technology</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive(link.path)
                    ? 'text-praana-accent'
                    : 'text-slate-300 hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="#products" className="bg-white text-praana-dark hover:bg-slate-200 px-5 py-2.5 rounded-full text-sm font-bold transition-all">
                Order Now
              </a>
              <Link to="/checkout" className="text-slate-300 hover:text-white transition-colors relative">
                <div className="bg-slate-800 p-2.5 rounded-full hover:bg-slate-700 transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-praana-accent text-praana-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-900">
                      {cartItemsCount}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="block w-6 h-6" /> : <Menu className="block w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 block px-3 py-3 rounded-md text-base font-medium ${isActive(link.path)
                  ? 'bg-slate-800 text-praana-accent'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;