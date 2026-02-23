import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Contact Us</h1>
        <p className="text-slate-400 mb-8">Get in touch with the Praana Coil team</p>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <p>
            We're here to help! Whether you have questions about our products, need technical support, or want to initiate a warranty claim, our team is ready to assist you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Phone Support</h3>
              <p className="text-2xl font-bold text-praana-accent mb-2">+91 8448913669</p>
              <p className="text-slate-400 text-sm">
                This is our official and only contact number. Our support team is available to assist you with product inquiries, technical support, and warranty claims.
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Office Address</h3>
              <p className="text-lg text-white mb-2">Bioveda Wellness LLP</p>
              <p className="text-slate-400">
                129 Vinoba Puri, Lajpat Nagar -2<br />
                New Delhi - 110024
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.246623%2C28.565149%2C77.250623%2C28.569149&amp;layer=mapnik&amp;marker=28.567149%2C77.248623"
              style={{ border: 0 }}
              loading="lazy"
              title="Office Location"
              aria-label="Bioveda Wellness LLP Office Location on OpenStreetMap"
            />
            <div className="bg-slate-800 py-2 px-4 text-xs text-center border-t border-slate-700">
              <a href="https://www.openstreetmap.org/?mlat=28.567149&amp;mlon=77.248623#map=19/28.567149/77.248623" target="_blank" rel="noopener noreferrer" className="text-praana-accent hover:underline">
                View larger map
              </a>
            </div>
          </div>

          <div className="mt-8 bg-amber-900/30 border border-amber-700/50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-amber-400 mb-3">Anti-Fraud Notice</h3>
            <p className="text-amber-200/80">
              <strong>+91 8448913669</strong> is our only official support number. Please be cautious of fraudulent calls or messages from individuals claiming to represent Praana Coil using different numbers.
            </p>
            <ul className="mt-4 text-amber-200/80">
              <li>Never share payment details with anyone claiming to be from Praana Coil unless you initiated the call to our official number.</li>
              <li>We will never ask for your bank passwords or OTPs.</li>
              <li>Report suspicious activity to our official number immediately.</li>
            </ul>
          </div>

          <h3>Support Hours</h3>
          <p>
            Our support team is available during regular business hours (IST). We strive to respond to all inquiries within 24-48 hours.
          </p>

          <h3>Warranty Claims</h3>
          <p>
            For warranty-related issues, please visit our dedicated <Link to="/warranty-claims" className="text-praana-accent font-semibold hover:text-teal-300">Warranty Claims</Link> page or call our support number with your order details and a description of the issue.
          </p>

          <h3>General Inquiries</h3>
          <p>
            For product information, pricing, or general questions about PEMF technology and our devices, feel free to reach out via phone. Our team will be happy to help you understand which Praana Coil product is right for your wellness journey.
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

export default ContactUs;
