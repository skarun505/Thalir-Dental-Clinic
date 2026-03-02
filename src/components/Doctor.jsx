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
                            <span className="doctor-qual-badge">7+ Years of Experience</span>
                            <span className="doctor-qual-badge">3800+ Kids Treated</span>
                        </div>

                        <div className="doctor-message">
                            Every child that walks into our clinic leaves with a brighter smile and a love for dental care.
                            I believe in making dentistry fun, painless, and a positive experience that shapes
                            healthy habits for life!
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="team-section scroll-animate">
                    <h3 className="team-section-title"><i className="fas fa-users" style={{ color: '#4FC3F7' }}></i> Meet Our Friendly Team</h3>
                    <p className="team-section-subtitle">The amazing people who make every visit special</p>

                    <div className="team-grid">
                        <div className="team-member-card">
                            <div className="team-member-img">
                                <img src="https://i.pravatar.cc/300?img=11" alt="Dr. Rajesh Kumar" loading="lazy" />
                            </div>
                            <div className="team-member-info">
                                <h4>Dr. Rajesh Kumar</h4>
                                <p>Orthodontist (Braces Specialist)</p>
                            </div>
                        </div>

                        <div className="team-member-card">
                            <div className="team-member-img">
                                <img src="https://i.pravatar.cc/300?img=5" alt="Ananya Singh" loading="lazy" />
                            </div>
                            <div className="team-member-info">
                                <h4>Ananya Singh</h4>
                                <p>Pediatric Dental Assistant</p>
                            </div>
                        </div>

                        <div className="team-member-card">
                            <div className="team-member-img">
                                <img src="https://i.pravatar.cc/300?img=9" alt="Meera Menon" loading="lazy" />
                            </div>
                            <div className="team-member-info">
                                <h4>Meera Menon</h4>
                                <p>Patient Care Coordinator</p>
                            </div>
                        </div>

                        <div className="team-member-card">
                            <div className="team-member-img">
                                <img src="https://i.pravatar.cc/300?img=12" alt="Karthik Raj" loading="lazy" />
                            </div>
                            <div className="team-member-info">
                                <h4>Karthik Raj</h4>
                                <p>Clinic Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
