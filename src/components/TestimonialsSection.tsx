import React, { useState } from 'react';
import { Star, CheckCircle, Plus, X, Sparkles, ExternalLink } from 'lucide-react';
import { CLIENT_REVIEWS, SALON_INFO } from '../data/salonData';
import { Review } from '../types/salon';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('mirrorist_user_reviews');
      if (saved) return [...JSON.parse(saved), ...CLIENT_REVIEWS];
    } catch {}
    return CLIENT_REVIEWS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Nanoplastia Hair Treatment');
  const [branch] = useState('Vaishali Nagar, Jaipur');
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      clientName: authorName.trim(),
      service: service,
      branch: branch,
      rating: rating,
      date: 'Just now',
      comment: comment.trim(),
      verified: true,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);

    try {
      const userOnly = JSON.parse(localStorage.getItem('mirrorist_user_reviews') || '[]');
      localStorage.setItem('mirrorist_user_reviews', JSON.stringify([newRev, ...userOnly]));
    } catch {}

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setAuthorName('');
      setComment('');
    }, 1800);
  };

  return (
    <section id="reviews" className="py-16 lg:py-20 border-b border-[#E7D8C8] relative bg-[#F7F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B58A52] font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Real Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-display font-bold text-[#30231F] tracking-tight">
              What Jaipur Clients Say About Mirrorist
            </h2>
            <p className="text-base sm:text-lg text-[#5A453D] font-normal max-w-xl">
              Authentic feedback from women and men visiting our Vaishali Nagar salon.
            </p>
          </div>

          {/* Rating Score Card & Write Review button */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={SALON_INFO.googleMapsPrimaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E7D8C8] shadow-xs hover:border-[#B58A52] transition-colors"
              title="View on Google Maps"
            >
              <div className="text-3xl font-bold font-serif-display text-[#30231F]">4.8</div>
              <div>
                <div className="flex text-[#B58A52]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-[#735A4F] mt-0.5 flex items-center gap-1">
                  <span>380+ Google Reviews</span>
                  <ExternalLink className="w-3 h-3 text-[#B58A52]" />
                </div>
              </div>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-3 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-xs font-semibold text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#B58A52]" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-white border border-[#E7D8C8] hover:border-[#B58A52] flex flex-col justify-between transition-all space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#B58A52]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8F7468]">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-sm text-[#4D3831] font-normal leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Service Meta */}
              <div className="pt-3 border-t border-[#F0E6DA] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#30231F] flex items-center gap-1.5">
                    <span>{rev.clientName}</span>
                    {rev.verified && (
                      <span title="Verified Client">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-[#735A4F] mt-0.5">{rev.service}</p>
                </div>
                <span className="text-[10px] text-[#735A4F] bg-[#F7F2EA] px-2 py-0.5 rounded border border-[#E7D8C8]">{rev.branch}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#30231F]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E7D8C8] shadow-xl overflow-hidden p-6 sm:p-7 space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#E7D8C8] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B58A52]" />
                <h3 className="text-base font-serif-display font-bold text-[#30231F]">
                  Share Your Salon Experience
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#735A4F] hover:text-[#30231F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#E7D8C8] text-[#30231F] mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#30231F]">Thank You!</h4>
                <p className="text-xs text-[#5A453D]">Your review has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-[#B58A52] fill-[#B58A52]'
                              : 'text-[#D8C7B5]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#30231F] font-bold ml-2">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sen"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#F7F2EA] border border-[#E7D8C8] rounded-lg py-2 px-3 text-xs text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                    Service Taken
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#F7F2EA] border border-[#E7D8C8] rounded-lg py-2 px-3 text-xs text-[#30231F] focus:border-[#B58A52] focus:outline-none"
                  >
                    <option value="Nanoplastia Hair Treatment">Nanoplastia Hair Treatment</option>
                    <option value="Hair Botox Deep Conditioning">Hair Botox Deep Conditioning</option>
                    <option value="Balayage & Hair Highlights">Balayage & Hair Highlights</option>
                    <option value="Women's Haircut & Wash">Women's Haircut & Wash</option>
                    <option value="Men's Haircut & Beard Styling">Men's Haircut & Beard Styling</option>
                    <option value="Hydra Cleanse Facial">Hydra Cleanse Facial</option>
                    <option value="Bridal HD Makeup">Bridal HD Makeup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                    Your Honest Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell other Jaipur customers about your experience, staff behavior, and hair results..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#F7F2EA] border border-[#E7D8C8] rounded-lg p-3 text-xs text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs text-[#5A453D] hover:text-[#30231F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white font-semibold text-xs uppercase tracking-wider shadow-xs"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
