import React from 'react';
import { Link } from 'react-router-dom';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Shipping Policy</h1>
        <p className="text-slate-400 mb-8">Effective Date: 20 January 2026</p>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <p>
            <strong>Business location</strong>: Delhi, India<br />
            <strong>Shipping origin</strong>: India
          </p>

          <h3>1. Processing</h3>
          <p>
            Orders are processed after confirmation and payment completion. We will contact you for payment from our
            <strong> only official number</strong>: <strong>+91 8448913669</strong>.
          </p>
          <p>
            Once payment is received, we begin dispatch processing. Processing times can vary based on production/stock availability.
          </p>

          <h3>2. Shipping charges</h3>
          <p>
            <strong>Shipping charges are extra</strong> and are <strong>not included</strong> in the product price unless explicitly stated.
            The final shipping cost depends on destination, package weight, and carrier options.
          </p>

          <h3>3. Delivery timelines</h3>
          <p>
            Delivery timelines vary by destination and carrier. Estimated timelines will be shared with you during order confirmation.
            Delays may occur due to carrier issues, local disruptions, or customs processing.
          </p>

          <h3>4. Customs, duties, and taxes</h3>
          <p>
            For international shipments, <strong>customs duties, taxes, and import fees are not covered</strong>.
            Any such charges are the customer’s responsibility.
          </p>

          <h3>5. Tracking</h3>
          <p>
            Once shipped, we will share tracking details when available.
          </p>

          <h3>6. Damaged shipments</h3>
          <p>
            If your package appears visibly damaged at the time of delivery, please document it (photos/video) and contact us immediately.
            We will guide you through the next steps.
          </p>

          <h3>7. Contact</h3>
          <p>
            For shipping questions, contact <strong>+91 8448913669</strong>. For your safety, do not trust any other numbers claiming to represent us.
          </p>

          <div className="mt-8">
            <Link to="/" className="text-praana-accent font-semibold hover:text-teal-300">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;