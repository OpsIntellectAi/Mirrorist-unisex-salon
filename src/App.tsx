import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { LocationMapSection } from './components/LocationMapSection';
import { BlogSection } from './components/BlogSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { AppointmentBooking } from './types/salon';
import { ShieldCheck, Award, Sparkles, CheckCircle, Clock } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);
  
  // Stored appointments
  const [appointments, setAppointments] = useState<AppointmentBooking[]>(() => {
    try {
      const saved = localStorage.getItem('mirrorist_appointments');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenBooking = (serviceId?: string) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: AppointmentBooking) => {
    const updated = [newBooking, ...appointments];
    setAppointments(updated);
    setToastMessage(`Appointment booked successfully! Reference: ${newBooking.id}`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    try {
      localStorage.setItem('mirrorist_appointments', JSON.stringify(updated));
    } catch {}
    setToastMessage('Appointment removed from your device.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA] text-[#30231F] flex flex-col font-sans selection:bg-[#E7D8C8] selection:text-[#30231F]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#30231F] text-white text-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 border border-[#B58A52] animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#B58A52]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        appointmentCount={appointments.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Why Mirrorist / Standards Bar */}
        <section id="why-mirrorist" className="border-b border-[#E7D8C8] bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-wider text-[#B58A52] font-bold">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#30231F] mt-1">
                A Salon Built on Honest Care & Quality
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              
              <div className="p-4 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] text-center space-y-1.5 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E7D8C8] flex items-center justify-center text-[#B58A52] mx-auto shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#30231F]">Experienced Stylists</h3>
                <p className="text-xs text-[#5A453D] leading-relaxed">
                  Trained hair and makeup specialists who consult with you before picking up scissors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] text-center space-y-1.5 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E7D8C8] flex items-center justify-center text-[#B58A52] mx-auto shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#30231F]">Genuine Salon Brands</h3>
                <p className="text-xs text-[#5A453D] leading-relaxed">
                  Only authentic, sealed products opened right in front of you at the styling mirror.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] text-center space-y-1.5 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E7D8C8] flex items-center justify-center text-[#B58A52] mx-auto shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#30231F]">Clean & Sanitized</h3>
                <p className="text-xs text-[#5A453D] leading-relaxed">
                  Sterilized scissors, fresh disposable towels, and clean cape gowns for every client.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F2EA] border border-[#E7D8C8] text-center space-y-1.5 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E7D8C8] flex items-center justify-center text-[#B58A52] mx-auto shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#30231F]">Open Every Day</h3>
                <p className="text-xs text-[#5A453D] leading-relaxed">
                  10:00 AM to 9:00 PM, 7 days a week. Quick appointment booking or walk-in service.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Services & Pricing Menu */}
        <ServicesSection onBookService={handleOpenBooking} />

        {/* Find Nearest Salon (Google Maps & Locations) */}
        <LocationMapSection />

        {/* Hair & Beauty Tips (Blog) */}
        <BlogSection onBookService={handleOpenBooking} />

        {/* Real Customer Feedback */}
        <TestimonialsSection />

        {/* Contact Form & Social Profiles */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating Mobile Dock */}
      <FloatingDock onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* My Appointments Modal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => {
          setIsMyAppointmentsOpen(false);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}
