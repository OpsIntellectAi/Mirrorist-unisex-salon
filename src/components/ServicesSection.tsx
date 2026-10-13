import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  Check, 
  ArrowRight, 
  ShieldCheck,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { SALON_SERVICES, SALON_INFO } from '../data/salonData';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'women' | 'men' | 'unisex'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'treatments', label: 'Hair Smoothing (Nanoplastia & Botox)' },
    { id: 'hair', label: 'Haircuts & Colour' },
    { id: 'mens', label: "Men's Hair & Grooming" },
    { id: 'skin', label: 'Skin & Facials' },
    { id: 'bridal', label: 'Bridal & Groom Makeup' },
    { id: 'nails', label: 'Pedicure & Manicure' },
  ];

  const filteredServices = SALON_SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesGender = 
      genderFilter === 'all' || 
      service.gender === 'unisex' || 
      service.gender === genderFilter;
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesGender && matchesSearch;
  });

  return (
    <section id="services" className="py-16 lg:py-20 border-b border-[#E7D8C8] bg-[#F7F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Simple & Customer-Centric */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B58A52] font-bold">
            <span>Transparent Pricing · No Hidden Charges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-display font-bold text-[#30231F] tracking-tight">
            Our Services & Prices
          </h2>
          <p className="text-base sm:text-lg text-[#5A453D] font-normal">
            Find the right service for your hair, skin, and budget. Starting prices are shown below; final cost depends on hair length and density.
          </p>
        </div>

        {/* Filter controls */}
        <div className="space-y-4 mb-10">
          
          {/* Top row: Search and Gender toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#735A4F] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search Nanoplastia, Botox, Haircut, Facial..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E7D8C8] rounded-lg py-2 pl-10 pr-4 text-sm text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#735A4F] hover:text-[#30231F]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Gender filter segmented buttons */}
            <div className="flex items-center gap-1 p-1 bg-white border border-[#E7D8C8] rounded-lg self-stretch sm:self-auto justify-center shadow-xs">
              {[
                { id: 'all', label: 'All Clients' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGenderFilter(g.id as any)}
                  className={`px-3.5 py-1.5 text-xs rounded-md transition-colors font-medium ${
                    genderFilter === g.id
                      ? 'bg-[#30231F] text-white shadow-xs font-semibold'
                      : 'text-[#5A453D] hover:text-[#30231F]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs rounded-lg whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'border-[#30231F] bg-[#30231F] text-white font-semibold shadow-xs'
                    : 'border-[#E7D8C8] bg-white text-[#4D3831] hover:border-[#B58A52]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Services Grid (Answering the 4 Core Questions: What is it, benefits, time, cost) */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 rounded-xl bg-white border border-[#E7D8C8] space-y-3">
            <p className="text-sm text-[#5A453D]">No services found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setGenderFilter('all');
              }}
              className="px-4 py-2 text-xs rounded-lg bg-[#30231F] text-white font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="rounded-xl bg-white border border-[#E7D8C8] hover:border-[#B58A52] transition-all p-6 flex flex-col justify-between group relative overflow-hidden shadow-xs hover:shadow-sm"
              >
                {/* Popular treatment badge */}
                {service.popular && (
                  <div className="absolute top-0 right-0">
                    <span className="inline-block bg-[#E7D8C8] text-[#30231F] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg border-b border-l border-[#D8C7B5]">
                      Popular in Jaipur
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Category & Duration header */}
                  <div className="flex items-center gap-2 text-xs text-[#735A4F]">
                    <span className="uppercase tracking-wider font-semibold text-[#B58A52]">
                      {service.category === 'treatments' ? 'Smoothing' : service.category}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B58A52]" />
                      {service.duration}
                    </span>
                    <span>·</span>
                    <span className="capitalize">{service.gender}</span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-serif-display font-bold text-[#30231F] group-hover:text-[#B58A52] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#5A453D] font-normal mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Benefit highlights */}
                  <div className="space-y-1.5 pt-3 border-t border-[#F0E6DA]">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#4D3831]">
                        <Check className="w-4 h-4 text-[#B58A52] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking Action */}
                <div className="pt-5 mt-5 border-t border-[#F0E6DA] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#735A4F] uppercase font-semibold block">Starting Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#30231F] font-mono">
                        ₹{service.price.toLocaleString('en-IN')}
                      </span>
                      {service.originalPrice && (
                        <span className="text-xs text-[#8F7468] line-through font-mono">
                          ₹{service.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8F7468] block">Varies by hair length</span>
                  </div>

                  <button
                    onClick={() => onBookService(service.id)}
                    className="px-4 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B58A52]" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Honest pricing note and WhatsApp advice box */}
        <div className="mt-10 p-6 rounded-xl bg-[#E7D8C8] border border-[#D8C7B5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#B58A52] shrink-0 shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#30231F]">
                Want an exact price estimate for your hair length?
              </h4>
              <p className="text-xs text-[#5A453D] mt-0.5">
                Send a quick photo of your hair on WhatsApp. Our stylists will tell you the estimated time, product suitability, and final price before you visit.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20can%20I%20get%20a%20price%20estimate%20for%20my%20hair%20length%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-xs flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
