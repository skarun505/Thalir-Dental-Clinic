import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Doctor from './components/Doctor';
import Gallery from './components/Gallery';
import DentalTips from './components/DentalTips';
import NoCavityClub from './components/NoCavityClub';
import ClinicScroll from './components/ClinicScroll';
import Testimonials from './components/Testimonials';
import SmileOfMonth from './components/SmileOfMonth';
import Specialties from './components/Specialties';
import Contact from './components/Contact';
import BookingForm from './components/BookingForm';
import StickyBar from './components/StickyBar';
import ExitPopup from './components/ExitPopup';
import Footer from './components/Footer';
import Blog from './components/Blog';

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
        <Doctor />
        <Gallery />
        <Specialties />
        <NoCavityClub />
        <WhyChooseUs />
        <Blog />
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
