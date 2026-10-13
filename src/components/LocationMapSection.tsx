import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Navigation, 
  Car, 
  Compass, 
  MessageCircle
} from 'lucide-react';
import { BRANCHES, SALON_INFO } from '../data/salonData';

export const LocationMapSection: React.FC = () => {
  const branch = BRANCHES[0];
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(branch.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="locations" className="py-16 lg:py-20 border-b border-[#E7D8C8] bg-[#F7F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B58A52] font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Salon Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-display font-bold text-[#30231F] tracking-tight">
            Visit Our Salon in Vaishali Nagar, Jaipur
          </h2>
          <p className="text-base sm:text-lg text-[#5A453D] font-normal">
            Centrally located near Amrapali Circle. Easily accessible with free parking right outside our salon.
          </p>
        </div>

        {/* Main Grid: Interactive Map + Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-xl overflow-hidden border border-[#E7D8C8] shadow-xs bg-white h-full min-h-[380px] sm:min-h-[440px]">
              
              {/* Google Maps iFrame */}
              <iframe
                title={`Google Map - ${branch.name}`}
                src={branch.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px] sm:min-h-[440px]"
              />

              {/* Floating overlay on map */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-[#E7D8C8] text-xs font-semibold text-[#30231F] flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>{branch.area}</span>
                </div>

                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto px-3.5 py-1.5 rounded-md bg-[#30231F] hover:bg-[#44322C] text-white font-semibold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B58A52]" />
                </a>
              </div>

              {/* Bottom map coordinates ribbon */}
              <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-lg border border-[#E7D8C8] flex items-center justify-between text-xs text-[#5A453D] shadow-xs">
                  <span>GPS: {branch.lat.toFixed(5)}, {branch.lng.toFixed(5)}</span>
                  <span className="text-[#30231F] font-semibold">Near Amrapali Circle</span>
                </div>
              </div>

            </div>
          </div>

          {/* Location Details Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-white border border-[#E7D8C8] p-6 sm:p-7 space-y-6 shadow-xs">
            
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B58A52] font-bold">
                  Address & Contact
                </span>
                <h3 className="text-2xl font-serif-display font-bold text-[#30231F] mt-1">
                  Mirrorist Unisex Salon
                </h3>
              </div>

              {/* Address with copy */}
              <div className="p-4 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#B58A52] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#735A4F] block font-semibold">
                        Full Address
                      </span>
                      <p className="text-xs text-[#30231F] font-medium mt-0.5 leading-relaxed">
                        {branch.fullAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E7D8C8] flex items-center justify-between">
                  <button
                    onClick={handleCopyAddress}
                    className="text-xs text-[#5A453D] hover:text-[#30231F] flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#B58A52] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View on Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Timings & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#735A4F] font-semibold uppercase">
                    <Clock className="w-3.5 h-3.5 text-[#B58A52]" />
                    <span>Timings</span>
                  </div>
                  <div className="text-xs font-semibold text-[#30231F]">{branch.timings}</div>
                  <div className="text-[11px] text-[#5A453D]">{branch.days}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#735A4F] font-semibold uppercase">
                    <Phone className="w-3.5 h-3.5 text-[#B58A52]" />
                    <span>Phone</span>
                  </div>
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-xs font-semibold text-[#30231F] hover:text-[#B58A52] block transition-colors"
                  >
                    {branch.phone}
                  </a>
                  <div className="text-[11px] text-[#5A453D]">Direct salon desk</div>
                </div>
              </div>

              {/* Landmark and Parking */}
              <div className="space-y-2 text-xs text-[#5A453D]">
                <div className="flex items-start gap-2">
                  <Compass className="w-4 h-4 text-[#B58A52] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#30231F]">Landmark:</strong> {branch.landmarks}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-[#B58A52] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#30231F]">Parking:</strong> {branch.parking}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-3 border-t border-[#E7D8C8]">
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#B58A52]" />
                <span>Start Navigation in Google Maps</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${SALON_INFO.rawPhone}`}
                  className="py-2.5 px-3 rounded-lg border border-[#E7D8C8] hover:border-[#30231F] text-xs font-semibold text-[#30231F] text-center flex items-center justify-center gap-1.5 transition-colors bg-[#F7F2EA]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B58A52]" />
                  <span>Call Us</span>
                </a>

                <a
                  href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20please%20share%20your%20exact%20location%20pin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg border border-[#E7D8C8] hover:bg-[#E7D8C8]/60 text-xs font-semibold text-[#30231F] text-center flex items-center justify-center gap-1.5 transition-colors bg-[#F7F2EA]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Get Location</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
