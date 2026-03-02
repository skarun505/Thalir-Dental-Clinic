const testimonials = [
    {
        stars: 5,
        text: "My daughter used to cry at the thought of going to the dentist. Now she actually asks when her next visit is! Dr. Priya is magical with kids.",
        name: 'Anita Sharma',
        role: "Aarav's Mom",
        avatarBg: '#6C63FF',
        initial: 'A',
    },
    {
        stars: 5,
        text: "The clinic environment is so colorful and fun. My son got a cavity filled and didn't even realize it was happening. Highly recommend!",
        name: 'Rahul Patel',
        role: "Vihaan's Dad",
        avatarBg: '#FF6B9D',
        initial: 'R',
    },
    {
        stars: 5,
        text: "From the play area to the reward stickers, everything is designed for kids. The staff is incredibly patient and caring. Best dental clinic ever!",
        name: 'Meera Krishnan',
        role: "Diya's Mom",
        avatarBg: '#6BCB77',
        initial: 'M',
    },
    {
        stars: 5,
        text: "Emergency dental care on a Sunday evening — they were there for us! Truly the most dedicated pediatric dental team. Thank you, Dr. Priya!",
        name: 'Suresh Kumar',
        role: "Arjun's Dad",
        avatarBg: '#FFD93D',
        initial: 'S',
    },
    {
        stars: 5,
        text: "The braces treatment for my daughter was so smooth. Regular follow-ups, clear explanations, and her smile transformation is beautiful!",
        name: 'Priya Nair',
        role: "Sanya's Mom",
        avatarBg: '#BA68C8',
        initial: 'P',
    },
];

export default function Testimonials() {
    return (
        <section className="section testimonials-section" id="testimonials">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-comments"></i> What Parents Say</h2>
                <p className="section-subtitle">
                    Real stories from real families who trust us with their children's smiles
                </p>

                <div className="testimonials-slider">
                    {testimonials.map((t, idx) => (
                        <div className="testimonial-card" key={idx}>
                            <div className="testimonial-stars">
                                {Array.from({ length: t.stars }).map((_, i) => (
                                    <i key={i} className="fas fa-star" style={{ color: '#FFD93D' }}></i>
                                ))}
                                {Array.from({ length: 5 - t.stars }).map((_, i) => (
                                    <i key={i} className="far fa-star" style={{ color: '#FFD93D' }}></i>
                                ))}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar" style={{ background: t.avatarBg }}>
                                    {t.initial}
                                </div>
                                <div>
                                    <div className="testimonial-author-name">{t.name}</div>
                                    <div className="testimonial-author-role">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
