import { img } from '../lib/getImagePath';

export default function Doctor() {
    return (
        <section className="section doctor-section" id="doctor">
            <div className="container">
                <h2 className="section-title">
                    <i className="fas fa-user-doctor"></i> Meet Our Doctors
                </h2>
                <p className="section-subtitle">
                    Expert pediatric specialists dedicated to your child's smile
                </p>

                {/* Doctors Grid */}
                <div className="doctors-grid scroll-animate">

                    {/* Dr. Midhunraj */}
                    <div className="doctor-profile-card">
                        <div className="doctor-profile-img-wrap">
                            <img
                                src={img('/images/dr-midhunraj.jpeg')}
                                alt="Dr. R. Midhunraj, M.D.S - Pediatric Dentist"
                                loading="lazy"
                            />
                            <div className="doctor-profile-overlay"></div>
                            <div className="doctor-profile-badge">
                                <i className="fas fa-star"></i> Founder & CEO
                            </div>
                        </div>
                        <div className="doctor-profile-info">
                            <h3 className="doctor-profile-name">Dr. R. Midhunraj</h3>
                            <span className="doctor-profile-degree">M.D.S</span>
                            <p className="doctor-profile-role">Pediatric and Preventive Dentist</p>
                            <p className="doctor-profile-desc">
                                I am passionate about making dental visits joyful and fear-free for every child. With compassion, behavior guidance, and advanced pediatric dentistry, I strive to ensure each visit builds trust, confidence, and healthy smiles for life.
                            </p>
                            <div className="doctor-profile-tags">
                                <span>🦷 Laser Dentistry</span>
                                <span>🚨 Trauma Care</span>
                                <span>👶 Pediatric Expert</span>
                            </div>
                        </div>
                    </div>

                    {/* Dr. Pavithra */}
                    <div className="doctor-profile-card">
                        <div className="doctor-profile-img-wrap">
                            <img
                                src={img('/images/dr-pavithra.jpeg')}
                                alt="Dr. K. Pavithra, M.D.S - Pediatric Dentist"
                                loading="lazy"
                                style={{ objectPosition: 'center 12%' }}
                            />
                            <div className="doctor-profile-overlay"></div>
                            <div className="doctor-profile-badge co-founder">
                                <i className="fas fa-star"></i> Co-Founder & Clinical Director
                            </div>
                        </div>
                        <div className="doctor-profile-info">
                            <h3 className="doctor-profile-name">Dr. K. Pavithra</h3>
                            <span className="doctor-profile-degree">M.D.S</span>
                            <p className="doctor-profile-role">Pediatric and Preventive Dentist</p>
                            <p className="doctor-profile-desc">
                                As a pediatric dentist, My practice is built on the foundation of empathy and a deep understanding of kids psychology. I ensure that every child receives high quality dental care in an environment where they feel safe, heard, and empowered.
                            </p>
                            <div className="doctor-profile-tags">
                                <span>❤️ SHCN Dentistry</span>
                                <span>🦷 Orthodontics</span>
                                <span>🌱 Early Intervention</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Clinic Overview Video */}
                <div className="clinic-video-section scroll-animate">
                    <h3 className="clinic-video-title">
                        <i className="fas fa-play-circle" style={{ color: '#6C63FF' }}></i> Fun-Filled Clinic Tour
                    </h3>
                    <p className="clinic-video-subtitle">Take a tour of our child-friendly clinic</p>
                    <div className="clinic-video-wrapper">
                        <video
                            controls
                            preload="metadata"
                            className="clinic-video"
                        >
                            <source src={img('/images/dental-clinic-overview.mp4')} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

            </div>
        </section>
    );
}
