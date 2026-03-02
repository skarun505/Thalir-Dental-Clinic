import { useState, useEffect } from 'react';

export default function Navbar({ onBookClick }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner">
                <a href="#" className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/images/tooth-mascot.png" alt="Thalir Logo" />
                    <span className="navbar-logo-text">Thalir <span>Dental</span></span>
                </a>

                <div className="nav-links">
                    <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a>
                    <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('why-us'); }}>Why Us</a>
                    <a href="#doctor" onClick={(e) => { e.preventDefault(); scrollTo('doctor'); }}>Doctor</a>
                    <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>Gallery</a>
                    <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Reviews</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
                </div>

                <button className="btn btn-primary nav-book-btn" onClick={onBookClick}>
                    <i className="fas fa-calendar-check"></i> Book Now
                </button>

                <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}><i className="fas fa-tooth"></i> Services</a>
                <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('why-us'); }}><i className="fas fa-star"></i> Why Choose Us</a>
                <a href="#doctor" onClick={(e) => { e.preventDefault(); scrollTo('doctor'); }}><i className="fas fa-user-doctor"></i> Meet the Doctor</a>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}><i className="fas fa-images"></i> Gallery</a>
                <a href="#tips" onClick={(e) => { e.preventDefault(); scrollTo('tips'); }}><i className="fas fa-lightbulb"></i> Dental Tips</a>
                <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}><i className="fas fa-comments"></i> Reviews</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}><i className="fas fa-map-marker-alt"></i> Contact</a>
                <button className="btn btn-primary btn-large" onClick={() => { setMenuOpen(false); onBookClick(); }}>
                    <i className="fas fa-calendar-check"></i> Book Appointment
                </button>
            </div>
        </nav>
    );
}
