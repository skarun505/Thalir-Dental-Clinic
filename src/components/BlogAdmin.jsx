import { useState } from 'react';

const ADMIN_PASSWORD = 'thalir@blog'; // Change this to your preferred password

export default function BlogAdmin({ onSave, onClose }) {
    const [step, setStep] = useState('login'); // 'login' | 'write'
    const [password, setPassword] = useState('');
    const [pwError, setPwError] = useState('');
    const [form, setForm] = useState({
        title: '',
        category: 'Oral Hygiene Tips',
        author: 'Dr. R. Midhunraj',
        excerpt: '',
        emoji: '🦷',
    });
    const [saved, setSaved] = useState(false);

    const categories = [
        'Oral Hygiene Tips',
        'Preventive Care',
        'Specialist Care',
        'Nutrition & Teeth',
        'Child Development',
        'Parent Guide',
    ];
    const authors = ['Dr. R. Midhunraj', 'Dr. K. Pavithra'];
    const emojis = ['🦷', '✨', '❤️', '👶', '🌟', '😊', '🏆', '💜', '🛡️', '🌱'];

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setStep('write');
            setPwError('');
        } else {
            setPwError('Incorrect password. Please try again.');
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.excerpt.trim()) return;

        const newPost = {
            id: Date.now(),
            title: form.title.trim(),
            excerpt: form.excerpt.trim(),
            category: form.category,
            author: form.author,
            emoji: form.emoji,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            readTime: `${Math.max(2, Math.ceil(form.excerpt.split(' ').length / 150))} min read`,
            color: '#6C63FF',
            bg: '#EDE9FF',
        };

        // Load existing saved posts
        const existing = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const updated = [newPost, ...existing];
        localStorage.setItem('thalir_blog_posts', JSON.stringify(updated));
        setSaved(true);
        onSave(updated);
    };

    return (
        <div className="exit-popup-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="blog-admin-modal">
                <button className="exit-popup-close" onClick={onClose}><i className="fas fa-times"></i></button>

                {step === 'login' && (
                    <div className="blog-admin-login">
                        <div className="blog-admin-icon">
                            <i className="fas fa-pen-nib"></i>
                        </div>
                        <h2>Blog Admin</h2>
                        <p>Enter your admin password to write a new blog post</p>
                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                            {pwError && <p className="blog-admin-error">{pwError}</p>}
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                                <i className="fas fa-unlock"></i> Login
                            </button>
                        </form>
                    </div>
                )}

                {step === 'write' && !saved && (
                    <div className="blog-admin-write">
                        <div className="blog-admin-icon">
                            <i className="fas fa-file-pen"></i>
                        </div>
                        <h2>Write New Blog Post</h2>
                        <form onSubmit={handleSave}>
                            {/* Emoji picker */}
                            <div className="form-group">
                                <label><i className="fas fa-face-smile"></i> Pick an Emoji</label>
                                <div className="blog-emoji-picker">
                                    {emojis.map((e) => (
                                        <button
                                            key={e}
                                            type="button"
                                            className={`blog-emoji-btn ${form.emoji === e ? 'selected' : ''}`}
                                            onClick={() => setForm({ ...form, emoji: e })}
                                        >
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label><i className="fas fa-heading"></i> Blog Title <span className="required">*</span></label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="E.g. Why Baby Teeth Matter More Than You Think"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label><i className="fas fa-tag"></i> Category</label>
                                    <select
                                        className="form-input"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    >
                                        {categories.map((c) => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label><i className="fas fa-user-doctor"></i> Author</label>
                                    <select
                                        className="form-input"
                                        value={form.author}
                                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                                    >
                                        {authors.map((a) => <option key={a}>{a}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label><i className="fas fa-align-left"></i> Blog Content <span className="required">*</span></label>
                                <textarea
                                    className="form-input"
                                    placeholder="Write your full blog post content here..."
                                    rows={7}
                                    value={form.excerpt}
                                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                    required
                                    style={{ resize: 'vertical', minHeight: '140px' }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary form-submit-btn">
                                <i className="fas fa-check-circle"></i> Publish Blog Post
                            </button>
                        </form>
                    </div>
                )}

                {saved && (
                    <div className="blog-admin-success">
                        <div className="success-icon" style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                        <h2>Blog Post Published!</h2>
                        <p>Your new post is now live on the website. Scroll to the Blog section to see it.</p>
                        <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '20px' }}>
                            <i className="fas fa-eye"></i> View Blog
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
