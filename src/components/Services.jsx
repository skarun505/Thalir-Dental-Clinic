const services = [
    {
        icon: 'fas fa-cut',
        title: 'Tongue & Lip Tie Specialty',
        description: 'Precision laser care for tongue and lip ties. Restoring the joy of breastfeeding.',
        color: 'pink',
    },
    {
        icon: 'fas fa-hand-holding-heart',
        title: 'Special Healthcare Needs Dentistry',
        description: "Sensory-friendly dental care tailored to your child's unique rhythm and needs.",
        color: 'blue',
    },
    {
        icon: 'fas fa-shield-alt',
        title: 'Preventive Oral Care',
        description: "Proactive protection and parental education to keep your child's teeth strong from their very first visit.",
        color: 'green',
    },
    {
        icon: 'fas fa-lungs',
        title: 'Airway Dentistry',
        description: 'We look beyond the teeth to ensure your child breathes, sleeps, and grows to their fullest potential.',
        color: 'purple',
    },
    {
        icon: 'fas fa-teeth',
        title: 'Early Orthodontic Treatment',
        description: 'Early intervention and correction of oral habits creates the space for healthy adult teeth and a balanced, confident profile.',
        color: 'orange',
    },
    {
        icon: 'fas fa-smile-beam',
        title: 'Pain Free Dentistry',
        description: 'Our safe sedation options ensure your child gets a healthy smile and zero anxiety.',
        color: 'yellow',
    },
    {
        icon: 'fas fa-baby',
        title: 'Pregnancy Oral Care',
        description: 'Our prenatal dental guidance ensures a healthy environment for both mom and baby to thrive.',
        color: 'pink',
    },
    {
        icon: 'fas fa-futbol',
        title: 'Sports Dentistry',
        description: 'We provide the specialized trauma management and custom-fit mouthguards your child needs to compete with total confidence.',
        color: 'blue',
    },
];

export default function Services() {
    return (
        <section className="section" id="services">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-star"></i> Our Specialties</h2>
                <p className="section-subtitle">
                    Comprehensive, specialized dental care designed to nurture every aspect of your child's oral health
                </p>

                <div className="services-grid">
                    {services.map((service, idx) => (
                        <div className="service-card scroll-animate" key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className={`service-icon ${service.color}`}>
                                <i className={service.icon}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
