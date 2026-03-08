const reasons = [
    {
        icon: 'fas fa-user-doctor',
        bg: '#E0F4FF',
        iconColor: '#4FC3F7',
        title: 'Pediatric Specialist',
        description: "Board-certified pediatric dentists who specialize in children's oral health with years of experience.",
    },
    {
        icon: 'fas fa-hand-holding-heart',
        bg: '#E8F5E9',
        iconColor: '#6BCB77',
        title: 'Pain-Free Treatment',
        description: 'Advanced techniques and gentle care ensure your child feels no pain during any procedure.',
    },
    {
        icon: 'fas fa-palette',
        bg: '#FFF3E0',
        iconColor: '#FF8A65',
        title: 'Kid-Friendly Environment',
        description: 'Colorful clinic with play areas, cartoons, and fun activities to make visits enjoyable.',
    },
    {
        icon: 'fas fa-trophy',
        bg: '#F3E5F5',
        iconColor: '#BA68C8',
        title: 'Reward System',
        description: 'Kids earn stickers, toys, and certificates for being brave, making dentist visits exciting!',
    },
    {
        icon: 'fas fa-ambulance',
        bg: '#FFE0EC',
        iconColor: '#FF6B9D',
        title: 'Emergency Support',
        description: 'Available for dental emergencies. Quick response when your child needs immediate care.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="section why-section" id="why-us">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-heart"></i> Why Parents Love Us</h2>
                <p className="section-subtitle">
                    We go the extra mile to make dental visits a positive experience for every child
                </p>

                <div className="why-grid">
                    {reasons.map((reason, idx) => (
                        <div className="why-card scroll-animate" key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className="why-icon" style={{ background: reason.bg }}>
                                <i className={reason.icon} style={{ color: reason.iconColor }}></i>
                            </div>
                            <div>
                                <h3>{reason.title}</h3>
                                <p>{reason.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
