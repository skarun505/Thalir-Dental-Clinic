import { useState, useEffect } from 'react';
import { img } from '../lib/getImagePath';

export default function SmileOfMonth() {
    const [smileData, setSmileData] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('thalir_smile_of_month'));
        if (saved && saved.title && saved.imageUrl) {
            setSmileData(saved);
        }
    }, []);

    const imageUrl = smileData?.imageUrl || img('/images-optimized/IMG_8173.webp');
    const title = smileData?.title || 'Little Aarav - May 2026';
    const description = smileData?.description || 'Aarav was super brave during his first cavity filling!\nHe earned 5 gold stickers and a superhero certificate!';

    return (
        <section className="section smile-section" id="smile">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-trophy" style={{ color: '#FFD93D' }}></i> Smile of the Month</h2>
                <p className="section-subtitle">
                    Celebrating our bravest little patients every month!
                </p>

                <div className="smile-card scroll-animate">
                    <img src={imageUrl} alt="Smile of the month - Happy Child" loading="lazy" style={{ objectPosition: 'center 15%', height: '400px' }} />
                    <div className="smile-info">
                        <div className="trophy"><i className="fas fa-trophy" style={{ color: '#FFD93D', fontSize: '2rem' }}></i></div>
                        <h3>{title}</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
