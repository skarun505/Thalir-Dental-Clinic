export default function LimitedBanner({ onBookClick }) {
    return (
        <div className="limited-banner" onClick={onBookClick} style={{ cursor: 'pointer' }}>
            <h3><span className="pulse-dot"></span> Only 3 Slots Left Today!</h3>
            <p>Don't miss out — secure your child's appointment now <i className="fas fa-running"></i></p>
        </div>
    );
}
