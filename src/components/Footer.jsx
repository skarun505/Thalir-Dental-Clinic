import { img } from '../lib/getImagePath';

export default function Footer() {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={img('/images-optimized/Thalir Logo.webp')} alt="Thalir Dental Logo" />
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
                <a href="https://www.facebook.com/share/r/1ApABCoLcD/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/reel/DYIyRJKDSd9/?utm_source=ig_web_copy_link" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://youtube.com/shorts/vmiqUKolhgg" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="https://www.linkedin.com/feed/update/urn:li:activity:7459029450404544512" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://pin.it/16F1zuwyY" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
                <a href="https://wa.me/919043060968" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>

            <div className="footer-divider"></div>

            <p className="footer-copyright">
                &copy; 2026 Thalir Dental Clinic. All rights reserved.<br />
                Made with <i className="fas fa-heart" style={{ color: '#FF6B9D' }}></i> for little smiles.
            </p>
            <p className="footer-copyright" style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                ✨ Magically designed & developed by <a href="https://subix.in" target="_blank" rel="noopener noreferrer" style={{ color: '#6C63FF', textDecoration: 'none', fontWeight: 'bold' }}>subix.in</a> 🚀
            </p>

        </footer>
    );
}
