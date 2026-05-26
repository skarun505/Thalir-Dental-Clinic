import { useState, useEffect } from 'react';
import { img } from '../lib/getImagePath';
import { getSmileOfMonth } from '../lib/supabase';

export default function SmileOfMonth() {
    const [smileData, setSmileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        getSmileOfMonth()
            .then((data) => {
                if (active) {
                    setSmileData(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error('Error fetching smile of the month:', err);
                if (active) setLoading(false);
            });
        return () => { active = false; };
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
