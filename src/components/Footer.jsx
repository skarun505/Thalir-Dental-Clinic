import { img } from '../lib/getImagePath';

export default function Footer() {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={img('/images/Thalir Logo.png')} alt="Thalir Dental Logo" />
            </div>
            <p className="footer-text">
                Making dental care fun, gentle, and memorable for every child.
                Because happy smiles start here!
            </p>

            <div className="footer-links">
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a>
                <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollTo('why-us'); }}>Why Us</a>
                <a href="#doctor" onClick={(e) => { e.preventDefault(); scrollTo('doctor'); }}>Doctor</a>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>Clinic Tour</a>
                <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Reviews</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
            </div>

            <div className="footer-social">
                <a href="#" className="footer-social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="footer-social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" className="footer-social-icon" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="https://wa.me/919043060968" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>

            <div className="footer-divider"></div>

            <p className="footer-copyright">
                &copy; 2026 Thalir Dental Clinic. All rights reserved.<br />
                Made with <i className="fas fa-heart" style={{ color: '#FF6B9D' }}></i> for little smiles.
            </p>


        </footer>
    );
}
