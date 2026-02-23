import React from 'react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="font-display font-bold text-2xl text-white block mb-4">PRAANA.</span>
            <p className="mb-6 leading-relaxed">Advancing human potential through electromagnetic harmony. Built for the future of wellness.</p>
            <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center hover:bg-praana-primary hover:text-white transition-colors cursor-pointer">fb</div>
                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center hover:bg-praana-primary hover:text-white transition-colors cursor-pointer">in</div>
                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center hover:bg-praana-primary hover:text-white transition-colors cursor-pointer">tw</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Products</h4>
            <ul className="space-y-3">
              <li><Link to={PageRoute.MINI_VORTEX} className="hover:text-praana-accent transition-colors">Mini Vortex (5cm)</Link></li>
              <li><Link to={PageRoute.CORE_VORTEX} className="hover:text-praana-accent transition-colors">Core Vortex (15cm)</Link></li>
              <li><Link to={PageRoute.PRO_VORTEX} className="hover:text-praana-accent transition-colors">Pro Vortex (25cm)</Link></li>
              <li><a href="#" className="hover:text-praana-accent transition-colors">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><Link to={PageRoute.SHIPPING_POLICY} className="hover:text-praana-accent transition-colors">Shipping Policy</Link></li>
              <li><Link to={PageRoute.PAYMENT_REFUND_POLICY} className="hover:text-praana-accent transition-colors">Payment & Refund Policy</Link></li>
              <li><Link to={PageRoute.TERMS_AND_CONDITIONS} className="hover:text-praana-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link to={PageRoute.WARRANTY_CLAIMS} className="hover:text-praana-accent transition-colors">Warranty Claims</Link></li>
              <li><Link to={PageRoute.PRIVACY_POLICY} className="hover:text-praana-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to={PageRoute.EULA} className="hover:text-praana-accent transition-colors">EULA</Link></li>
              <li><Link to={PageRoute.CONTACT_US} className="hover:text-praana-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Contact</h4>
            <p className="mb-4"><span className="text-slate-300 font-semibold">Official:</span> +91 8448913669</p>
            <p className="mb-4 text-xs text-slate-500">
              Anti-scam notice: This is our only official number. Do not send money to anyone using another number or claiming to “represent” us.
            </p>
            <p className="text-slate-600 text-xs">
                Praana HQ<br/>
                Delhi, India
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-900 text-center">
          <p>&copy; {new Date().getFullYear()} Praana Coil Technology. All rights reserved.</p>
          <p className="mt-4 text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Disclaimer: The Praana Coil is a wellness device and is not intended to diagnose, treat, cure, or prevent any disease. 
            Information on this site is not a substitute for professional medical advice. Consult a healthcare provider before use, 
            especially if you have a pacemaker or are pregnant.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;