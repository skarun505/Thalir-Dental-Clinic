import { useState, useEffect } from 'react';

export default function ExitPopup({ onBookClick }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let triggered = false;
        const handleMouseLeave = (e) => {
            if (e.clientY < 10 && !triggered) {
                const dismissed = sessionStorage.getItem('exitPopupDismissed');
                if (!dismissed) {
                    triggered = true;
                    setShow(true);
                }
            }
        };
        document.addEventListener('mouseout', handleMouseLeave);
        return () => document.removeEventListener('mouseout', handleMouseLeave);
    }, []);

    const handleClose = () => {
        setShow(false);
        sessionStorage.setItem('exitPopupDismissed', 'true');
    };

    if (!show) return null;

    return (
        <div className="exit-popup-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
            <div className="exit-popup">
                <button className="exit-popup-close" onClick={handleClose}><i className="fas fa-times"></i></button>
                <span className="emoji"><i className="fas fa-face-sad-tear" style={{ color: '#6C63FF' }}></i></span>
                <h3>Wait! Don't Leave Yet!</h3>
                <p>
                    Book your child's <strong>FREE first dental check-up</strong> today
                    and get a special surprise gift! <i className="fas fa-gift" style={{ color: '#FF6B9D' }}></i>
                </p>
                <button
                    className="btn btn-primary btn-large"
                    onClick={() => {
                        handleClose();
                        onBookClick();
                    }}
                    style={{ width: '100%' }}
                >
                    <i className="fas fa-calendar-check"></i> Claim Free Check-up
                </button>
                <button
                    onClick={handleClose}
                    style={{
                        marginTop: '12px',
                        background: 'none',
                        color: '#A0AEC0',
                        fontSize: '0.85rem',
                        textDecoration: 'underline',
                    }}
                >
                    No thanks, I'll pass
                </button>
            </div>
        </div>
    );
}
