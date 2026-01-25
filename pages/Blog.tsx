import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_TAGS } from '../data/blogPosts';
import { useSeo } from '../utils/useSeo';

const Blog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');

  useSeo({
    title: 'Praana Coil Blog | PEMF Science, Healing Frequencies & Vortex Geometry',
    description:
      'Explore 10+ SEO-optimized, science-respectful articles on PEMF for pain and inflammation, healing frequencies, Schumann resonance, DNA repair language, and golden ratio / Fibonacci patterns.',
    keywords: [
      'PEMF blog',
      'PEMF pain inflammation',
      'healing frequencies',
      'Schumann resonance 7.83 Hz',
      'DNA repair',
      'golden ratio Fibonacci',
      'toroidal coil',
      'vortex geometry',
    ],
    image: BLOG_POSTS[0]?.image?.src,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const tagOk = activeTag === 'All' ? true : p.tags.includes(activeTag);
      if (!tagOk) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.excerpt,
        p.tags.join(' '),
        p.keywords.join(' '),
        p.hashtags.join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, activeTag]);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-praana-dark min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
          Praana Coil{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-praana-accent to-purple-400">Blog</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl">
          Science-respectful, high-conversion reading on PEMF, frequency, inflammation, DNA repair language, Schumann
          resonance, and the geometry of coherence.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search PEMF, Schumann, DNA repair, Fibonacci…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-praana-accent/40"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', ...BLOG_TAGS].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeTag === t
                  ? 'bg-praana-accent text-praana-dark border-praana-accent'
                  : 'bg-slate-900/30 text-slate-300 border-slate-800 hover:border-praana-accent/40 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-praana-accent/40 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)]"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={post.image.src}
                alt={post.image.alt}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-praana-dark via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-praana-accent/10 text-praana-accent border border-praana-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-praana-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="text-slate-500 text-xs">
                  {new Date(post.dateISO).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}{' '}
                  · {post.readingMinutes} min read
                </div>
                <div className="flex items-center text-praana-accent text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="text-center mt-16 text-slate-400">
          No matches. Try a different keyword (e.g., “inflammation”, “Schumann”, “Fibonacci”, “ATP”).
        </div>
      ) : null}
    </div>
  );
};

export default Blog;

