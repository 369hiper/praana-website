import React from 'react';

const PaymentRefundPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Payment, Refund & No-Return Policy</h1>
        <p className="text-slate-400 mb-8">Effective Date: 20 January 2026</p>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <h3>1. Business details</h3>
          <p>
            <strong>Business location</strong>: Delhi, India<br />
            <strong>Shipping origin</strong>: India
          </p>

          <h3>2. Official contact (anti-scam notice)</h3>
          <p>
            Our <strong>only official phone number</strong> is <strong>+91 8448913669</strong>.
            We do not authorize any other numbers. Please be cautious of impersonators. If anyone claims to represent us
            and asks for payment from a different number, treat it as suspicious.
          </p>

          <h3>3. Payment process</h3>
          <p>
            After you place an order / request, our team will review and confirm your order details. Once confirmed, we
            will contact you to arrange payment via our <strong>official payment accounts</strong>.
          </p>
          <p>
            <strong>Supported payment methods</strong> (as available): Rise / Xoom / PayPal.
            Payment instructions will be shared with you directly from our official number above.
          </p>

          <h3>4. No returns (strict)</h3>
          <p>
            <strong>We do not accept returns in any cases.</strong> Please review product details carefully before
            confirming payment.
          </p>

          <h3>5. Refund policy</h3>
          <p>
            Because payment is collected after order confirmation, refunds are generally not applicable once an order is
            processed. However, if payment has been made and we are <strong>unable to fulfill</strong> the confirmed order
            (e.g., stock or operational constraints), we will issue a refund to the same payment method/account where feasible,
            subject to any processing fees charged by third-party payment providers.
          </p>

          <h3>6. Warranty (1 year limited)</h3>
          <p>
            We provide a <strong>1-year limited warranty</strong> on Praana Coil products for manufacturing defects and
            issues that arise under normal use, subject to inspection and verification of the issue.
          </p>
          <ul>
            <li><strong>Covered</strong>: manufacturing defects, functional failure under normal use (subject to inspection).</li>
            <li>
              <strong>Not covered</strong>: physical damage, broken units, liquid/water damage, misuse, unauthorized repairs/modifications,
              and damage due to accidents or improper handling.
            </li>
            <li>
              <strong>Repair</strong>: If a unit is physically damaged or liquid-damaged, it is not covered under warranty.
              Repair may be possible at an additional cost after inspection.
            </li>
            <li>
              <strong>If not repairable</strong>: If we determine repair is not possible upon inspection, we may offer a
              <strong> 5% cashback credit</strong> on a new replacement purchase as a buyback/royalty credit.
            </li>
          </ul>

          <h3>7. Limitation of liability & medical disclaimer</h3>
          <p>
            PEMF technology has been approved by the FDA for certain use cases; however, research is ongoing and outcomes
            vary between individuals. Our products are intended for general wellness and personal use.
          </p>
          <p>
            To the maximum extent permitted by law, we are <strong>not responsible for any loss or liability</strong> relating to
            property, health, or any other damages arising from use or misuse of the products.
          </p>
          <p>
            If you are pregnant, have a pacemaker/implant, or have any medical condition, consult a qualified medical professional
            before use.
          </p>

          <h3>8. Support</h3>
          <p>
            For support, warranty claims, or order/payment verification, contact us at <strong>+91 8448913669</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentRefundPolicy;

