export default function FreeBanner({ onBookClick }) {
    return (
        <div className="free-banner" onClick={onBookClick} style={{ cursor: 'pointer' }}>
            <h3><i className="fas fa-gift"></i> First Visit FREE for New Patients!</h3>
            <p>Book your child's first dental check-up today — no charges, no worries!</p>
        </div>
    );
}
