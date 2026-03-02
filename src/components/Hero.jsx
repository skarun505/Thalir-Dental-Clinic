export default function Hero({ onBookClick }) {
    return (
        <section className="hero" id="hero">
            <div className="container hero-content">
                <div className="hero-badge">
                    <i className="fas fa-award" style={{ color: '#FFD93D' }}></i>
                    #1 Pediatric Dental Clinic in Town
                </div>

                <div className="hero-mascot">
                    <img src="/images/tooth-mascot.png" alt="Thalir Dental Mascot" />
                </div>

                <h1>
                    Happy Smiles <br />
                    <span className="gradient-text">Start Here!</span>
                </h1>

                <p className="hero-subtitle">
                    Gentle, fun & pain-free dental care designed specially for your little ones.
                    Because every child deserves a sparkling smile!
                </p>

                <div className="hero-buttons">
                    <button className="btn btn-primary btn-large" onClick={onBookClick}>
                        <i className="fas fa-calendar-check"></i> Book Appointment
                    </button>
                    <a href="tel:+919043060968" className="btn btn-call btn-large">
                        <i className="fas fa-phone"></i> Call Now
                    </a>
                </div>

                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-number">5000+</div>
                        <div className="hero-stat-label">Happy Kids</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-number">10+</div>
                        <div className="hero-stat-label">Years Exp.</div>
                    </div>
                    <div className="hero-stat">
                        <div className="hero-stat-number"><i className="fas fa-star" style={{ color: '#FFD93D', fontSize: '0.8em' }}></i> 4.9</div>
                        <div className="hero-stat-label">Rating</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
