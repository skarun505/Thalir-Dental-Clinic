import { img } from '../lib/getImagePath';

const galleryItems = [
    {
        image: img('/images/IMG_4547.jpeg'),
        icon: 'fas fa-hospital',
        label: 'Our Welcoming Clinic',
    },
    {
        image: img('/images/IMG_4548.jpeg'),
        icon: 'fas fa-tooth',
        label: 'Kid-Friendly Treatment Room',
    },
    {
        image: img('/images/IMG_4551.jpeg'),
        icon: 'fas fa-couch',
        label: 'Comfortable Care Space',
    },
    {
        image: img('/images/IMG_4552.jpeg'),
        icon: 'fas fa-stethoscope',
        label: 'Advanced Dental Equipment',
    },
    {
        image: img('/images/IMG_4554.jpeg'),
        icon: 'fas fa-gamepad',
        label: 'Fun Play Area',
    },
    {
        image: img('/images/IMG_4555.jpeg'),
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
                <div className="clinic-video-wrapper scroll-animate" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <video
                        controls
                        preload="metadata"
                        className="clinic-video"
                    >
                        <source src={img('/images/dental-clinic-overview.mp4')} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="gallery-slider scroll-animate">
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
