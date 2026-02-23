import React from 'react';
import { SimpleMarkdown } from '../components/SimpleMarkdown';

// Vite raw import
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import privacyPolicyRaw from '../assets/EULA-policies/Privacy-policy.md?raw';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <SimpleMarkdown content={privacyPolicyRaw} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;