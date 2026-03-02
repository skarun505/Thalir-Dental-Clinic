const services = [
    {
        icon: 'fas fa-broom',
        title: 'Tooth Cleaning',
        description: 'Professional cleaning to keep little teeth sparkling bright',
        color: 'blue',
    },
    {
        icon: 'fas fa-shield-alt',
        title: 'Fluoride Treatment',
        description: 'Strengthen enamel and prevent cavities naturally',
        color: 'green',
    },
    {
        icon: 'fas fa-tooth',
        title: 'Cavity Filling',
        description: 'Gentle and painless fillings with fun colored options',
        color: 'pink',
    },
    {
        icon: 'fas fa-teeth',
        title: 'Braces & Aligners',
        description: 'Perfectly aligned smiles with comfortable braces',
        color: 'purple',
    },
    {
        icon: 'fas fa-hand-wave',
        title: 'First Visit',
        description: 'Friendly introduction to make dentist visits fun',
        color: 'yellow',
    },
    {
        icon: 'fas fa-truck-medical',
        title: 'Emergency Care',
        description: 'Emergency dental care when your child needs it',
        color: 'orange',
    },
];

export default function Services() {
    return (
        <section className="section" id="services">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-tooth"></i> Our Services</h2>
                <p className="section-subtitle">
                    Comprehensive dental care designed to make every visit a happy experience for your child
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
