import { img } from '../lib/getImagePath';

const galleryItems = [
    {
        image: img('/images-optimized/IMG_4547.webp'),
        icon: 'fas fa-hospital',
        label: 'Our Welcoming Clinic',
    },
    {
        image: img('/images-optimized/IMG_4548.webp'),
        icon: 'fas fa-tooth',
        label: 'Kid-Friendly Treatment Room',
    },
    {
        image: img('/images-optimized/IMG_4551.webp'),
        icon: 'fas fa-couch',
        label: 'Comfortable Care Space',
    },
    {
        image: img('/images-optimized/IMG_4552.webp'),
        icon: 'fas fa-stethoscope',
        label: 'Advanced Dental Equipment',
    },
    {
        image: img('/images-optimized/IMG_4554.webp'),
        icon: 'fas fa-gamepad',
        label: 'Fun Play Area',
    },
    {
        image: img('/images-optimized/IMG_7365.webp'),
        icon: 'fas fa-face-smile',
        label: 'Happy Little Patients',
        objectPosition: '70% center',
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
                <div className="gallery-slider scroll-animate">
                    {/* Video item in carousel */}
                    <div className="gallery-item video-item">
                        <video
                            controls
                            preload="metadata"
                            className="clinic-video"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        >
                            <source src={img('/images-optimized/dental-clinic-overview.mp4')} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="gallery-item-label"><i className="fas fa-play-circle"></i> Video Tour</div>
                    </div>

                    {galleryItems.map((item, idx) => (
                        <div className="gallery-item" key={idx}>
                            <img src={item.image} alt={item.label} loading="lazy" style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined} />
                            <div className="gallery-item-label"><i className={item.icon}></i> {item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Inside Our Clinic — scrolling strip below the tour */}
            <div className="hero-interior-strip" style={{ marginTop: '2.5rem' }}>
                <div className="hero-interior-label">
                    <i className="fas fa-hospital"></i> Inside Our Clinic
                </div>
                <div className="hero-interior-scroll">
                    {galleryItems.map((item, idx) => (
                        <div className="hero-interior-item" key={idx}>
                            <img src={item.image} alt={item.label} loading="lazy" style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined} />
                            <span className="hero-interior-caption">{item.label}</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {galleryItems.map((item, idx) => (
                        <div className="hero-interior-item" key={`dup-${idx}`} aria-hidden="true">
                            <img src={item.image} alt={item.label} loading="lazy" style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined} />
                            <span className="hero-interior-caption">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
