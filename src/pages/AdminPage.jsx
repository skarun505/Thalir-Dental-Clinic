import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'thalir@blog';

const colorMap = [
    { color: '#6C63FF', bg: '#EDE9FF' },
    { color: '#FF6B9D', bg: '#FFE0EC' },
    { color: '#FF8A65', bg: '#FFF3E0' },
    { color: '#6BCB77', bg: '#E8F5E9' },
    { color: '#4FC3F7', bg: '#E0F4FF' },
    { color: '#BA68C8', bg: '#F3E5F5' },
];

const categories = [
    'Oral Hygiene Tips', 'Preventive Care', 'Specialist Care',
    'Nutrition & Teeth', 'Child Development', 'Parent Guide',
];
const authors = ['Dr. R. Midhunraj', 'Dr. K. Pavithra'];
const emojis = ['🦷', '✨', '❤️', '👶', '🌟', '😊', '🏆', '💜', '🛡️', '🌱', '🍎', '💡'];

function getPosts() {
    return JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
}
function savePosts(posts) {
    localStorage.setItem('thalir_blog_posts', JSON.stringify(posts));
}

// ─── Login Screen ───────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
    const [pw, setPw] = useState('');
    const [err, setErr] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pw === ADMIN_PASSWORD) { onLogin(); }
        else { setErr('Wrong password. Try again.'); }
    };

    return (
        <div className="adm-login-wrap">
            <div className="adm-login-card">
                <div className="adm-login-logo">
                    <i className="fas fa-tooth"></i>
                </div>
                <h1>Thalir Blog Admin</h1>
                <p>Sign in to manage your dental blog posts</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        className="adm-input"
                        placeholder="Enter admin password"
                        value={pw}
                        onChange={(e) => { setPw(e.target.value); setErr(''); }}
                        autoFocus
                    />
                    {err && <p className="adm-error"><i className="fas fa-exclamation-circle"></i> {err}</p>}
                    <button type="submit" className="adm-btn adm-btn-primary">
                        <i className="fas fa-sign-in-alt"></i> Sign In
                    </button>
                </form>
                <a href="#/" className="adm-back-link">
                    <i className="fas fa-arrow-left"></i> Back to Website
                </a>
            </div>
        </div>
    );
}

