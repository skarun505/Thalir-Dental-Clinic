const services = [
    {
        icon: 'fas fa-cut',
        title: 'Tongue & Lip Tie Specialty',
        description: 'Precision laser care for tongue and lip ties, restoring the joy of breastfeeding.',
        color: 'pink',
    },
    {
        icon: 'fas fa-hand-holding-heart',
        title: 'Special Needs Dentistry',
        description: "Sensory-friendly dental care tailored to your child's own rhythm and unique needs.",
        color: 'blue',
    },
    {
        icon: 'fas fa-shield-alt',
        title: 'Preventive Oral Care',
        description: "Proactive care to keep your child's teeth healthy and strong from the very first.",
        color: 'green',
    },
    {
        icon: 'fas fa-lungs',
        title: 'Airway Dentistry',
        description: 'We look beyond teeth to help your child breathe, sleep, and grow with confidence.',
        color: 'purple',
    },
    {
        icon: 'fas fa-teeth',
        title: 'Early Orthodontic Care',
        description: 'Early habit correction creates the space for healthy adult teeth and great smiles.',
        color: 'orange',
    },
    {
        icon: 'fas fa-smile-beam',
        title: 'Pain Free Dentistry',
        description: 'Safe sedation ensures your child gets a healthy smile with absolutely no anxiety.',
        color: 'yellow',
    },
    {
        icon: 'fas fa-baby',
        title: 'Pregnancy Oral Care',
        description: 'Prenatal dental guidance ensuring a healthy and safe environment for mom and baby.',
        color: 'pink',
    },
    {
        icon: 'fas fa-futbol',
        title: 'Sports Dentistry',
        description: 'Specialized mouthguards and trauma care help your child compete with confidence.',
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
