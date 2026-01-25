import React from 'react';
import { Link } from 'react-router-dom';

const ProductPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Product, Warranty & Safety Policy</h1>
        <p className="text-slate-400 mb-8">Effective Date: 20 January 2026</p>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <p>
            <strong>Business location</strong>: Delhi, India<br />
            <strong>Official support number</strong>: <strong>+91 8448913669</strong>
          </p>

          <h3>1. Warranty (1 year limited)</h3>
          <p>
            We provide a <strong>1-year limited warranty</strong> covering manufacturing defects and issues that arise under normal use,
            subject to inspection and verification.
          </p>
          <ul>
            <li><strong>Covered</strong>: manufacturing defects, functional failure under normal use (subject to inspection).</li>
            <li>
              <strong>Not covered</strong>: physical damage, broken units, liquid/water damage, misuse, unauthorized repairs/modifications,
              and damage due to accidents or improper handling.
            </li>
            <li>
              <strong>Physical damage</strong> is not covered under warranty. If the device is broken, it is not covered under warranty.
            </li>
            <li>
              <strong>Liquid damage</strong> is not covered under warranty.
            </li>
            <li>
              <strong>Repair</strong>: If the issue is not warranty-covered, repair may be possible at additional charges after inspection.
            </li>
            <li>
              <strong>If not repairable</strong>: If repair is not possible after inspection, we may offer a <strong>5% cashback credit</strong> on a new replacement purchase as a buyback/royalty credit.
            </li>
          </ul>

          <h3>2. No returns</h3>
          <p>
            <strong>We do not accept returns in any cases.</strong> If there is an issue with the product, we take complete responsibility to help resolve it under the warranty/support terms described above (subject to inspection and exclusions).
          </p>

          <h3>3. Medical and research disclaimer</h3>
          <p>
            PEMF technology has been approved by the FDA for certain use cases, and research continues in additional areas.
            Our products are intended for general wellness and personal use and are <strong>not</strong> intended to diagnose, treat, cure, or prevent any disease.
            Always consult a qualified healthcare professional before use, especially if you are pregnant, have an implanted electronic device (e.g., pacemaker), or have a medical condition.
          </p>

          <h3>4. Safety guidelines</h3>
          <ul>
            <li>Do not use if you have a pacemaker/ICD or other implanted electronic device unless cleared by a clinician.</li>
            <li>Consult a physician before use if you are pregnant or have serious medical conditions.</li>
            <li>Keep away from children and pets. Use only as directed.</li>
            <li>Avoid use near water; do not expose the device to liquid.</li>
            <li>Stop use if you experience discomfort and consult a professional.</li>
          </ul>

          <h3>5. Heat, placement, and fire safety</h3>
          <p>
            The device may generate heat during operation. You agree to follow safe-use practices and you assume all responsibility
            for safe placement, supervision, and operation.
          </p>
          <ul>
            <li>
              <strong>Do not use near flammable or combustible materials</strong> (including but not limited to fuels, aerosols,
              solvents, curtains, paper piles, bedding, or any easily burnable items).
            </li>
            <li>
              For long-duration use, it is <strong>recommended to operate at 50% power</strong> to support safe, stable operation and
              reduce the risk of product stress or damage.
            </li>
            <li>
              Place the device on a <strong>stable ground/floor or wooden surface</strong> that cannot be easily damaged by heat.
              Do not place on delicate surfaces, plastic, or surfaces that may warp/discolor.
            </li>
            <li>
              Do not cover the device. Ensure adequate ventilation. Keep the unit away from direct contact with fabrics and soft materials.
            </li>
          </ul>
          <p>
            The software may include protective measures designed to reduce risk (including automatic power cut-off if temperature rises too high).
            However, these measures do not eliminate risk. You remain responsible for monitoring and safe use at all times.
          </p>

          <h3>6. Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, we do not accept any loss, damages, or liability arising from use or misuse of the product or software,
            including but not limited to property damage, overheating, fire, burns, health impacts, or any consequential damages. You are responsible for
            safe use, safe placement, and supervision during operation.
          </p>

          <h3>7. Warranty claims</h3>
          <p>
            To initiate a warranty claim, visit <Link to="/warranty-claims" className="text-praana-accent font-semibold hover:text-teal-300">/warranty-claims</Link>
            or contact <strong>+91 8448913669</strong>.
          </p>

          <h3>8. Contact</h3>
          <p>
            For warranty claims or technical support, contact <strong>+91 8448913669</strong>. We do not authorize any other support numbers.
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

export default ProductPolicy;