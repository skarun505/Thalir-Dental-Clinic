import { useState, useEffect } from 'react';
import { img } from '../lib/getImagePath';

export default function Navbar({ onBookClick }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const scrollTo = (id) => {
        setMenuOpen(false);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    const navLinks = [
        { label: 'Services',     id: 'specialties' },
        { label: 'Why Us',       id: 'why-us' },
        { label: 'Doctor',       id: 'doctor' },
        { label: 'Gallery',      id: 'gallery' },
        { label: 'Blog',         id: 'blog' },
        { label: 'Reviews',      id: 'testimonials' },
        { label: 'Contact',      id: 'contact' },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    <a href="#" className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={img('/images-optimized/thalir-logo.webp')} alt="Thalir Logo" />
                    </a>

                    {/* Desktop links */}
                    <div className="nav-links">
                        {navLinks.map(({ label, id }) => (
                            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                                {label}
                            </a>
                        ))}
                    </div>

                    <div className="navbar-right">
                        <button className="btn btn-primary nav-book-btn" onClick={onBookClick}>
                            <i className="fas fa-calendar-check"></i> Book Now
                        </button>
                        {/* Hamburger — mobile only */}
                        <button
                            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={menuOpen}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div className={`mobile-nav-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-nav-header">
                        <img src={img('/images-optimized/thalir-logo.webp')} alt="Thalir Logo" className="mobile-nav-logo" />
                        <button className="mobile-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <nav className="mobile-nav-links">
                        {navLinks.map(({ label, id }) => (
                            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="mobile-nav-actions">
                        <a href="tel:+919043060968" className="btn btn-call" style={{ flex: 1, textAlign: 'center' }}>
                            <i className="fas fa-phone"></i> Call
                        </a>
                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setMenuOpen(false); onBookClick(); }}>
                            <i className="fas fa-calendar-check"></i> Book Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

