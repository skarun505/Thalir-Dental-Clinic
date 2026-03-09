import { img } from '../lib/getImagePath';

const reviewImages = [
    img('/images/IMG_6464.jpg'),
    img('/images/IMG_6465.jpg'),
    img('/images/IMG_6466.jpg'),
    img('/images/IMG_6467.jpg'),
    img('/images/IMG_6468.jpg'),
    img('/images/IMG_6469.jpg'),
    img('/images/IMG_6470.jpg'),
    img('/images/IMG_6471.jpg'),
    img('/images/IMG_6472.jpg'),
    img('/images/IMG_6473.jpg'),
    img('/images/IMG_6474.jpg'),
    img('/images/IMG_6475.jpg'),
    img('/images/IMG_6476.jpg'),
];

export default function Testimonials() {
    return (
        <section className="section testimonials-section" id="testimonials">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-star" style={{ color: '#FFD93D' }}></i> Google Reviews</h2>
                <p className="section-subtitle">
                    Real stories from real families who trust us with their children's smiles
                </p>

                {/* Google Rating Badge */}
                <div className="google-rating-badge scroll-animate">
                    <div className="google-rating-score">
                        <span className="google-score-number">4.9</span>
                        <div>
                            <div className="google-stars">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <i key={i} className="fas fa-star" style={{ color: '#FFD93D' }}></i>
                                ))}
                            </div>
                            <span className="google-review-count">Based on Google Reviews</span>
                        </div>
                    </div>
                    <div className="google-logo">
                        <i className="fab fa-google" style={{ color: '#4285F4', fontSize: '1.8rem' }}></i>
                        <span>Google</span>
                    </div>
                </div>

                {/* Real Review Screenshots */}
                <div className="reviews-grid scroll-animate">
                    {reviewImages.map((img, idx) => (
                        <div className="review-screenshot-card" key={idx}>
                            <img
                                src={img}
                                alt={`Google review ${idx + 1} for Thalir Kids Dental`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
