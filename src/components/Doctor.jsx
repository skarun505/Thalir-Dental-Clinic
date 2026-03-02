export default function Doctor() {
    return (
        <section className="section doctor-section" id="doctor">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-user-doctor"></i> Meet Dr. Priya</h2>
                <p className="section-subtitle">
                    Your child's smile is in the best hands
                </p>

                <div className="doctor-card scroll-animate">
                    <div className="doctor-image-wrapper">
                        <img src="/images/doctor-profile.png" alt="Dr. Priya - Pediatric Dentist" loading="lazy" />
                        <div className="doctor-image-overlay"></div>
                    </div>

                    <div className="doctor-info">
                        <h3 className="doctor-name">Dr. Priya Sharma</h3>
                        <p className="doctor-title">Pediatric Dental Specialist</p>

                        <div className="doctor-qualifications">
                            <span className="doctor-qual-badge">BDS</span>
                            <span className="doctor-qual-badge">MDS Pediatric</span>
                            <span className="doctor-qual-badge">10+ Years Exp.</span>
                            <span className="doctor-qual-badge">5000+ Kids Treated</span>
                        </div>

                        <div className="doctor-message">
                            Every child that walks into our clinic leaves with a brighter smile and a love for dental care.
                            I believe in making dentistry fun, painless, and a positive experience that shapes
                            healthy habits for life!
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
