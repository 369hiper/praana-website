import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

const BlogSection: React.FC = () => {
  const featured = BLOG_POSTS.slice(0, 6);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-praana-dark">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-praana-accent/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-praana-accent/30 bg-praana-accent/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-praana-accent" />
            <span className="text-praana-accent text-sm font-medium tracking-wider uppercase">Praana Knowledge Vault</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight">
            PEMF Science,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-praana-accent via-cyan-400 to-purple-400">
              Healing Frequencies
            </span>{' '}
            & the Fabric of the Cosmos
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl">
            High-conversion, SEO-optimized guides on pain, inflammation, DNA repair language, Schumann resonance, and sacred
            patterns like Fibonacci—written in a modern, science-respectful voice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post) => (
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
                  {post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-praana-accent/10 text-praana-accent border border-praana-accent/20"
                    >
                      {t}
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

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-praana-accent to-teal-400 text-praana-dark font-bold text-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.35)] transition-all duration-300 group"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

