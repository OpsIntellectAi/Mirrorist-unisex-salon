import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Sparkles, 
  Phone, 
  Mail, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { 
  BRANCHES, 
  SALON_SERVICES, 
  STYLISTS, 
  SALON_INFO 
} from '../data/salonData';
import { AppointmentBooking } from '../types/salon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  onBookingSuccess: (appointment: AppointmentBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  onBookingSuccess,
}) => {
  // Wizard steps: 1: Services, 2: Stylist & Date/Time, 3: Client Info, 4: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State (Single official location)
  const salonBranch = BRANCHES[0];
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Client info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [genderPreference, setGenderPreference] = useState<'female' | 'male' | 'unisex'>('unisex');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  // Completed booking pass
  const [completedBooking, setCompletedBooking] = useState<AppointmentBooking | null>(null);

  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setSelectedDate(`${yyyy}-${mm}-${dd}`);
      setSelectedTimeSlot('11:30 AM');

      if (preSelectedServiceId) {
        setSelectedServiceIds([preSelectedServiceId]);
      } else if (selectedServiceIds.length === 0) {
        setSelectedServiceIds(['nanoplastia-treatment']);
      }
    }
  }, [isOpen, preSelectedServiceId]);

  if (!isOpen) return null;

  // Available dates for quick picker (next 14 days)
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    return { dateStr, dayName, dayNum, monthName };
  });

  const timeSlots = [
    { period: 'Morning', slots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'] },
    { period: 'Afternoon', slots: ['01:00 PM', '02:00 PM', '02:30 PM', '03:30 PM', '04:00 PM', '04:30 PM'] },
    { period: 'Evening', slots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'] },
  ];

  const handleToggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((item) => item !== id));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const selectedServices = SALON_SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
  const chosenStylist = STYLISTS.find((s) => s.id === selectedStylistId);

  const handleConfirmBooking = () => {
    if (!clientName.trim()) {
      setValidationError('Please enter your name');
      return;
    }
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number');
      return;
    }

    setValidationError('');

    const newBooking: AppointmentBooking = {
      id: `MIR-${Math.floor(10000 + Math.random() * 90000)}`,
      branchId: salonBranch.id,
      serviceIds: selectedServiceIds,
      stylistId: selectedStylistId,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      gender: genderPreference,
      notes: notes.trim(),
      totalPrice: totalPrice,
      totalDurationMinutes: selectedServices.length * 45,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mirrorist_appointments') || '[]');
      localStorage.setItem('mirrorist_appointments', JSON.stringify([newBooking, ...existing]));
    } catch {}

    setCompletedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep(4);
  };

  const getGoogleCalendarUrl = () => {
    if (!completedBooking) return '#';
    const title = encodeURIComponent(`Mirrorist Salon: ${selectedServices.map(s => s.name).join(', ')}`);
    const details = encodeURIComponent(
      `Appointment at Mirrorist Unisex Salon.\nServices: ${selectedServices.map(s => s.name).join(', ')}\nAddress: ${salonBranch.fullAddress}\nPhone: ${SALON_INFO.primaryPhone}`
    );
    const location = encodeURIComponent(salonBranch.fullAddress);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const getWhatsAppMessage = () => {
    if (!completedBooking) return '';
    const msg = `Hello Mirrorist Salon,%0AI have scheduled an appointment:%0A*Booking ID:* ${completedBooking.id}%0A*Name:* ${completedBooking.clientName}%0A*Date:* ${completedBooking.date}%0A*Time:* ${completedBooking.timeSlot}%0A*Services:* ${selectedServices.map(s => s.name).join(', ')}%0A*Total:* ₹${completedBooking.totalPrice}%0A*Location:* Vaishali Nagar, Jaipur%0APlease confirm my slot!`;
    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#30231F]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl rounded-xl bg-white border border-[#E7D8C8] shadow-2xl overflow-hidden my-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7D8C8] bg-[#F7F2EA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#E7D8C8] flex items-center justify-center text-[#B58A52]">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif-display font-bold text-[#30231F]">
                {step === 4 ? 'Appointment Confirmed' : 'Book Your Salon Appointment'}
              </h2>
              <p className="text-xs text-[#735A4F]">
                {step === 4 ? 'Your appointment slip is ready' : 'Mirrorist Unisex Salon · Vaishali Nagar, Jaipur'}
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

        {/* Wizard progress steps */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#F7F2EA] border-b border-[#E7D8C8] flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#30231F] font-bold' : 'text-[#8F7468]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#30231F] text-white font-bold' : 'bg-[#E7D8C8] text-[#30231F]'}`}>1</span>
              <span>Services</span>
            </div>
            <div className="h-px w-10 bg-[#E7D8C8] hidden sm:block" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#30231F] font-bold' : 'text-[#8F7468]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#30231F] text-white font-bold' : 'bg-[#E7D8C8] text-[#30231F]'}`}>2</span>
              <span>Date & Time</span>
            </div>
            <div className="h-px w-10 bg-[#E7D8C8] hidden sm:block" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#30231F] font-bold' : 'text-[#8F7468]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#30231F] text-white font-bold' : 'bg-[#E7D8C8] text-[#30231F]'}`}>3</span>
              <span>Your Details</span>
            </div>
          </div>
        )}

        {/* Step 1: Services Selection (Single location clearly identified) */}
        {step === 1 && (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Location Banner (Single salon address) */}
            <div className="p-3.5 rounded-lg bg-[#F7F2EA] border border-[#E7D8C8] flex items-center gap-2.5 text-xs text-[#5A453D]">
              <MapPin className="w-4 h-4 text-[#B58A52] shrink-0" />
              <div>
                <strong className="text-[#30231F]">Salon Location:</strong> Plot No. E-21 Shop No. 1, Gupta Store, Opp. Royal Bakery, Hanuman Nagar, Amrapali Circle, Vaishali Nagar, Jaipur
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4D3831]">
                  Select Services ({selectedServiceIds.length} Selected)
                </label>
                <span className="text-xs text-[#30231F] font-bold">
                  Total: ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'treatments', label: 'Nanoplastia & Botox' },
                  { id: 'hair', label: 'Haircuts & Colour' },
                  { id: 'mens', label: "Men's Grooming" },
                  { id: 'skin', label: 'Skin & Facials' },
                  { id: 'bridal', label: 'Bridal' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                      categoryFilter === cat.id
                        ? 'bg-[#30231F] text-white font-bold'
                        : 'bg-white text-[#5A453D] hover:text-[#30231F] border border-[#E7D8C8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Services List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 max-h-[300px] overflow-y-auto pr-1">
                {SALON_SERVICES
                  .filter((s) => categoryFilter === 'all' || s.category === categoryFilter)
                  .map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => handleToggleService(service.id)}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#30231F] bg-[#E7D8C8]/40'
                            : 'border-[#E7D8C8] bg-white hover:border-[#B58A52]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-bold text-[#30231F] leading-tight">
                                {service.name}
                              </h4>
                              {service.popular && (
                                <span className="text-[9px] bg-[#E7D8C8] text-[#30231F] px-1.5 py-0.2 rounded font-bold">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#5A453D] mt-1 line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#30231F] border-[#30231F] text-white' : 'border-[#D8C7B5] bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7D8C8] text-xs">
                          <span className="text-[#735A4F] text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#B58A52]" />
                            {service.duration}
                          </span>
                          <span className="font-bold text-[#30231F]">
                            ₹{service.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Bottom summary bar */}
            <div className="pt-4 border-t border-[#E7D8C8] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#735A4F]">Estimated Starting Total: <span className="text-[#30231F] font-bold">₹{totalPrice.toLocaleString('en-IN')}</span></p>
                <p className="text-[11px] text-[#8F7468]">Pay at salon (Cash / UPI / Card)</p>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={selectedServiceIds.length === 0}
                className="px-5 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-[#B58A52]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date, Time & Stylist */}
        {step === 2 && (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Preferred Stylist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D3831] mb-2">
                1. Select Stylist (Optional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedStylistId('any')}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    selectedStylistId === 'any'
                      ? 'border-[#30231F] bg-[#E7D8C8]/60 text-[#30231F]'
                      : 'border-[#E7D8C8] bg-white text-[#5A453D] hover:border-[#B58A52]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#E7D8C8] mx-auto mb-1.5 flex items-center justify-center text-[#30231F]">
                    <Sparkles className="w-4 h-4 text-[#B58A52]" />
                  </div>
                  <div className="text-xs font-bold">Any Available</div>
                  <p className="text-[10px] text-[#735A4F]">Quickest Slot</p>
                </button>

                {STYLISTS.map((stylist) => (
                  <button
                    key={stylist.id}
                    type="button"
                    onClick={() => setSelectedStylistId(stylist.id)}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      selectedStylistId === stylist.id
                        ? 'border-[#30231F] bg-[#E7D8C8]/60 text-[#30231F]'
                        : 'border-[#E7D8C8] bg-white text-[#5A453D] hover:border-[#B58A52]'
                    }`}
                  >
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      className="w-8 h-8 rounded-full object-cover mx-auto mb-1.5 border border-[#E7D8C8]"
                    />
                    <div className="text-xs font-bold truncate">{stylist.name}</div>
                    <p className="text-[10px] text-[#B58A52] truncate font-medium">{stylist.role.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D3831] mb-2">
                2. Select Date (Next 14 Days)
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateStr;
                  return (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`flex flex-col items-center justify-center min-w-[70px] p-2.5 rounded-lg border text-center transition-all shrink-0 ${
                        isSelected
                          ? 'border-[#30231F] bg-[#30231F] text-white font-bold shadow-xs'
                          : 'border-[#E7D8C8] bg-white text-[#5A453D] hover:border-[#B58A52]'
                      }`}
                    >
                      <span className="text-[10px] uppercase">{item.dayName}</span>
                      <span className="text-base font-bold my-0.5">{item.dayNum}</span>
                      <span className="text-[10px]">{item.monthName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4D3831] mb-2">
                3. Choose Time Slot (Open 10 AM – 9 PM)
              </label>
              <div className="space-y-3">
                {timeSlots.map((group) => (
                  <div key={group.period}>
                    <div className="text-[11px] text-[#735A4F] uppercase font-bold mb-1.5">
                      {group.period}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {group.slots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-1 text-xs rounded-md border text-center transition-all ${
                              isSelected
                                ? 'border-[#30231F] bg-[#30231F] text-white font-bold'
                                : 'border-[#E7D8C8] bg-white text-[#5A453D] hover:border-[#B58A52]'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-[#E7D8C8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-lg border border-[#E7D8C8] text-xs font-semibold text-[#5A453D] hover:text-[#30231F] flex items-center gap-1 cursor-pointer bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTimeSlot}
                className="px-5 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Enter Your Details</span>
                <ChevronRight className="w-4 h-4 text-[#B58A52]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Client Details & Confirmation */}
        {step === 3 && (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {validationError && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#735A4F] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F7F2EA] border border-[#E7D8C8] rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#735A4F] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#F7F2EA] border border-[#E7D8C8] rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#735A4F] absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#F7F2EA] border border-[#E7D8C8] rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                  Gender Preference for Seating
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'unisex', label: 'No Preference' },
                    { val: 'female', label: 'Female' },
                    { val: 'male', label: 'Male' },
                  ].map((g) => (
                    <button
                      key={g.val}
                      type="button"
                      onClick={() => setGenderPreference(g.val as any)}
                      className={`py-2 text-xs rounded-lg border text-center transition-all ${
                        genderPreference === g.val
                          ? 'border-[#30231F] bg-[#30231F] text-white font-bold'
                          : 'border-[#E7D8C8] bg-[#F7F2EA] text-[#5A453D]'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4D3831] mb-1.5">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Previous hair color history, sensitive scalp, event time..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#F7F2EA] border border-[#E7D8C8] rounded-lg p-3 text-xs text-[#30231F] placeholder-[#8F7468] focus:border-[#B58A52] focus:outline-none"
              />
            </div>

            {/* Booking Summary Box */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#E7D8C8]/50 border border-[#D8C7B5] space-y-2 text-xs">
              <div className="font-bold text-[#30231F] flex items-center justify-between">
                <span>Appointment Summary</span>
                <span className="text-[#30231F]">Pay at Salon</span>
              </div>
              <div className="text-[#5A453D] space-y-1">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-[#30231F] font-bold">Vaishali Nagar, Jaipur</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="text-[#30231F] font-bold">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Services:</span>
                  <span className="text-[#30231F] text-right font-medium max-w-[65%]">
                    {selectedServices.map(s => s.name).join(', ')}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-[#D8C7B5] flex justify-between font-bold text-sm text-[#30231F]">
                <span>Estimated Starting Price:</span>
                <span className="text-base text-[#30231F]">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-2 border-t border-[#E7D8C8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-lg border border-[#E7D8C8] text-xs font-semibold text-[#5A453D] hover:text-[#30231F] flex items-center gap-1 cursor-pointer bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-lg bg-[#30231F] hover:bg-[#44322C] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#B58A52]" />
                <span>Confirm Appointment</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Booking Confirmation Pass */}
        {step === 4 && completedBooking && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            
            <div className="w-14 h-14 rounded-full bg-[#E7D8C8] text-[#30231F] mx-auto flex items-center justify-center">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif-display font-bold text-[#30231F]">
                Appointment Booked!
              </h3>
              <p className="text-xs text-[#5A453D]">
                We have registered your slot at Mirrorist Unisex Salon.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="max-w-md mx-auto p-5 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] text-left space-y-3 relative">
              <div className="flex items-center justify-between border-b border-[#E7D8C8] pb-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#735A4F] font-bold">Booking Reference</span>
                  <div className="text-sm font-bold font-mono text-[#30231F]">{completedBooking.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#735A4F] font-bold">Status</span>
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Reserved
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#5A453D]">
                <div>
                  <strong className="text-[#30231F]">Name:</strong> {completedBooking.clientName} ({completedBooking.clientPhone})
                </div>
                <div>
                  <strong className="text-[#30231F]">Address:</strong> {salonBranch.fullAddress}
                </div>
                <div>
                  <strong className="text-[#30231F]">Time:</strong> {completedBooking.date} at {completedBooking.timeSlot}
                </div>
                <div>
                  <strong className="text-[#30231F]">Services:</strong>
                  <ul className="list-disc list-inside mt-0.5 text-[#30231F]">
                    {selectedServices.map(s => (
                      <li key={s.id}>{s.name} (₹{s.price})</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-[#E7D8C8] flex items-center justify-between font-bold text-[#30231F]">
                  <span>Estimated Total (Pay at salon):</span>
                  <span className="text-sm">₹{completedBooking.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#F7F2EA] border border-[#E7D8C8] text-[#30231F] text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
              >
                <CalendarIcon className="w-4 h-4 text-[#B58A52]" />
                <span>Add to Calendar</span>
              </a>

              <a
                href={salonBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#F7F2EA] border border-[#E7D8C8] text-[#30231F] text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
              >
                <MapPin className="w-4 h-4 text-[#B58A52]" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#735A4F] hover:text-[#30231F] underline underline-offset-4 font-medium"
              >
                Done & Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
