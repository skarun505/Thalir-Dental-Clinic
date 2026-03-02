import { useState, useEffect } from 'react';

export default function Navbar({ onBookClick }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
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
            </div>
        </nav>
    );
}
