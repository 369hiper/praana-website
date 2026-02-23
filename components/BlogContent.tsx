import React from 'react';
import type { BlogContentBlock } from '../data/blogPosts';

const P: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="text-slate-300 leading-relaxed text-base md:text-lg">{children}</p>
);

const H2: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">{children}</h2>
);

const H3: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-3">{children}</h3>
);

export const BlogContent: React.FC<{ blocks: BlogContentBlock[] }> = ({ blocks }) => {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        if (b.type === 'p') return <P key={i}>{b.text}</P>;
        if (b.type === 'h2') return <H2 key={i}>{b.text}</H2>;
        if (b.type === 'h3') return <H3 key={i}>{b.text}</H3>;
        if (b.type === 'ul')
          return (
            <ul key={i} className="space-y-2 pl-6 list-disc text-slate-300 text-base md:text-lg">
              {b.items.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          );
        if (b.type === 'quote')
          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6"
            >
              <div className="text-white/90 text-lg md:text-xl leading-relaxed italic">“{b.text}”</div>
              {b.by ? <div className="text-slate-400 mt-3 text-sm md:text-base">— {b.by}</div> : null}
            </div>
          );
        if (b.type === 'callout')
          return (
            <div
              key={i}
              className="rounded-2xl border border-praana-accent/25 bg-gradient-to-br from-praana-accent/10 to-purple-500/10 p-6"
            >
              <div className="text-white font-bold text-lg mb-2">{b.title}</div>
              <div className="text-slate-200 leading-relaxed">{b.text}</div>
            </div>
          );
        return null;
      })}
    </div>
  );
};

