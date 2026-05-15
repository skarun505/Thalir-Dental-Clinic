import { useState, useEffect } from 'react';

const MAPS_URL = 'https://maps.app.goo.gl/thalirkidsdental';
const MAPS_EMBED_URL = 'https://www.google.com/maps/search/?api=1&query=Thalir+Kids+Speciality+Dental+Clinic+Erode';

export default function LocationPopup() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Show popup after 4 seconds
        const timer = setTimeout(() => {
            if (!sessionStorage.getItem('loc_popup_dismissed')) {
                setVisible(true);
            }
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setVisible(false);
        setDismissed(true);
        sessionStorage.setItem('loc_popup_dismissed', '1');
    };

    if (dismissed) return null;

    return (
        <div className={`loc-popup ${visible ? 'loc-popup--visible' : ''}`} role="dialog" aria-label="Clinic Location">
            {/* Pulse ring */}
            <div className="loc-pulse-ring" />

            <button className="loc-close" onClick={handleDismiss} aria-label="Close">
                <i className="fas fa-times" />
            </button>

            <div className="loc-header">
                <div className="loc-icon-wrap">
                    <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                    <p className="loc-label">📍 We're near you!</p>
                    <p className="loc-clinic-name">Thalir Kids Dental</p>
                </div>
            </div>

            <p className="loc-address">
                424, Dr. Amsa Subramaniyam Hospital Complex,<br />
                Brough Road, Erode – 638001
            </p>
            <p className="loc-landmark">
                <i className="fas fa-signs-post" /> Next to Saveetha Hospital Signal
            </p>

            <a
                href={MAPS_EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="loc-cta-btn"
                onClick={handleDismiss}
            >
                <i className="fas fa-location-arrow" />
                Get Directions
            </a>

            <p className="loc-hint">Tap to open in Google Maps</p>
        </div>
    );
}
