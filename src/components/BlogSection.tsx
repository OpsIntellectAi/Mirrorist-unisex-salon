import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Share2, 
  Sparkles
} from 'lucide-react';
import { BLOG_POSTS } from '../data/salonData';
import { BlogPost } from '../types/salon';

interface BlogSectionProps {
  onBookService: (serviceId?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onBookService }) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}#journal`);
      setCopiedSlug(post.id);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <section id="journal" className="py-16 lg:py-20 border-b border-[#E7D8C8] bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B58A52] font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Salon Guides & Advice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-display font-bold text-[#30231F] tracking-tight">
            Hair & Beauty Tips
          </h2>
          <p className="text-base sm:text-lg text-[#5A453D] font-normal">
            Practical advice from our senior stylists on hair treatments, managing hard water in Jaipur, and everyday grooming.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] hover:border-[#B58A52] transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-sm"
            >
              <div>
                {/* Cover Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#30231F] border border-[#E7D8C8] uppercase tracking-wider shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  {/* Meta strip */}
                  <div className="flex items-center gap-2 text-xs text-[#735A4F]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B58A52]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-serif-display font-bold text-[#30231F] group-hover:text-[#B58A52] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-[#5A453D] font-normal line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveArticle(post)}
                  className="w-full py-2.5 px-3 rounded-lg bg-white hover:bg-[#30231F] text-[#30231F] hover:text-white border border-[#E7D8C8] hover:border-[#30231F] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B58A52]" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#30231F]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#E7D8C8] shadow-xl overflow-hidden my-4 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7D8C8] bg-[#F7F2EA]">
              <div className="flex items-center gap-2 text-xs text-[#B58A52] font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>{activeArticle.category}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="p-1.5 rounded-lg text-[#5A453D] hover:text-[#30231F] hover:bg-white transition-colors text-xs flex items-center gap-1 border border-transparent hover:border-[#E7D8C8]"
                  title="Share article"
                >
                  <Share2 className="w-4 h-4 text-[#B58A52]" />
                  <span className="text-[11px] hidden sm:inline font-medium">
                    {copiedSlug === activeArticle.id ? 'Copied Link' : 'Share'}
                  </span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-lg text-[#735A4F] hover:text-[#30231F] hover:bg-white transition-colors border border-transparent hover:border-[#E7D8C8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#30231F] leading-tight">
                  {activeArticle.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#735A4F] pb-2 border-b border-[#E7D8C8]">
                  <span className="flex items-center gap-1.5 text-[#30231F] font-semibold">
                    <User className="w-3.5 h-3.5 text-[#B58A52]" />
                    {activeArticle.author}
                  </span>
                  <span>·</span>
                  <span>{activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Cover Image in modal */}
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#E7D8C8]">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm text-[#4D3831] font-normal leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Key Takeaways Box */}
              <div className="p-5 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#30231F]">
                  <Sparkles className="w-4 h-4 text-[#B58A52]" />
                  <span>Key Summary & Recommendations</span>
                </div>
                <div className="space-y-2">
                  {activeArticle.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4D3831]">
                      <CheckCircle2 className="w-4 h-4 text-[#B58A52] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Services CTA in modal */}
              {activeArticle.recommendedServices && activeArticle.recommendedServices.length > 0 && (
                <div className="p-5 rounded-xl bg-[#E7D8C8]/60 border border-[#D8C7B5] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs uppercase font-bold text-[#30231F]">
                      Ready to consult with our stylists?
                    </h4>
                    <p className="text-xs text-[#5A453D]">
                      Book an appointment at our Vaishali Nagar salon.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const recId = activeArticle.recommendedServices?.[0];
                      setActiveArticle(null);
                      onBookService(recId);
                    }}
                    className="px-5 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-xs"
                  >
                    Book This Service
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#F7F2EA] border-t border-[#E7D8C8] text-right">
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs text-[#5A453D] hover:text-[#30231F] font-semibold"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
