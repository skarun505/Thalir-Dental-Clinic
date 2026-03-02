export default function FreeBanner({ onBookClick }) {
    return (
        <div className="free-banner" onClick={onBookClick} style={{ cursor: 'pointer' }}>
            <h3><i className="fas fa-gift"></i> Win exciting surprise gifts and dental kits on every visit.</h3>
            <p>Book an appointment today and make your child's dental experience rewarding!</p>
        </div>
    );
}
