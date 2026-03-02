export default function Contact() {
    return (
        <section className="section contact-section" id="contact">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-map-marker-alt"></i> Find Us</h2>
                <p className="section-subtitle">
                    We're just around the corner! Visit our kid-friendly clinic today.
                </p>

                <div className="contact-grid">
                    <div>
                        <div className="contact-info-cards">
                            <div className="contact-info-card">
                                <div className="contact-icon"><i className="fas fa-map-marker-alt" style={{ color: '#FF6B9D' }}></i></div>
                                <div>
                                    <h4>Our Location</h4>
                                    <p>424, Dr. Amsa Subramaniyam Hospital Complex, Brough Road, Erode – 638001</p>
                                    <p style={{ fontSize: '0.78rem', marginTop: '4px', color: '#BA68C8', fontWeight: 700 }}>
                                        📍 Next to Saveetha Hospital Signal
                                    </p>
                                </div>
                            </div>

                            <a href="tel:+919043060968" className="contact-info-card">
                                <div className="contact-icon"><i className="fas fa-phone" style={{ color: '#4FC3F7' }}></i></div>
                                <div>
                                    <h4>Call Us</h4>
                                    <p>+91 90430 60968</p>
                                </div>
                            </a>

                            <a href="https://wa.me/919043060968" target="_blank" rel="noopener noreferrer" className="contact-info-card">
                                <div className="contact-icon"><i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i></div>
                                <div>
                                    <h4>WhatsApp</h4>
                                    <p>Chat with us instantly</p>
                                </div>
                            </a>

                            <div className="contact-info-card">
                                <div className="contact-icon"><i className="fas fa-clock" style={{ color: '#6C63FF' }}></i></div>
                                <div>
                                    <h4>Working Hours</h4>
                                    <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                                </div>
                            </div>

                            <a href="mailto:thalirkidsdental@gmail.com" className="contact-info-card">
                                <div className="contact-icon"><i className="fas fa-envelope" style={{ color: '#BA68C8' }}></i></div>
                                <div>
                                    <h4>Email</h4>
                                    <p>thalirkidsdental@gmail.com</p>
                                </div>
                            </a>
                        </div>

                        <div className="contact-buttons" style={{ marginTop: '24px' }}>
                            <a href="tel:+919043060968" className="btn btn-call">
                                <i className="fas fa-phone"></i> Call Now
                            </a>
                            <a href="https://wa.me/919043060968" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                                <i className="fab fa-whatsapp"></i> WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.7!2d77.7246!3d11.3428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f46e8a5a453%3A0x387e3f9b7c3e4e9a!2sBrough%20Rd%2C%20Erode%20Fort%2C%20Erode%2C%20Tamil%20Nadu%20638001!5e0!3m2!1sen!2sin!4v1709369600000"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Thalir Dental Clinic Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
