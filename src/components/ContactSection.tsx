import React, { useState } from 'react';
import { 
  Phone, 
  Send, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  MapPin, 
  CheckCircle, 
  ChevronDown, 
  HelpCircle 
} from 'lucide-react';
import { SALON_INFO, FAQS } from '../data/salonData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: 'Vaishali Nagar (Main Branch)',
    serviceInterest: 'Nanoplastia Hair Treatment',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        branch: 'Vaishali Nagar (Main Branch)',
        serviceInterest: 'Nanoplastia Hair Treatment',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 lg:py-20 border-b border-[#E7D8C8] bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B58A52] font-bold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>We’re Here to Help</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-display font-bold text-[#30231F] tracking-tight">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-[#5A453D] font-normal">
            Have questions about our treatments, prices for your hair length, or same-day slots? Send us a message or chat directly with our team on WhatsApp.
          </p>
        </div>

        {/* 2-Column Grid: Contact Form + Direct Channels & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form (6 cols) */}
          <div className="lg:col-span-6 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h3 className="text-xl font-serif-display font-bold text-[#30231F]">
                Send a Message or Request an Estimate
              </h3>
              <p className="text-xs text-[#5A453D] mt-1">
                Our front desk team will call or WhatsApp you back within business hours (10 AM – 9 PM).
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-3 bg-white rounded-lg border border-[#E7D8C8] p-6 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#E7D8C8] text-[#30231F] mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#30231F]">Request Received!</h4>
                <p className="text-xs text-[#5A453D]">
                  Thank you, {formData.name}. Our salon desk in Vaishali Nagar will contact you on {formData.phone} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ankit Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#E7D8C8] rounded-lg py-2.5 px-3.5 text-xs text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#E7D8C8] rounded-lg py-2.5 px-3.5 text-xs text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#E7D8C8] rounded-lg py-2.5 px-3.5 text-xs text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                    Service You Are Interested In
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full bg-white border border-[#E7D8C8] rounded-lg py-2.5 px-3 text-xs text-[#30231F] focus:border-[#B58A52] focus:outline-none"
                  >
                    <option value="Nanoplastia Hair Treatment">Nanoplastia Hair Treatment</option>
                    <option value="Hair Botox Deep Conditioning">Hair Botox Deep Conditioning</option>
                    <option value="Balayage & Hair Highlights">Balayage & Hair Highlights</option>
                    <option value="Haircut & Styling">Haircut & Styling</option>
                    <option value="Men's Hair & Beard Styling">Men's Hair & Beard Styling</option>
                    <option value="Bridal Makeup Package">Bridal Makeup Package</option>
                    <option value="Hydra Cleanse Facial">Hydra Cleanse Facial</option>
                    <option value="General Inquiry">General Question / Appointment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your hair length, preferred day/time, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#E7D8C8] rounded-lg p-3 text-xs text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#B58A52]" />
                  <span>Send Your Request</span>
                </button>
              </form>
            )}

            {/* Social Media Links */}
            <div className="pt-4 border-t border-[#E7D8C8] space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#735A4F] font-bold block">
                Connect on Social Media
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E7D8C8] hover:border-[#B58A52] text-xs text-[#30231F] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#e1306c]" />
                  <span>Instagram</span>
                </a>

                <a
                  href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E7D8C8] hover:border-[#B58A52] text-xs text-[#30231F] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25d366]" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={SALON_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E7D8C8] hover:border-[#B58A52] text-xs text-[#30231F] transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#1877f2]" />
                  <span>Facebook</span>
                </a>

                <a
                  href={SALON_INFO.googleMapsPrimaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E7D8C8] hover:border-[#B58A52] text-xs text-[#30231F] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#B58A52]" />
                  <span>Google Maps Reviews</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Channels & FAQs (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] space-y-2 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#B58A52] border border-[#E7D8C8]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#735A4F] font-bold">
                  Direct Phone Call
                </div>
                <a
                  href={`tel:${SALON_INFO.rawPhone}`}
                  className="text-sm font-bold text-[#30231F] hover:text-[#B58A52] block"
                >
                  {SALON_INFO.primaryPhone}
                </a>
                <p className="text-xs text-[#5A453D]">Tap to call for appointments</p>
              </div>

              <div className="p-5 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] space-y-2 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-emerald-600 border border-[#E7D8C8]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#735A4F] font-bold">
                  WhatsApp Support
                </div>
                <a
                  href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20I%20have%20a%20question%20about%20your%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[#30231F] hover:text-[#B58A52] hover:underline block"
                >
                  Chat with Our Desk
                </a>
                <p className="text-xs text-[#5A453D]">Share photos for price estimate</p>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#B58A52]" />
                <h3 className="text-base font-serif-display font-bold text-[#30231F]">
                  Common Questions
                </h3>
              </div>

              <div className="space-y-2.5">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-[#E7D8C8] bg-white overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-[#30231F] hover:text-[#B58A52]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#B58A52]' : 'text-[#735A4F]'}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-[#5A453D] font-normal leading-relaxed border-t border-[#F0E6DA]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
