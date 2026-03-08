const specialties = [
    {
        icon: 'fas fa-heart',
        emoji: '🤱',
        title: 'Tongue & Lip Tie Specialty',
        tagline: 'Restoring the Joy of Breastfeeding',
        description: 'Precision laser care for tongue and lip ties, restoring the joy of breastfeeding.',
        highlight: 'Laser Precision',
        color: '#FF6B9D',
        bg: '#FFE0EC',
        pastel: '#FFF0F6',
    },
    {
        icon: 'fas fa-hand-holding-heart',
        emoji: '💜',
        title: 'Special Needs Dentistry',
        tagline: 'Care at Your Child\'s Pace',
        description: "Sensory-friendly dental care tailored to your child's own rhythm and unique needs.",
        highlight: 'Sensory Friendly',
        color: '#6C63FF',
        bg: '#EDE9FF',
        pastel: '#F5F3FF',
    },
    {
        icon: 'fas fa-shield-alt',
        emoji: '🛡️',
        title: 'Preventive Oral Care',
        tagline: 'Strong Teeth from Day One',
        description: "Proactive care to keep your child's teeth healthy and strong from the very first.",
        highlight: 'Starting from Birth',
        color: '#6BCB77',
        bg: '#E8F5E9',
        pastel: '#F2FBF3',
    },
    {
        icon: 'fas fa-lungs',
        emoji: '🌬️',
        title: 'Airway Dentistry',
        tagline: 'Breathe, Sleep & Grow Fully',
        description: 'We look beyond teeth to help your child breathe, sleep, and grow with confidence.',
        highlight: 'Beyond the Teeth',
        color: '#4FC3F7',
        bg: '#E0F4FF',
        pastel: '#F0FAFF',
    },
    {
        icon: 'fas fa-teeth',
        emoji: '😁',
        title: 'Early Orthodontic Care',
        tagline: 'Shaping Confident Smiles Early',
        description: 'Early habit correction creates the space for healthy adult teeth and great smiles.',
        highlight: 'Early Intervention',
        color: '#BA68C8',
        bg: '#F3E5F5',
        pastel: '#FAF2FC',
    },
    {
        icon: 'fas fa-smile-beam',
        emoji: '😊',
        title: 'Pain Free Dentistry',
        tagline: 'Smiles Without the Stress',
        description: 'Safe sedation ensures your child gets a healthy smile with absolutely no anxiety.',
        highlight: 'Zero Anxiety',
        color: '#FFD93D',
        bg: '#FFF9E0',
        pastel: '#FFFDF0',
    },
    {
        icon: 'fas fa-baby',
        emoji: '🤰',
        title: 'Pregnancy Oral Care',
        tagline: 'Healthy Mom, Healthy Baby',
        description: 'Prenatal dental guidance ensuring a healthy and safe environment for mom and baby.',
        highlight: 'For Moms-to-Be',
        color: '#FF8A65',
        bg: '#FFF3E0',
        pastel: '#FFF8F5',
    },
    {
        icon: 'fas fa-futbol',
        emoji: '⚽',
        title: 'Sports Dentistry',
        tagline: 'Compete with Total Confidence',
        description: 'Specialized mouthguards and trauma care help your child compete with confidence.',
        highlight: 'Custom Mouthguards',
        color: '#26C6DA',
        bg: '#E0F7FA',
        pastel: '#F0FEFF',
    },
];

export default function Specialties() {
    return (
        <section className="section specialties-section" id="specialties">
            <div className="container">
                <div className="specialties-header scroll-animate">
                    <div className="specialties-badge">
                        <i className="fas fa-certificate"></i>
                        &nbsp; 8 Specialized Services
                    </div>
                    <h2 className="section-title">
                        <span className="gradient-text">What We Specialize In</span>
                    </h2>
                    <p className="section-subtitle">
                        From newborns to teens, from laser precision to sports protection,
                        every child's smile is in expert hands at Thalir.
                    </p>
                </div>

                <div className="specialties-grid">
                    {specialties.map((item, idx) => (
                        <div
                            className="specialty-card scroll-animate"
                            key={idx}
                            style={{ animationDelay: `${idx * 0.08}s`, '--card-color': item.color }}
                        >
                            <div className="specialty-top" style={{ background: item.bg }}>
                                <div className="specialty-emoji">{item.emoji}</div>
                                <div className="specialty-highlight-badge" style={{ color: item.color, background: item.pastel }}>
                                    <i className="fas fa-check-circle"></i> {item.highlight}
                                </div>
                            </div>

                            <div className="specialty-body">
                                <div className="specialty-icon-wrap" style={{ background: item.bg }}>
                                    <i className={item.icon} style={{ color: item.color }}></i>
                                </div>
                                <h3 className="specialty-title">{item.title}</h3>
                                <p className="specialty-tagline" style={{ color: item.color }}>{item.tagline}</p>
                                <p className="specialty-desc">{item.description}</p>
                            </div>

                            <div className="specialty-glow" style={{ background: item.color }}></div>
                        </div>
                    ))}
                </div>

                {/* CTA Strip */}
                <div className="specialties-cta scroll-animate">
                    <div className="specialties-cta-inner">
                        <div className="specialties-cta-text">
                            <span className="specialties-cta-emoji">🌟</span>
                            <div>
                                <h3>Not Sure Which Service Your Child Needs?</h3>
                                <p>Book a free consultation. Our specialists will guide you to the right care.</p>
                            </div>
                        </div>
                        <a href="https://wa.me/919043060968" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                            <i className="fab fa-whatsapp"></i> Ask on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
