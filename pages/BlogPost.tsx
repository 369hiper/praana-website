import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogContent } from '../components/BlogContent';
import { useSeo } from '../utils/useSeo';

const BlogPost: React.FC = () => {
  const { slug } = useParams();

  const post = useMemo(() => BLOG_POSTS.find((p) => p.slug === slug), [slug]);

  useSeo({
    title: post ? `${post.title} | Praana Coil Blog` : 'Article not found | Praana Coil Blog',
    description: post ? post.excerpt : 'This article does not exist or was moved.',
    keywords: post?.keywords,
    image: post?.image?.src,
  });

  if (!post) {
    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-praana-dark min-h-screen">
        <Link to="/blog" className="inline-flex items-center gap-2 text-praana-accent font-semibold mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Article not found</h1>
          <p className="text-slate-400">Try going back to the blog list and selecting another post.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="mb-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-praana-accent font-semibold mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-praana-accent/10 text-praana-accent border border-praana-accent/20"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">{post.title}</h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-4">{post.excerpt}</p>
        <div className="text-slate-500 text-sm">
          {new Date(post.dateISO).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} ·{' '}
          {post.readingMinutes} min read
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 mb-10">
        <div className="relative">
          <img
            src={post.image.src}
            alt={post.image.alt}
            className="w-full h-[240px] md:h-[320px] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-praana-dark via-transparent to-transparent" />
        </div>
        <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-slate-400 text-sm">
            Image credit: <span className="text-slate-200">{post.image.creditName}</span> ·{' '}
            <span className="text-slate-500">{post.image.license}</span>
          </div>
          <a
            href={post.image.creditUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-praana-accent font-semibold text-sm hover:text-teal-300"
          >
            View source <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/40 p-6 md:p-10">
        <BlogContent blocks={post.content} />

        <div className="mt-12 pt-8 border-t border-slate-800">
          <h3 className="text-white font-bold text-xl mb-3">SEO hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {post.hashtags.map((h) => (
              <span key={h} className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/60 text-slate-200 border border-slate-700/60">
                {h}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-praana-accent text-praana-dark font-bold hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(20,184,166,0.25)]"
          >
            Explore Praana Coil Devices
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

