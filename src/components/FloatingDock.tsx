import React from 'react';
import { Calendar, Phone, MessageCircle, MapPin } from 'lucide-react';
import { SALON_INFO, BRANCHES } from '../data/salonData';

interface FloatingDockProps {
  onOpenBooking: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenBooking }) => {
  const flagship = BRANCHES[0];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-2 sm:p-2.5 bg-white/95 backdrop-blur-md border-t border-[#E7D8C8] sm:hidden shadow-lg">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Call button */}
        <a
          href={`tel:${SALON_INFO.rawPhone}`}
          className="flex-1 py-2 px-1.5 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] text-[#30231F] flex flex-col items-center justify-center text-[10px] font-semibold active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-[#B58A52] mb-0.5" />
          <span>Call Desk</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20I%20would%20like%20to%20book%20an%20appointment`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-1.5 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] text-[#30231F] flex flex-col items-center justify-center text-[10px] font-semibold active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Directions button */}
        <a
          href={flagship.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-1.5 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] text-[#30231F] flex flex-col items-center justify-center text-[10px] font-semibold active:scale-95 transition-transform"
        >
          <MapPin className="w-4 h-4 text-[#B58A52] mb-0.5" />
          <span>Directions</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          onClick={onOpenBooking}
          className="flex-[1.5] py-2 px-2.5 rounded-lg bg-[#30231F] text-white flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-wider shadow-xs active:scale-95 transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#B58A52] mb-0.5" />
          <span>Book Now</span>
        </button>

      </div>
    </div>
  );
};
