import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Calendar, 
  Clock, 
  BookmarkCheck,
  MessageCircle,
  Scissors,
  Menu,
  X
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenMyAppointments: () => void;
  appointmentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onOpenMyAppointments,
  appointmentCount 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services & Prices', href: '#services' },
    { name: 'Why Mirrorist', href: '#why-mirrorist' },
    { name: 'Our Location', href: '#locations' },
    { name: 'Hair & Beauty Tips', href: '#journal' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <>
      {/* Top announcement strip in Warm Sand */}
      <div className="bg-[#E7D8C8] text-[#30231F] text-xs py-2 px-4 border-b border-[#D8C7B5]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#B58A52]"></span>
              <span>Vaishali Nagar, Jaipur · Open Daily 10 AM – 9 PM</span>
            </span>
            <span className="text-[#B58A52] hidden sm:inline">|</span>
            <span className="text-[#5A453D] hidden sm:inline">Walk-ins Welcome</span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-xs">
            <a 
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20I%20would%20like%20to%20book%20an%20appointment`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-[#30231F] hover:text-[#B58A52] font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#B58A52]" />
              <span>WhatsApp: {SALON_INFO.primaryPhone}</span>
            </a>
            <a 
              href={`tel:${SALON_INFO.rawPhone}`} 
              className="flex items-center gap-1.5 text-[#30231F] hover:text-[#B58A52] transition-colors font-semibold"
            >
              <Phone className="w-3 h-3 text-[#B58A52]" />
              <span>Call Us: {SALON_INFO.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation in Warm Ivory & Espresso */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F7F2EA]/95 backdrop-blur-md shadow-sm border-b border-[#E7D8C8] py-3.5' 
            : 'bg-[#F7F2EA] border-b border-[#E7D8C8] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#30231F] border border-[#B58A52] flex items-center justify-center text-[#B58A52] shadow-sm transition-transform group-hover:scale-105">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-serif-display font-bold tracking-wide text-[#30231F]">
                  MIRRORIST
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#30231F] font-semibold px-1.5 py-0.5 rounded bg-[#E7D8C8]">
                  Unisex
                </span>
              </div>
              <p className="text-[11px] tracking-wider uppercase text-[#735A4F]">
                Vaishali Nagar · Jaipur
              </p>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#4D3831]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#B58A52] transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B58A52] transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* My appointments button */}
            <button
              onClick={onOpenMyAppointments}
              className="relative p-2.5 rounded-lg border border-[#E7D8C8] text-[#4D3831] hover:text-[#30231F] hover:border-[#B58A52] transition-colors flex items-center gap-1.5 text-xs font-medium bg-white shadow-xs"
              title="View my appointments"
            >
              <BookmarkCheck className="w-4 h-4 text-[#B58A52]" />
              <span className="hidden xl:inline">My Bookings</span>
              {appointmentCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#30231F] text-white text-[10px] font-bold flex items-center justify-center">
                  {appointmentCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp button */}
            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20I%20would%20like%20to%20ask%20about%20a%20service%20or%20book%20an%20appointment`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[#E7D8C8] text-[#30231F] hover:bg-[#E7D8C8]/50 transition-colors flex items-center gap-1.5 text-xs font-semibold bg-white shadow-xs"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Primary Book Appointment CTA in Espresso Brown with Gold Accent */}
            <button
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white font-semibold text-xs tracking-wider uppercase shadow-sm active:scale-[0.98] transition-all cursor-pointer border border-[#30231F]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B58A52]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3.5 py-1.5 rounded-lg bg-[#30231F] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[#E7D8C8] text-[#30231F] bg-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E7D8C8] bg-white px-4 pt-3 pb-6 space-y-3 mt-3 shadow-md">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E7D8C8]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] text-xs font-medium text-[#30231F]"
              >
                <BookmarkCheck className="w-4 h-4 text-[#B58A52]" />
                <span>My Bookings ({appointmentCount})</span>
              </button>

              <a
                href={`tel:${SALON_INFO.rawPhone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] text-xs font-medium text-[#30231F]"
              >
                <Phone className="w-4 h-4 text-[#B58A52]" />
                <span>Call Salon</span>
              </a>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-sm text-[#4D3831] hover:bg-[#F7F2EA] hover:text-[#B58A52] font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-lg bg-[#30231F] text-white font-semibold text-center text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#B58A52]" />
                <span>Book Your Appointment</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
