import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FreeBanner from './components/FreeBanner';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Doctor from './components/Doctor';
import Gallery from './components/Gallery';
import DentalTips from './components/DentalTips';
import NoCavityClub from './components/NoCavityClub';
import Testimonials from './components/Testimonials';
import SmileOfMonth from './components/SmileOfMonth';
import LimitedBanner from './components/LimitedBanner';
import Specialties from './components/Specialties';
import Contact from './components/Contact';
import BookingForm from './components/BookingForm';
import StickyBar from './components/StickyBar';
import ExitPopup from './components/ExitPopup';
import Footer from './components/Footer';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar onBookClick={openBooking} />
      <main>
        <Hero onBookClick={openBooking} />
        <FreeBanner onBookClick={openBooking} />
        <Services />
        <LimitedBanner onBookClick={openBooking} />
        <Specialties />
        <WhyChooseUs />
        <Doctor />
        <Gallery />
        <NoCavityClub />
        <DentalTips />
        <SmileOfMonth />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <StickyBar onBookClick={openBooking} />
      <BookingForm isOpen={bookingOpen} onClose={closeBooking} />
      <ExitPopup onBookClick={openBooking} />
    </>
  );
}

export default App;
