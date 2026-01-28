import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Terms and Conditions</h1>
        <p className="text-slate-400 mb-8">Effective Date: 20 January 2026</p>

        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <p>
            Welcome to Praana Coil ("Company", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your use of our website located at praanacoil.com (the "Site") and your purchase and use of our PEMF (Pulsed Electromagnetic Field) wellness devices (the "Products"). By accessing the Site or purchasing our Products, you agree to be bound by these Terms.
          </p>

          <p>
            <strong>Business Location</strong>: Delhi, India<br />
            <strong>Official Support Number</strong>: <strong>+91 8448913669</strong>
          </p>

          <h3>1. Product Description and Intended Use</h3>
          <p>
            Praana Coil manufactures and sells PEMF (Pulsed Electromagnetic Field) wellness devices designed for general wellness purposes. Our Products are intended to promote relaxation and general well-being through the application of pulsed electromagnetic fields.
          </p>
          <p>
            <strong>IMPORTANT DISCLAIMER:</strong> Our Products are <strong>NOT</strong> approved by the U.S. Food and Drug Administration (FDA) or any other regulatory body for the diagnosis, treatment, cure, mitigation, or prevention of any disease or medical condition. Our Products are not medical devices and should not be used as substitutes for professional medical advice, diagnosis, or treatment.
          </p>

          <h3>2. No Medical Claims</h3>
          <p>
            We make no medical claims regarding the efficacy of our Products. Any statements made on our Site or in our marketing materials regarding the benefits of PEMF technology are for informational purposes only and are not intended to imply that our Products can diagnose, treat, cure, or prevent any disease or health condition.
          </p>
          <p>
            You acknowledge and agree that:
          </p>
          <ul>
            <li>Our Products are wellness devices, not medical devices.</li>
            <li>Our Products have not been evaluated or approved by the FDA or any equivalent regulatory authority.</li>
            <li>Any health-related claims or testimonials are anecdotal and do not constitute scientific evidence.</li>
            <li>You should consult with a qualified healthcare professional before using our Products, especially if you have any pre-existing medical conditions.</li>
          </ul>

          <h3>3. Assumption of Risk</h3>
          <p>
            By purchasing and using our Products, you expressly acknowledge and assume all risks associated with the use of PEMF technology. You understand that:
          </p>
          <ul>
            <li>The long-term effects of PEMF exposure are not fully understood.</li>
            <li>Individual responses to PEMF therapy may vary.</li>
            <li>Our Products may not produce any noticeable effects for some users.</li>
            <li>You are solely responsible for determining whether our Products are suitable for your particular needs.</li>
          </ul>

          <h3>4. Contraindications and Safety Warnings</h3>
          <p>
            Our Products should <strong>NOT</strong> be used by individuals who:
          </p>
          <ul>
            <li>Have an implanted electronic device such as a pacemaker, defibrillator, insulin pump, or cochlear implant.</li>
            <li>Are pregnant or may be pregnant.</li>
            <li>Have active bleeding or hemorrhaging conditions.</li>
            <li>Have a history of seizures or epilepsy without medical clearance.</li>
            <li>Are undergoing treatment with immunosuppressive drugs following organ transplantation.</li>
          </ul>
          <p>
            <strong>Always consult your physician before using our Products if you have any medical condition or concern.</strong>
          </p>

          <h3>5. Heat, Placement, and Fire Safety</h3>
          <p>
            Our devices may generate heat during operation. By using our Products, you agree to follow all safety guidelines and assume full responsibility for safe placement, supervision, and operation.
          </p>
          <ul>
            <li>
              <strong>Do not use near flammable or combustible materials</strong> including but not limited to fuels, aerosols, solvents, curtains, paper, bedding, or any easily ignitable items.
            </li>
            <li>
              For extended use sessions, we recommend operating the device at <strong>50% power</strong> to ensure stable operation and reduce the risk of overheating.
            </li>
            <li>
              Place the device on a <strong>stable, heat-resistant surface</strong> such as a floor or wooden table. Do not place on plastic, fabric, or surfaces that may be damaged by heat.
            </li>
            <li>
              Do not cover the device during operation. Ensure adequate ventilation at all times.
            </li>
            <li>
              Never leave the device unattended during operation.
            </li>
          </ul>
          <p>
            While our software includes protective measures such as automatic power cut-off when temperatures exceed safe thresholds, these safety features do not eliminate all risks. You remain fully responsible for monitoring the device and ensuring safe use at all times.
          </p>

          <h3>6. Warranty Policy</h3>
          <p>
            We provide a <strong>1-year limited warranty</strong> from the date of purchase covering manufacturing defects and functional failures under normal use, subject to inspection and verification.
          </p>
          <p><strong>What is Covered:</strong></p>
          <ul>
            <li>Manufacturing defects in materials and workmanship.</li>
            <li>Functional failures occurring under normal, intended use.</li>
          </ul>
          <p><strong>What is NOT Covered:</strong></p>
          <ul>
            <li>Physical damage including cracks, breaks, dents, or cosmetic damage.</li>
            <li>Liquid or water damage.</li>
            <li>Damage resulting from misuse, abuse, or negligence.</li>
            <li>Damage caused by unauthorized repairs, modifications, or tampering.</li>
            <li>Damage resulting from accidents or improper handling.</li>
            <li>Normal wear and tear.</li>
          </ul>
          <p>
            If your device requires repair for an issue not covered under warranty, repair services may be available at additional cost following inspection. If repair is not possible, we may offer a <strong>5% credit</strong> towards the purchase of a replacement unit.
          </p>

          <h3>7. Return and Refund Policy</h3>
          <p>
            <strong>All sales are final. We do not accept returns under any circumstances.</strong>
          </p>
          <p>
            If you receive a defective product or experience issues with your device, please contact us within 7 days of receipt. We will work with you to resolve the issue under our warranty terms, which may include repair or replacement at our sole discretion.
          </p>

          <h3>8. Limitation of Liability</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
          </p>
          <ul>
            <li>
              IN NO EVENT SHALL THE COMPANY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PRODUCTS.
            </li>
            <li>
              THE COMPANY SHALL NOT BE LIABLE FOR ANY PERSONAL INJURY, PROPERTY DAMAGE, FIRE, BURNS, HEALTH IMPACTS, OR ANY OTHER DAMAGES ARISING FROM THE USE OR MISUSE OF OUR PRODUCTS.
            </li>
            <li>
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR YOUR USE OF THE PRODUCTS SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE PRODUCT.
            </li>
          </ul>

          <h3>9. Indemnification</h3>
          <p>
            You agree to defend, indemnify, and hold harmless the Company and its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Products.
          </p>

          <h3>10. Intellectual Property</h3>
          <p>
            All content on our Site, including text, graphics, logos, images, and software, is the property of Praana Coil or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
          </p>

          <h3>11. Privacy</h3>
          <p>
            Your use of our Site and Products is also governed by our <Link to="/privacy-policy" className="text-praana-accent font-semibold hover:text-teal-300">Privacy Policy</Link>, which is incorporated into these Terms by reference.
          </p>

          <h3>12. Governing Law and Jurisdiction</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Delhi, India.
          </p>

          <h3>13. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site or Products following the posting of revised Terms constitutes your acceptance of such changes.
          </p>

          <h3>14. Severability</h3>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
          </p>

          <h3>15. Warranty Claims</h3>
          <p>
            To initiate a warranty claim, visit <Link to="/warranty-claims" className="text-praana-accent font-semibold hover:text-teal-300">/warranty-claims</Link> or contact <strong>+91 8448913669</strong>.
          </p>

          <h3>16. Contact Information</h3>
          <p>
            For warranty claims, technical support, or any questions regarding these Terms, please contact us:
          </p>
          <ul>
            <li><strong>Phone</strong>: +91 8448913669</li>
            <li><strong>Location</strong>: Delhi, India</li>
          </ul>
          <p>
            <strong>Anti-Fraud Notice:</strong> This is our only official contact number. Do not send money to anyone using a different number or claiming to represent Praana Coil.
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

export default TermsAndConditions;
