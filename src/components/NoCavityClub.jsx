import { useState, useEffect, useRef } from 'react';

const clubPhotos = [
    { src: '/images/IMG_3128.JPG', alt: 'No Cavity Club member with certificate' },
    { src: '/images/IMG_5653.jpg', alt: 'Happy No Cavity Club member' },
    { src: '/images/IMG_5676.jpeg', alt: 'Proud No Cavity Club member' },
    { src: '/images/IMG_5817.jpeg', alt: 'No Cavity Club member celebrating' },
    { src: '/images/IMG_5884.jpeg', alt: 'Smiling No Cavity Club member' },
    { src: '/images/IMG_5935.jpeg', alt: 'No Cavity Club member with thumbs up' },
    { src: '/images/IMG_6180.jpeg', alt: 'No Cavity Club member showing certificate' },
    { src: '/images/IMG_6247.jpeg', alt: 'No Cavity Club member happy visit' },
    { src: '/images/IMG_6248.jpeg', alt: 'No Cavity Club member proud smile' },
    { src: '/images/IMG_6410.jpeg', alt: 'No Cavity Club member holding badge' },
];


const benefits = [
    { icon: 'fas fa-certificate', text: 'Official membership certificate' },
    { icon: 'fas fa-gift', text: 'Surprise gift bag on every visit' },
    { icon: 'fas fa-star', text: 'Gold star badge to wear proudly' },
    { icon: 'fas fa-camera', text: 'Photo on our Wall of Fame' },
];

export default function NoCavityClub() {
    const [activeSlide, setActiveSlide] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % clubPhotos.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            const scrollTo = activeSlide * sliderRef.current.offsetWidth;
            sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }, [activeSlide]);

    return (
        <section className="section ncc-section" id="no-cavity-club">
            <div className="container">
                {/* Header */}
                <div className="ncc-header scroll-animate">
                    <span className="ncc-badge">
                        <i className="fas fa-shield-alt"></i> New Initiative
                    </span>
                    <h2 className="section-title">
                        <i className="fas fa-tooth"></i> No Cavity Club
                    </h2>
                    <p className="section-subtitle">
                        Our exciting new initiative to make cavity prevention fun and rewarding for every child!
                    </p>
                </div>

                {/* Photo Carousel */}
                <div className="ncc-carousel-wrapper scroll-animate">
                    <div className="ncc-carousel" ref={sliderRef}>
                        {clubPhotos.map((photo, idx) => (
                            <div className="ncc-slide" key={idx}>
                                <img src={photo.src} alt={photo.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                    <div className="ncc-dots">
                        {clubPhotos.map((_, idx) => (
                            <button
                                key={idx}
                                className={`ncc-dot ${activeSlide === idx ? 'active' : ''}`}
                                onClick={() => setActiveSlide(idx)}
                                aria-label={`View photo ${idx + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="ncc-info-grid">
                    {/* What is it */}
                    <div className="ncc-info-card scroll-animate">
                        <div className="ncc-info-icon" style={{ background: '#E0F4FF' }}>
                            <i className="fas fa-question-circle" style={{ color: '#4FC3F7' }}></i>
                        </div>
                        <h3>What is the No Cavity Club?</h3>
                        <p>
                            The No Cavity Club is our special program that celebrates children who maintain
                            healthy, cavity-free teeth! It's a fun way to motivate kids to take excellent
                            care of their oral health and make dental visits something to look forward to.
                        </p>
                    </div>

                    {/* How to join */}
                    <div className="ncc-info-card scroll-animate">
                        <div className="ncc-info-icon" style={{ background: '#E8F5E9' }}>
                            <i className="fas fa-clipboard-check" style={{ color: '#6BCB77' }}></i>
                        </div>
                        <h3>How Do Kids Become Members?</h3>
                        <p>
                            It's simple! When your child visits Thalir Dental Clinic for their regular check-up
                            and the dentist confirms <strong>zero cavities</strong>, they're officially inducted into the
                            No Cavity Club! They receive a personalized membership certificate, a special badge,
                            and their photo goes up on our Wall of Fame.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="ncc-info-card ncc-steps-card scroll-animate">
                        <div className="ncc-info-icon" style={{ background: '#F3E5F5' }}>
                            <i className="fas fa-list-ol" style={{ color: '#BA68C8' }}></i>
                        </div>
                        <h3>3 Simple Steps to Join</h3>
                        <div className="ncc-steps">
                            <div className="ncc-step">
                                <div className="ncc-step-number" style={{ background: '#6C63FF' }}>1</div>
                                <div>
                                    <strong>Visit Us</strong>
                                    <p>Schedule a regular dental check-up at Thalir Dental</p>
                                </div>
                            </div>
                            <div className="ncc-step">
                                <div className="ncc-step-number" style={{ background: '#FF6B9D' }}>2</div>
                                <div>
                                    <strong>Get Checked</strong>
                                    <p>Our dentist examines your child's teeth thoroughly</p>
                                </div>
                            </div>
                            <div className="ncc-step">
                                <div className="ncc-step-number" style={{ background: '#6BCB77' }}>3</div>
                                <div>
                                    <strong>Zero Cavities = Member!</strong>
                                    <p>No cavities found? Congratulations, welcome to the club!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div className="ncc-benefits scroll-animate">
                    <h3><i className="fas fa-gift"></i> Club Member Benefits</h3>
                    <div className="ncc-benefits-grid">
                        {benefits.map((benefit, idx) => (
                            <div className="ncc-benefit-item" key={idx}>
                                <div className="ncc-benefit-icon">
                                    <i className={benefit.icon}></i>
                                </div>
                                <span>{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="ncc-cta scroll-animate">
                    <p>
                        <i className="fas fa-sparkles"></i> Want your child to be a <strong>No Cavity Club</strong> member?
                    </p>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        <button className="btn btn-primary btn-large">
                            <i className="fas fa-calendar-check"></i> Book a Check-up Today
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
