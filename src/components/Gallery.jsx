const galleryItems = [
    {
        image: '/images/clinic-interior.png',
        icon: 'fas fa-hospital',
        label: 'Our Welcoming Clinic',
    },
    {
        image: '/images/treatment-room.png',
        icon: 'fas fa-tooth',
        label: 'Kid-Friendly Treatment Room',
    },
    {
        image: '/images/play-area.png',
        icon: 'fas fa-gamepad',
        label: 'Fun Play Area',
    },
    {
        image: '/images/happy-child.png',
        icon: 'fas fa-face-smile',
        label: 'Happy Smiles Every Day',
    },
];

export default function Gallery() {
    return (
        <section className="section" id="gallery">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-images"></i> Clinic Tour</h2>
                <p className="section-subtitle">
                    Take a peek inside our colorful, fun-filled dental clinic
                </p>

                <div className="gallery-slider">
                    {galleryItems.map((item, idx) => (
                        <div className="gallery-item" key={idx}>
                            <img src={item.image} alt={item.label} loading="lazy" />
                            <div className="gallery-item-label"><i className={item.icon}></i> {item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
