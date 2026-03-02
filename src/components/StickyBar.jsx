export default function StickyBar({ onBookClick }) {
    return (
        <div className="sticky-bar">
            <div className="sticky-bar-inner">
                <a href="tel:+919043060968" className="btn btn-call">
                    <i className="fas fa-phone"></i> Call
                </a>
                <a
                    href="https://wa.me/919043060968"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                >
                    <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
                <button className="btn btn-primary" onClick={onBookClick}>
                    <i className="fas fa-calendar-check"></i> Book Now
                </button>
            </div>
        </div>
    );
}
