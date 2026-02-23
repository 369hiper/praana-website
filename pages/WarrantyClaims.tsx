import React from 'react';

const WarrantyClaims: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Warranty Claims</h1>
        <p className="text-slate-400 mb-8">Effective Date: 20 January 2026</p>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <h3>1. Official contact (anti-scam notice)</h3>
          <p>
            Our <strong>only official phone number</strong> is <strong>+91 8448913669</strong>. We do not authorize any other numbers.
            If anyone asks you to send money, share OTPs, or ship your device based on another number, do not proceed.
          </p>

          <h3>2. What to send (to start a claim)</h3>
          <ul>
            <li>Your full name</li>
            <li>Order details (order ID / invoice / proof of purchase)</li>
            <li>Device model (Mini / Core / Pro) and serial number (if available)</li>
            <li>A clear description of the issue</li>
            <li>Photos/videos showing the problem</li>
            <li>Your shipping address (Delhi/India and international both supported)</li>
          </ul>

          <h3>3. How claims are handled</h3>
          <p>
            Warranty claims are subject to inspection and verification of the reported issue. Coverage does not include physical damage,
            broken units, or liquid/water damage. If repair is possible but not covered under warranty, we may offer repair at extra charges.
            If repair is not possible after inspection, we may offer a <strong>5% cashback credit</strong> toward a new replacement purchase.
          </p>

          <h3>4. Safety & liability</h3>
          <p>
            You are responsible for safe use, handling, storage, and operation of the product. To the maximum extent permitted by law, we do not accept any
            loss, damages, or liability arising from the use or misuse of the product or software, including but not limited to fire, overheating,
            burns, property damage, health impacts, or consequential damages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarrantyClaims;

