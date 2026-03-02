const tips = [
    {
        bg: '#6C63FF',
        title: 'Start Early',
        text: "Begin brushing as soon as the first tooth appears. Use a soft-bristled infant toothbrush with water.",
    },
    {
        bg: '#FF6B9D',
        title: 'Brush Twice Daily',
        text: 'Make brushing a fun morning and evening routine. Use fluoride toothpaste after age 2.',
    },
    {
        bg: '#6BCB77',
        title: 'Limit Sugary Snacks',
        text: 'Replace candy and soda with fruits and water. Less sugar means fewer cavities!',
    },
    {
        bg: '#FFD93D',
        title: 'Regular Check-ups',
        text: 'Visit the dentist every 6 months. Early detection prevents bigger problems later.',
    },
    {
        bg: '#4FC3F7',
        title: 'Make it Fun!',
        text: 'Let your child choose their toothbrush color. Play their favorite song while brushing!',
    },
    {
        bg: '#BA68C8',
        title: 'Lead by Example',
        text: 'Brush together as a family. Children learn best by watching their parents!',
    },
];

export default function DentalTips() {
    return (
        <section className="section" id="tips">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-lightbulb"></i> Kids Dental Tips</h2>
                <p className="section-subtitle">
                    Simple habits today for a lifetime of healthy smiles
                </p>

                <div className="tips-grid">
                    {tips.map((tip, idx) => (
                        <div className="tip-card scroll-animate" key={idx}>
                            <div className="tip-number" style={{ background: tip.bg }}>
                                {idx + 1}
                            </div>
                            <div>
                                <h3>{tip.title}</h3>
                                <p>{tip.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
