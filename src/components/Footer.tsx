import React from 'react';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  ExternalLink, 
  CheckCircle2
} from 'lucide-react';
import { SALON_INFO, BRANCHES } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const branch = BRANCHES[0];

  return (
    <footer className="bg-[#30231F] text-[#F7F2EA] text-xs pt-16 pb-24 md:pb-16 border-t border-[#44322C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#44322C]">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F2EA] border border-[#B58A52] flex items-center justify-center text-[#30231F]">
                <Scissors className="w-5 h-5 text-[#B58A52]" />
              </div>
              <div>
                <span className="text-xl font-serif-display font-bold tracking-wider text-white">
                  MIRRORIST
                </span>
                <p className="text-[10px] tracking-wider uppercase text-[#E7D8C8]">
                  Unisex Salon · Vaishali Nagar, Jaipur
                </p>
              </div>
            </div>

            <p className="text-xs text-[#E7D8C8]/80 font-normal leading-relaxed">
              Professional hair, skin and beauty services in Vaishali Nagar, Jaipur. Specializing in Nanoplastia hair smoothing, Hair Botox conditioning, natural highlights, facials, and bridal styling.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-[#E7D8C8]/30 flex items-center justify-center text-white hover:text-[#B58A52] hover:border-[#B58A52] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SALON_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-[#E7D8C8]/30 flex items-center justify-center text-white hover:text-[#B58A52] hover:border-[#B58A52] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SALON_INFO.googleMapsPrimaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-[#E7D8C8]/30 flex items-center justify-center text-white hover:text-[#B58A52] hover:border-[#B58A52] transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Single Salon Location in Jaipur (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              Salon Location in Jaipur
            </h4>
            <div className="p-4 rounded-xl bg-white/5 border border-[#E7D8C8]/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Mirrorist Unisex Salon</span>
                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#B58A52] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-[#E7D8C8] leading-relaxed">
                Plot No. E-21 Shop No. 1, Gupta Store, Opposite Royal Bakery, Hanuman Nagar, Amrapali Circle, Vaishali Nagar, Jaipur, Rajasthan 302021
              </p>
              <div className="pt-1 text-[11px] text-[#E7D8C8]/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B58A52] shrink-0" />
                <span>Opposite Royal Bakery, near Amrapali Circle</span>
              </div>
            </div>
          </div>

          {/* Timings & Booking (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">
              Timings & Appointments
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#E7D8C8]">
                <Clock className="w-4 h-4 text-[#B58A52]" />
                <span>Open Daily: 10:00 AM – 9:00 PM (7 Days a Week)</span>
              </div>
              <div className="flex items-center gap-2 text-[#E7D8C8]">
                <Phone className="w-4 h-4 text-[#B58A52]" />
                <a href={`tel:${SALON_INFO.rawPhone}`} className="hover:text-white font-medium">
                  Call: {SALON_INFO.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#E7D8C8]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sanitized tools & hygienic single-use kits</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-lg bg-[#B58A52] hover:bg-[#A37943] text-[#30231F] font-bold uppercase tracking-wider text-xs transition-all shadow-xs"
              >
                Book Appointment Online
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7D8C8]/60">
          <div>
            © {new Date().getFullYear()} Mirrorist Unisex Salon. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Hanuman Nagar, Amrapali Circle, Vaishali Nagar</span>
            <span>·</span>
            <span>Jaipur, Rajasthan 302021</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
