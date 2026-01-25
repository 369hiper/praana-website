import React from 'react';

const AppPrivacy: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Mobile App Privacy Policy</h1>
      <div className="prose prose-invert prose-slate">
        <p className="text-slate-300 mb-4">Last Updated: October 2025</p>
        
        <h2 className="text-xl font-bold text-white mt-6 mb-2">1. Overview</h2>
        <p className="text-slate-400 mb-4">
          This policy applies to the Praana Companion Mobile Application (iOS and Android). We value the trust you place in us when using our PEMF control software.
        </p>

        <h2 className="text-xl font-bold text-white mt-6 mb-2">2. Permissions & Data Access</h2>
        <ul className="list-disc pl-5 text-slate-400 mb-4 space-y-2">
            <li><strong>Bluetooth:</strong> Used to connect to your Praana Coil device to transmit frequency protocols. We do not track your location via Bluetooth.</li>
            <li><strong>Notifications:</strong> Used to alert you when a healing session is complete.</li>
            <li><strong>Camera (Optional):</strong> Used only if you wish to scan a QR code to register your device warranty.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-6 mb-2">3. Health Data</h2>
        <p className="text-slate-400 mb-4">
           The app may store session logs (duration, frequency used). This data is stored locally on your device unless you opt-in to Cloud Sync. We do not sell your health usage data to third parties.
        </p>

        <h2 className="text-xl font-bold text-white mt-6 mb-2">4. Third-Party Services</h2>
        <p className="text-slate-400 mb-4">
            We may use anonymous analytics tools to improve app stability. These tools do not collect personally identifiable information.
        </p>
        
        <h2 className="text-xl font-bold text-white mt-6 mb-2">5. Children's Privacy</h2>
        <p className="text-slate-400 mb-4">
            Our app is not intended for children under the age of 13.
        </p>
      </div>
    </div>
  );
};

export default AppPrivacy;