// ─── New / Edit Post Form ────────────────────────────────────────────
function PostForm({ existing, onSave, onCancel }) {
    const [form, setForm] = useState(existing || {
        title: '', category: categories[0], author: authors[0],
        excerpt: '', emoji: '🦷',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.excerpt.trim()) return;
        const words = form.excerpt.trim().split(/\s+/).length;
        const post = {
            ...form,
            id: existing?.id || Date.now(),
            date: existing?.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            readTime: `${Math.max(2, Math.ceil(words / 150))} min read`,
            color: '#6C63FF',
            bg: '#EDE9FF',
        };
        onSave(post);
    };

    return (
        <div className="adm-form-wrap">
            <div className="adm-form-header">
                <h2>{existing ? '✏️ Edit Post' : '📝 New Blog Post'}</h2>
                <button className="adm-btn adm-btn-ghost" onClick={onCancel}>
                    <i className="fas fa-times"></i> Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="adm-form">
                {/* Emoji row */}
                <div className="adm-field">
                    <label>Choose an Emoji</label>
                    <div className="adm-emoji-row">
                        {emojis.map((em) => (
                            <button key={em} type="button"
                                className={`adm-emoji-btn ${form.emoji === em ? 'active' : ''}`}
                                onClick={() => setForm({ ...form, emoji: em })}
                            >{em}</button>
                        ))}
                    </div>
                </div>

                {/* Title */}
                <div className="adm-field">
                    <label>Blog Title <span>*</span></label>
                    <input className="adm-input" type="text"
                        placeholder="E.g. Why Baby Teeth Matter More Than You Think"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required />
                </div>

                {/* Category & Author */}
                <div className="adm-row">
                    <div className="adm-field">
                        <label>Category</label>
                        <select className="adm-input" value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}>
                            {categories.map((c) => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="adm-field">
                        <label>Author</label>
                        <select className="adm-input" value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}>
                            {authors.map((a) => <option key={a}>{a}</option>)}
                        </select>
                    </div>
                </div>

                {/* Content */}
                <div className="adm-field">
                    <label>Blog Content <span>*</span></label>
                    <textarea className="adm-input adm-textarea"
                        placeholder="Write your full blog post here. Share tips, insights, case studies..."
                        value={form.excerpt}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        required />
                    <small>{form.excerpt.trim().split(/\s+/).filter(Boolean).length} words</small>
                </div>

                <div className="adm-form-actions">
                    <button type="submit" className="adm-btn adm-btn-primary">
                        <i className={`fas ${existing ? 'fa-save' : 'fa-upload'}`}></i>
                        {existing ? ' Save Changes' : ' Publish Post'}
                    </button>
                    <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

// ─── Dashboard (post list) ───────────────────────────────────────────
function Dashboard({ onLogout }) {
    const [posts, setPosts] = useState(getPosts());
    const [view, setView] = useState('list'); // 'list' | 'new' | 'edit'
    const [editing, setEditing] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState('');

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const handleSave = (post) => {
        let updated;
        if (editing) {
            updated = posts.map((p) => p.id === post.id ? post : p);
            showToast('✅ Post updated successfully!');
        } else {
            updated = [post, ...posts];
            showToast('🎉 Post published successfully!');
        }
        savePosts(updated);
        setPosts(updated);
        setView('list');
        setEditing(null);
    };

    const handleDelete = (id) => {
        const updated = posts.filter((p) => p.id !== id);
        savePosts(updated);
        setPosts(updated);
        setDeleteId(null);
        showToast('🗑️ Post deleted.');
    };

    const handleEdit = (post) => {
        setEditing(post);
        setView('edit');
    };

    if (view === 'new') {
        return <PostForm onSave={handleSave} onCancel={() => setView('list')} />;
    }
    if (view === 'edit' && editing) {
        return <PostForm existing={editing} onSave={handleSave} onCancel={() => { setView('list'); setEditing(null); }} />;
    }

    return (
        <div className="adm-dashboard">
            {/* Header */}
            <div className="adm-topbar">
                <div className="adm-topbar-left">
                    <div className="adm-topbar-logo"><i className="fas fa-tooth"></i></div>
                    <div>
                        <h1 className="adm-topbar-title">Thalir Blog Admin</h1>
                        <span className="adm-topbar-sub">Manage your dental health blog</span>
                    </div>
                </div>
                <div className="adm-topbar-actions">
                    <a href="#/" className="adm-btn adm-btn-ghost" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt"></i> View Site
                    </a>
                    <button className="adm-btn adm-btn-ghost" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>

            <div className="adm-content">
                {/* Stats */}
                <div className="adm-stats-row">
                    <div className="adm-stat-card" style={{ '--sc': '#6C63FF' }}>
                        <i className="fas fa-file-alt"></i>
                        <div><h3>{posts.length}</h3><p>Your Posts</p></div>
                    </div>
                    <div className="adm-stat-card" style={{ '--sc': '#FF6B9D' }}>
                        <i className="fas fa-users"></i>
                        <div><h3>2</h3><p>Authors</p></div>
                    </div>
                    <div className="adm-stat-card" style={{ '--sc': '#6BCB77' }}>
                        <i className="fas fa-tags"></i>
                        <div><h3>{categories.length}</h3><p>Categories</p></div>
                    </div>
                </div>

                {/* Post List */}
                <div className="adm-section">
                    <div className="adm-section-header">
                        <h2>All Blog Posts</h2>
                        <button className="adm-btn adm-btn-primary" onClick={() => setView('new')}>
                            <i className="fas fa-plus"></i> New Post
                        </button>
                    </div>

                    {posts.length === 0 ? (
                        <div className="adm-empty">
                            <i className="fas fa-pen-nib"></i>
                            <h3>No posts yet</h3>
                            <p>Click "New Post" to write your first blog article</p>
                            <button className="adm-btn adm-btn-primary" onClick={() => setView('new')}>
                                <i className="fas fa-plus"></i> Write Your First Post
                            </button>
                        </div>
                    ) : (
                        <div className="adm-post-list">
                            {posts.map((post, idx) => {
                                const cm = colorMap[idx % colorMap.length];
                                return (
                                    <div className="adm-post-item" key={post.id}>
                                        <div className="adm-post-emoji" style={{ background: cm.bg }}>{post.emoji}</div>
                                        <div className="adm-post-info">
                                            <h3>{post.title}</h3>
                                            <div className="adm-post-meta">
                                                <span style={{ color: cm.color }}><i className="fas fa-tag"></i> {post.category}</span>
                                                <span><i className="fas fa-user-doctor"></i> {post.author}</span>
                                                <span><i className="fas fa-calendar-alt"></i> {post.date}</span>
                                                <span><i className="fas fa-clock"></i> {post.readTime}</span>
                                            </div>
                                            <p className="adm-post-preview">{post.excerpt.slice(0, 100)}…</p>
                                        </div>
                                        <div className="adm-post-actions">
                                            <button className="adm-icon-btn edit" onClick={() => handleEdit(post)} title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="adm-icon-btn delete" onClick={() => setDeleteId(post.id)} title="Delete">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete confirm modal */}
            {deleteId && (
                <div className="adm-overlay" onClick={() => setDeleteId(null)}>
                    <div className="adm-confirm" onClick={(e) => e.stopPropagation()}>
                        <div className="adm-confirm-icon"><i className="fas fa-exclamation-triangle"></i></div>
                        <h3>Delete Post?</h3>
                        <p>This action cannot be undone.</p>
                        <div className="adm-confirm-actions">
                            <button className="adm-btn adm-btn-danger" onClick={() => handleDelete(deleteId)}>
                                <i className="fas fa-trash-alt"></i> Yes, Delete
                            </button>
                            <button className="adm-btn adm-btn-ghost" onClick={() => setDeleteId(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && <div className="adm-toast">{toast}</div>}
        </div>
    );
}

// ─── Main Admin Page ─────────────────────────────────────────────────
export default function AdminPage() {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem('thalir_admin') === 'yes');

    const handleLogin = () => {
        sessionStorage.setItem('thalir_admin', 'yes');
        setAuthed(true);
    };
    const handleLogout = () => {
        sessionStorage.removeItem('thalir_admin');
        setAuthed(false);
    };

    return authed
        ? <Dashboard onLogout={handleLogout} />
        : <LoginScreen onLogin={handleLogin} />;
}
