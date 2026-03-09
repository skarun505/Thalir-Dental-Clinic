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
                            <p className="doctor-profile-clinic">Thalir Kids Speciality Dental Clinic</p>
                            <p className="doctor-profile-desc">
                                A specialist in Pediatric Laser Dentistry and utilizes advanced technology to provide minimally invasive treatments. He is highly sought after for his expertise in managing traumatic dental injuries, providing specialized emergency care for children when they need it most.
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
                            <p className="doctor-profile-clinic">Thalir Kids Speciality Dental Clinic</p>
                            <p className="doctor-profile-desc">
                                Specialized in Special Health Care Needs (SHCN) dentistry, she has a remarkable ability to adapt her clinical approach to suit the sensory, physical, and developmental requirements of the special ones. She is an expert in early orthodontic treatment. By identifying growth issues in earliest stages, she uses interceptive techniques to guide jaw and tooth development.
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
                            poster={img('/images/clinic-interior.png')}
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
