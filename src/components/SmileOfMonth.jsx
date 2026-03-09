import { img } from '../lib/getImagePath';

export default function SmileOfMonth() {
    return (
        <section className="section smile-section" id="smile">
            <div className="container">
                <h2 className="section-title"><i className="fas fa-trophy" style={{ color: '#FFD93D' }}></i> Smile of the Month</h2>
                <p className="section-subtitle">
                    Celebrating our bravest little patients every month!
                </p>

                <div className="smile-card scroll-animate">
                    <img src={img('/images/happy-child.png')} alt="Smile of the month - Happy Child" loading="lazy" />
                    <div className="smile-info">
                        <div className="trophy"><i className="fas fa-trophy" style={{ color: '#FFD93D', fontSize: '2rem' }}></i></div>
                        <h3>Little Aarav - March 2026</h3>
                        <p>
                            Aarav was super brave during his first cavity filling!
                            He earned 5 gold stickers and a superhero certificate!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
