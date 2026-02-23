import React from 'react';

const WebPrivacy: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Website Privacy Policy</h1>
      <div className="prose prose-invert prose-slate">
        <p className="text-slate-300 mb-4">Last Updated: October 2025</p>
        
        <h2 className="text-xl font-bold text-white mt-6 mb-2">1. Introduction</h2>
        <p className="text-slate-400 mb-4">
          Praana Coil ("we", "our", or "us") respects your privacy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit the website www.praanacoil.com.
        </p>

        <h2 className="text-xl font-bold text-white mt-6 mb-2">2. Information We Collect</h2>
        <ul className="list-disc pl-5 text-slate-400 mb-4 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, shipping address, and payment information when you purchase a device.</li>
            <li><strong>Usage Data:</strong> Information on how you access and use the website (IP address, browser type).</li>
            <li><strong>Cookies:</strong> We use cookies to enhance user experience and analyze traffic.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-6 mb-2">3. How We Use Your Information</h2>
        <p className="text-slate-400 mb-4">
           We use your data to process orders, improve our website, and communicate with you regarding your Praana Coil device.
        </p>

        <h2 className="text-xl font-bold text-white mt-6 mb-2">4. Data Security</h2>
        <p className="text-slate-400 mb-4">
            We implement security measures designed to protect your personal information from accidental loss and from unauthorized access.
        </p>
        
        <h2 className="text-xl font-bold text-white mt-6 mb-2">5. Contact Us</h2>
        <p className="text-slate-400 mb-4">
            For questions about this policy, please contact privacy@praanacoil.com.
        </p>
      </div>
    </div>
  );
};

export default WebPrivacy;