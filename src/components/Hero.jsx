import { img } from '../lib/getImagePath';

// Clinic interior photos shown below the stats strip
const interiorPhotos = [
    { src: img('/images/IMG_4547.jpeg'), label: 'Welcoming Reception' },
    { src: img('/images/IMG_4548.jpeg'), label: 'Treatment Room' },
    { src: img('/images/IMG_4551.jpeg'), label: 'Comfortable Care Space' },
    { src: img('/images/IMG_4552.jpeg'), label: 'Advanced Equipment' },
    { src: img('/images/IMG_4554.jpeg'), label: 'Fun Play Area' },
    { src: img('/images/IMG_4555.jpeg'), label: 'Happy Patients' },
];

export default function Hero({ onBookClick }) {
    return (
        <section className="hero" id="hero">
            <div className="container hero-content">
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

            {/* Clinic Interior Photo Strip — below experience & rating */}
            <div className="hero-interior-strip">
                <div className="hero-interior-label">
                    <i className="fas fa-hospital"></i> Inside Our Clinic
                </div>
                <div className="hero-interior-scroll">
                    {interiorPhotos.map((photo, idx) => (
                        <div className="hero-interior-item" key={idx}>
                            <img src={photo.src} alt={photo.label} loading="lazy" />
                            <span className="hero-interior-caption">{photo.label}</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {interiorPhotos.map((photo, idx) => (
                        <div className="hero-interior-item" key={`dup-${idx}`} aria-hidden="true">
                            <img src={photo.src} alt={photo.label} loading="lazy" />
                            <span className="hero-interior-caption">{photo.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
