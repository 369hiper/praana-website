import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Effective Date: 20 January 2026</p>
        
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <p>
            This Privacy Policy explains how Praana Coil (Delhi, India) collects, uses, and protects information when you visit our website
            or interact with our services. If you do not agree with this Policy, please do not use the site.
          </p>

          <h3>1. Information we collect</h3>
          <ul>
            <li>
              <strong>Information you provide</strong>: name, phone number, address, and order-related details you share during order inquiry/confirmation.
            </li>
            <li>
              <strong>Usage information</strong>: basic analytics such as pages visited, device/browser type, and approximate location (city/region).
            </li>
            <li>
              <strong>Cookies</strong>: we may use cookies or similar technologies to improve site functionality and measure performance.
            </li>
          </ul>

          <h3>2. How we use information</h3>
          <ul>
            <li>To respond to your inquiries and confirm orders</li>
            <li>To provide shipping and support updates</li>
            <li>To improve our website, content, and user experience</li>
            <li>To prevent fraud, abuse, or unauthorized activity</li>
          </ul>

          <h3>3. Sharing of information</h3>
          <p>
            We do not sell your personal information. We may share limited information with service providers only as needed to:
            (a) deliver shipments (couriers/logistics), (b) operate the website, or (c) comply with legal obligations.
          </p>

          <h3>4. Payments</h3>
          <p>
            Payment is arranged through official payment channels shared by our team after order confirmation. We do not store your complete payment credentials on this site.
          </p>

          <h3>5. Data retention</h3>
          <p>
            We retain personal information only as long as necessary for order fulfillment, support, legal compliance, and legitimate business purposes.
          </p>

          <h3>6. Security</h3>
          <p>
            We use reasonable safeguards to protect information. However, no method of transmission or storage is 100% secure.
          </p>

          <h3>7. Your choices</h3>
          <p>
            You may request access, correction, or deletion of your information where applicable. To make a request, contact us at our official number:
            <strong> +91 8448913669</strong>.
          </p>

          <h3>8. Children’s privacy</h3>
          <p>
            Our site is not intended for children under 13 (or the applicable age in your jurisdiction). We do not knowingly collect data from children.
          </p>

          <h3>9. Changes to this Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. The “Effective Date” above indicates the latest revision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;