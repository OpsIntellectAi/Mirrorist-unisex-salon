import React from 'react';
import { X, Calendar, Clock, MapPin, Trash2, MessageCircle } from 'lucide-react';
import { AppointmentBooking } from '../types/salon';
import { BRANCHES, SALON_SERVICES, SALON_INFO } from '../data/salonData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: AppointmentBooking[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#30231F]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl rounded-xl bg-white border border-[#E7D8C8] shadow-2xl overflow-hidden my-4">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7D8C8] bg-[#F7F2EA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#E7D8C8] flex items-center justify-center text-[#B58A52]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif-display font-bold text-[#30231F]">
                My Salon Bookings
              </h3>
              <p className="text-xs text-[#735A4F]">
                {appointments.length} active reservation{appointments.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#735A4F] hover:text-[#30231F] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F7F2EA] border border-[#E7D8C8] text-[#B58A52] flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#30231F]">No Appointments Found</h4>
                <p className="text-xs text-[#5A453D] max-w-xs mx-auto">
                  You haven't scheduled any salon visits yet. Book online or on WhatsApp with instant confirmation.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-5 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white font-semibold text-xs uppercase tracking-wider"
              >
                Book Appointment Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appt) => {
                const branch = BRANCHES.find((b) => b.id === appt.branchId) || BRANCHES[0];
                const services = SALON_SERVICES.filter((s) => appt.serviceIds.includes(s.id));

                return (
                  <div
                    key={appt.id}
                    className="p-4 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] space-y-3 hover:border-[#B58A52] transition-colors shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-[#E7D8C8] pb-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#30231F]">{appt.id}</span>
                        <span className="text-[#B58A52] mx-2">·</span>
                        <span className="text-[#5A453D] font-medium">{appt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#E7D8C8] text-[#30231F] text-[10px] font-bold">
                          Reserved
                        </span>
                        <button
                          onClick={() => onCancelAppointment(appt.id)}
                          className="text-[#8F7468] hover:text-red-700 p-1 transition-colors"
                          title="Cancel appointment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#5A453D]">
                      <div className="flex items-center gap-1.5 text-[#30231F] font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#B58A52]" />
                        <span>Time Slot: {appt.timeSlot}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[#735A4F]">
                        <MapPin className="w-3.5 h-3.5 text-[#B58A52] shrink-0 mt-0.5" />
                        <span className="text-[#30231F]">{branch.name} — {branch.area}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[11px] text-[#735A4F] uppercase font-bold">Services:</span>
                        <div className="text-[#30231F] font-medium mt-0.5">
                          {services.map(s => s.name).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E7D8C8] flex items-center justify-between text-xs">
                      <span className="font-bold text-[#30231F]">
                        Total: ₹{appt.totalPrice.toLocaleString('en-IN')}
                      </span>
                      <a
                        href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Mirrorist,%20regarding%20my%20booking%20${appt.id}%20for%20${appt.date}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#30231F] hover:text-[#B58A52] font-semibold text-[11px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Ask on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F2EA] border-t border-[#E7D8C8] flex items-center justify-between text-xs">
          <span className="text-[#735A4F]">Need help? Call {SALON_INFO.primaryPhone}</span>
          <button
            onClick={() => {
              onClose();
              onBookNew();
            }}
            className="px-4 py-2 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white font-semibold uppercase tracking-wider text-[11px] shadow-xs"
          >
            + Book Another
          </button>
        </div>

      </div>
    </div>
  );
};
