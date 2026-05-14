import { img } from '../lib/getImagePath';

export default function Hero({ onBookClick }) {
    return (
        <section className="hero" id="hero">
            <div className="container hero-content">

                {/* Left: Text */}
                <div className="hero-text">
                    <div className="hero-badge">
                        <span>#1 Pediatric Dental Clinic in Erode</span>
                    </div>

                    <div className="hero-mascot">
                        <img src={img('/images/thalir-logo.png')} alt="Thalir Dental Logo" />
                    </div>

                    <h1>
                        Happy Smiles <br />
                        <span className="gradient-text">Start Here!</span>
                    </h1>

                    <p className="hero-subtitle">
                        Gentle, fun &amp; pain-free dental care designed specially for infants, children, and teens.
                        Because every child deserves a sparkling smile!
                    </p>

                    <div className="hero-buttons">
                        <a href="tel:+919043060968" className="btn btn-call btn-large">
                            <i className="fas fa-phone"></i> Call Now
                        </a>
                        <a href="https://wa.me/919043060968" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">
                            <i className="fab fa-whatsapp"></i> WhatsApp Us
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-number">3800+</div>
                            <div className="hero-stat-label">Kids Treated</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number">7+</div>
                            <div className="hero-stat-label">Years of Experience</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-number"><i className="fas fa-star" style={{ color: '#FFD93D', fontSize: '0.8em' }}></i> 4.9</div>
                            <div className="hero-stat-label">Rating</div>
                        </div>
                    </div>
                </div>

                {/* Right: Doctors Image */}
                <div className="hero-doctors-img">
                    {/* Logo badge floating over the doctors image */}
                    <div className="hero-logo-overlay">
                        <img src={img('/images/thalir-logo.png')} alt="Thalir Dental Clinic Logo" />
                    </div>
                    <img
                        src={img('/images/doctors-both.png')}
                        alt="Dr. Midhunraj & Dr. Pavithra — Thalir Dental"
                        loading="eager"
                    />
                </div>

            </div>
        </section>
    );
}
