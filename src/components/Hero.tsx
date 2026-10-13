import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Star, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { SALON_INFO, BRANCHES } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenBooking, 
  onExploreServices 
}) => {
  const flagshipBranch = BRANCHES[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#E7D8C8] bg-[#F7F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Clear, Customer-First Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Local status chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7D8C8] text-xs text-[#4D3831] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold text-[#30231F]">Vaishali Nagar, Jaipur</span>
              <span className="text-[#B58A52]">·</span>
              <span>Open Daily 10 AM – 9 PM</span>
              <span className="text-[#B58A52]">·</span>
              <span className="text-[#735A4F]">Walk-ins Welcome</span>
            </div>

            {/* Main Headline - simple, warm, confident */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif-display font-bold text-[#30231F] tracking-tight leading-[1.15]">
                Your Hair. Your Style. <br />
                <span className="italic font-normal text-[#B58A52]">
                  Your Mirrorist.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#5A453D] max-w-2xl leading-relaxed font-normal">
                Professional hair, beauty and grooming services in Vaishali Nagar, Jaipur. From stylish haircuts and smooth hair treatments to glowing facials and bridal makeup, find your look at Mirrorist.
              </p>
            </div>

            {/* Quick service tags */}
            <div className="flex flex-wrap gap-2 text-xs font-medium text-[#4D3831] pt-1">
              <span className="px-2.5 py-1 rounded-md bg-[#E7D8C8]/60 border border-[#D8C7B5]">Haircuts</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E7D8C8]/60 border border-[#D8C7B5]">Nanoplastia & Botox</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E7D8C8]/60 border border-[#D8C7B5]">Hair Colour & Highlights</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E7D8C8]/60 border border-[#D8C7B5]">Hydra Facials</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E7D8C8]/60 border border-[#D8C7B5]">Bridal Makeup</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E7D8C8]/60 border border-[#D8C7B5]">Men's Grooming</span>
            </div>

            {/* Clear Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white font-semibold text-sm tracking-wide uppercase shadow-sm active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#B58A52]" />
                <span>Book Your Appointment</span>
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 rounded-lg border border-[#30231F] bg-white text-[#30231F] hover:bg-[#E7D8C8]/40 text-sm font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore Services & Prices</span>
                <ArrowRight className="w-4 h-4 text-[#B58A52]" />
              </button>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20I%20would%20like%20to%20send%20a%20photo%20of%20my%20hair%20for%20an%20estimate`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-lg hover:bg-white text-[#4D3831] hover:text-[#30231F] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp for Quick Quote</span>
              </a>
            </div>

            {/* Trust and Rating strip */}
            <div className="pt-6 border-t border-[#E7D8C8] flex flex-wrap items-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2.5">
                <div className="flex text-[#B58A52]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#30231F]">4.8 / 5.0</div>
                  <div className="text-xs text-[#735A4F]">380+ Verified Jaipur Reviews</div>
                </div>
              </div>

              <div className="h-8 w-px bg-[#E7D8C8] hidden sm:block" />

              <div>
                <div className="text-sm font-bold text-[#30231F]">Over 12,000</div>
                <div className="text-xs text-[#735A4F]">Satisfied Jaipur Clients</div>
              </div>

              <div className="h-8 w-px bg-[#E7D8C8] hidden sm:block" />

              <div>
                <div className="text-sm font-bold text-[#30231F]">Vaishali Nagar</div>
                <div className="text-xs text-[#735A4F]">Near Amrapali Circle, Jaipur</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Salon Card in Warm Sand and White */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E7D8C8] shadow-md bg-white">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                    alt="Mirrorist Unisex Salon interior styling station Jaipur"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#30231F]/80 via-transparent to-transparent" />
                </div>

                {/* Overlaid salon badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-md bg-white/95 backdrop-blur-md border border-[#E7D8C8] text-xs font-semibold text-[#30231F] shadow-xs">
                    Professional Styling Studio
                  </span>
                  <span className="px-2.5 py-1.5 rounded-md bg-white/95 backdrop-blur-md text-[11px] text-[#4D3831] font-medium flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Clean & Sanitized Tools
                  </span>
                </div>

                {/* Bottom Card Information */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E7D8C8] space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-[#30231F]">
                        Vaishali Nagar Salon
                      </h2>
                      <p className="text-xs text-[#5A453D] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B58A52] shrink-0" />
                        Opp. Royal Bakery, Hanuman Nagar, Amrapali Circle
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E7D8C8] text-xs">
                    <span className="text-[#30231F] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B58A52]" />
                      Open today till 9:00 PM
                    </span>
                    <a
                      href={flagshipBranch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B58A52] hover:underline font-semibold"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Helpful callout card */}
              <div className="p-4 rounded-xl bg-[#E7D8C8] border border-[#D8C7B5] mt-4 flex items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="text-xs font-bold text-[#30231F]">
                    Free Hair Consultation
                  </div>
                  <p className="text-[12px] text-[#5A453D] mt-0.5">
                    Not sure which treatment fits your hair? Our stylists assess your hair length and texture before starting.
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-2 rounded-lg bg-[#30231F] text-white text-xs font-semibold whitespace-nowrap"
                >
                  Ask Stylist
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
