const galleryItems = [
    {
        image: '/images/IMG_4547.jpeg',
        icon: 'fas fa-hospital',
        label: 'Our Welcoming Clinic',
    },
    {
        image: '/images/IMG_4548.jpeg',
        icon: 'fas fa-tooth',
        label: 'Kid-Friendly Treatment Room',
    },
    {
        image: '/images/IMG_4551.jpeg',
        icon: 'fas fa-couch',
        label: 'Comfortable Care Space',
    },
    {
        image: '/images/IMG_4552.jpeg',
        icon: 'fas fa-stethoscope',
        label: 'Advanced Dental Equipment',
    },
    {
        image: '/images/IMG_4554.jpeg',
        icon: 'fas fa-gamepad',
        label: 'Fun Play Area',
    },
    {
        image: '/images/IMG_4555.jpeg',
        icon: 'fas fa-face-smile',
        label: 'Happy Little Patients',
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
