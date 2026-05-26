import { useState, useEffect } from 'react';
import RichEditor from '../components/RichEditor';
import { 
    getAppointments, 
    updateAppointmentStatus, 
    deleteAppointment,
    getBlogs,
    insertBlog,
    updateBlog,
    deleteBlog,
    getMedia,
    insertMedia,
    deleteMedia,
    getSmileOfMonth,
    updateSmileOfMonth,
    isDemoMode,
    colorMap
} from '../lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'thalir@blog';

const categories = [
    'Oral Hygiene Tips', 'Preventive Care', 'Specialist Care',
    'Nutrition & Teeth', 'Child Development', 'Parent Guide',
];
const authors = ['Dr. R. Midhunraj', 'Dr. K. Pavithra'];
const emojis = ['🦷', '✨', '❤️', '👶', '🌟', '😊', '🏆', '💜', '🛡️', '🌱', '🍎', '💡'];

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
                <h1>Thalir Admin Portal</h1>
                <p>Sign in to manage appointments, blogs, and media</p>
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
                    <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>
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
        excerpt: '', emoji: '🦷', imageUrl: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.excerpt.trim()) return;
        const strippedHtml = form.excerpt.replace(/<[^>]+>/g, '');
        const words = strippedHtml.trim().split(/\s+/).filter(Boolean).length;
        const post = {
            ...form,
            id: existing?.id || String(Date.now()),
            date: existing?.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            readTime: `${Math.max(2, Math.ceil(words / 150))} min read`,
            imageUrl: form.imageUrl?.trim() || null,
        };
        onSave(post);
    };

    return (
        <div className="adm-section" style={{ padding: '32px' }}>
            <div className="adm-section-header">
                <h2>{existing ? '✏️ Edit Post' : '📝 New Blog Post'}</h2>
                <button className="adm-btn adm-btn-ghost" onClick={onCancel}>
                    <i className="fas fa-times"></i> Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="adm-form-clean">
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

                {/* Cover Image */}
                <div className="adm-field">
                    <label>Cover Image URL</label>
                    <input className="adm-input" type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={form.imageUrl || ''}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    />
                    <small>Leave blank to show category emoji background.</small>
                </div>

                {/* Content */}
                <div className="adm-field">
                    <label>Blog Content <span>*</span></label>
                    <RichEditor 
                        content={form.excerpt} 
                        onChange={(html) => setForm({ ...form, excerpt: html })} 
                    />
                    <small>Write your full post using the rich text editor above.</small>
                </div>

                <div className="adm-form-actions" style={{ marginTop: '28px' }}>
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

// ─── Appointments Tab ────────────────────────────────────────────────
function AppointmentsTab({ appointments, onUpdateStatus, onDelete }) {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeNotesAppt, setActiveNotesAppt] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const filtered = appointments.filter(a => {
        const matchesFilter = filter === 'all' || a.status === filter;
        const term = searchTerm.toLowerCase();
        const matchesSearch = a.childName.toLowerCase().includes(term) ||
                              a.parentName.toLowerCase().includes(term) ||
                              a.phone.includes(term) ||
                              a.service.toLowerCase().includes(term);
        return matchesFilter && matchesSearch;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return 'fa-clock';
            case 'confirmed': return 'fa-calendar-check';
            case 'completed': return 'fa-circle-check';
            case 'cancelled': return 'fa-circle-xmark';
            default: return 'fa-calendar';
        }
    };

    return (
        <div className="adm-tab-section">
            <div className="adm-section-header">
                <h2>Appointments Log</h2>
                <div className="adm-filters-bar">
                    <div className="adm-search-wrap">
                        <i className="fas fa-magnifying-glass"></i>
                        <input 
                            type="text" 
                            placeholder="Search patients, services, phone..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="adm-search-input"
                        />
                    </div>
                    <div className="adm-filter-buttons">
                        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                            <button
                                key={status}
                                className={`adm-filter-btn ${filter === status ? 'active' : ''} ${status}`}
                                onClick={() => setFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="adm-empty">
                    <i className="fas fa-calendar-times"></i>
                    <h3>No appointments found</h3>
                    <p>No appointments match the selected filter or search term.</p>
                </div>
            ) : (
                <>
                    {/* Desktop View Table */}
                    <div className="adm-table-wrap">
                        <table className="adm-table">
                            <thead>
                                <tr>
                                    <th>Child &amp; Parent Details</th>
                                    <th>Service</th>
                                    <th>Date &amp; Time</th>
                                    <th>Status</th>
                                    <th>Notes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(appt => (
                                    <tr key={appt.id} className={`status-${appt.status}`}>
                                        <td>
                                            <div className="appt-patient-name">{appt.childName} <span className="age-tag">{appt.childAge} yrs</span></div>
                                            <div className="appt-parent-sub">Parent: {appt.parentName}</div>
                                            <div className="appt-phone"><i className="fas fa-phone-alt"></i> {appt.phone}</div>
                                        </td>
                                        <td>
                                            <span className="appt-service-badge">{appt.service}</span>
                                        </td>
                                        <td>
                                            <div className="appt-date"><i className="fas fa-calendar-days"></i> {appt.appointmentDate}</div>
                                            <div className="appt-time"><i className="fas fa-clock"></i> {appt.appointmentTime}</div>
                                        </td>
                                        <td>
                                            <span className={`appt-status-badge ${appt.status}`}>
                                                <i className={`fas ${getStatusIcon(appt.status)}`}></i> {appt.status}
                                            </span>
                                        </td>
                                        <td>
                                            {appt.notes ? (
                                                <button 
                                                    className="adm-btn adm-btn-mini notes-btn" 
                                                    onClick={() => setActiveNotesAppt(appt)}
                                                    title="View Full Notes"
                                                >
                                                    <i className="fas fa-sticky-note"></i> View Notes
                                                </button>
                                            ) : (
                                                <span className="appt-no-notes">None</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="appt-actions">
                                                {appt.status !== 'confirmed' && appt.status !== 'completed' && (
                                                    <button 
                                                        className="adm-action-icon approve" 
                                                        onClick={() => onUpdateStatus(appt.id, 'confirmed')}
                                                        title="Confirm Appointment"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                )}
                                                {appt.status !== 'completed' && appt.status === 'confirmed' && (
                                                    <button 
                                                        className="adm-action-icon complete" 
                                                        onClick={() => onUpdateStatus(appt.id, 'completed')}
                                                        title="Mark Completed"
                                                    >
                                                        <i className="fas fa-check-double"></i>
                                                    </button>
                                                )}
                                                {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                                                    <button 
                                                        className="adm-action-icon cancel" 
                                                        onClick={() => onUpdateStatus(appt.id, 'cancelled')}
                                                        title="Cancel Appointment"
                                                    >
                                                        <i className="fas fa-ban"></i>
                                                    </button>
                                                )}
                                                {appt.status === 'cancelled' && (
                                                    <button 
                                                        className="adm-action-icon approve" 
                                                        onClick={() => onUpdateStatus(appt.id, 'pending')}
                                                        title="Re-open (Pending)"
                                                    >
                                                        <i className="fas fa-arrow-rotate-left"></i>
                                                    </button>
                                                )}
                                                <button 
                                                    className="adm-action-icon delete" 
                                                    onClick={() => setConfirmDeleteId(appt.id)}
                                                    title="Delete Record"
                                                >
                                                    <i className="fas fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card Grid View */}
                    <div className="adm-cards-grid">
                        {filtered.map(appt => (
                            <div key={appt.id} className={`adm-appt-card status-${appt.status}`}>
                                <div className="appt-card-header">
                                    <div>
                                        <h3 className="appt-card-child">{appt.childName} <span className="age-tag">{appt.childAge} yrs</span></h3>
                                        <span className={`appt-status-badge ${appt.status}`}>
                                            <i className={`fas ${getStatusIcon(appt.status)}`}></i> {appt.status}
                                        </span>
                                    </div>
                                    <span className="appt-card-service">{appt.service}</span>
                                </div>
                                <div className="appt-card-body">
                                    <div className="appt-detail-row"><strong>Parent:</strong> {appt.parentName}</div>
                                    <div className="appt-detail-row"><strong>Phone:</strong> {appt.phone}</div>
                                    <div className="appt-detail-row"><strong>Schedule:</strong> {appt.appointmentDate} at {appt.appointmentTime}</div>
                                    {appt.notes && (
                                        <div className="appt-card-notes-preview">
                                            <strong>Notes:</strong> {appt.notes}
                                        </div>
                                    )}
                                </div>
                                <div className="appt-card-footer">
                                    <div className="appt-actions">
                                        {appt.status !== 'confirmed' && appt.status !== 'completed' && (
                                            <button 
                                                className="adm-btn adm-btn-mini approve"
                                                onClick={() => onUpdateStatus(appt.id, 'confirmed')}
                                            >
                                                <i className="fas fa-check"></i> Confirm
                                            </button>
                                        )}
                                        {appt.status === 'confirmed' && (
                                            <button 
                                                className="adm-btn adm-btn-mini complete"
                                                onClick={() => onUpdateStatus(appt.id, 'completed')}
                                            >
                                                <i className="fas fa-check-double"></i> Complete
                                            </button>
                                        )}
                                        {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                                            <button 
                                                className="adm-btn adm-btn-mini cancel"
                                                onClick={() => onUpdateStatus(appt.id, 'cancelled')}
                                            >
                                                <i className="fas fa-ban"></i> Cancel
                                            </button>
                                        )}
                                        <button 
                                            className="adm-btn adm-btn-mini delete"
                                            onClick={() => setConfirmDeleteId(appt.id)}
                                        >
                                            <i className="fas fa-trash-can"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Notes Popover Modal */}
            {activeNotesAppt && (
                <div className="adm-overlay" onClick={() => setActiveNotesAppt(null)}>
                    <div className="adm-confirm" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'left' }}>
                        <div className="notes-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'Fredoka One', color: '#2D3748' }}><i className="fas fa-sticky-note" style={{ color: '#6C63FF', marginRight: '8px' }}></i> Appointment Notes</h3>
                            <button className="close-x" onClick={() => setActiveNotesAppt(null)} style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: '#718096' }}>&times;</button>
                        </div>
                        <div style={{ background: '#F7FAFC', borderLeft: '4px solid #6C63FF', padding: '16px', borderRadius: '0 12px 12px 0', marginBottom: '20px' }}>
                            <p style={{ margin: 0, fontSize: '1rem', color: '#4A5568', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{activeNotesAppt.notes}</p>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#718096', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                            <div>Patient: <strong>{activeNotesAppt.childName}</strong></div>
                            <div>Schedule: <strong>{activeNotesAppt.appointmentDate} ({activeNotesAppt.appointmentTime})</strong></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDeleteId && (
                <div className="adm-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="adm-confirm" onClick={(e) => e.stopPropagation()}>
                        <div className="adm-confirm-icon"><i className="fas fa-exclamation-triangle"></i></div>
                        <h3>Delete Appointment Record?</h3>
                        <p>This will permanently delete the scheduling record for this patient. This action cannot be undone.</p>
                        <div className="adm-confirm-actions">
                            <button className="adm-btn adm-btn-danger" onClick={() => { onDelete(confirmDeleteId); setConfirmDeleteId(null); }}>
                                <i className="fas fa-trash-can"></i> Yes, Delete
                            </button>
                            <button className="adm-btn adm-btn-ghost" onClick={() => setConfirmDeleteId(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Blogs Tab ───────────────────────────────────────────────────────
function BlogsTab({ posts, onEdit, onDelete, onNew }) {
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    return (
        <div className="adm-tab-section">
            <div className="adm-section-header">
                <h2>Health Articles Library</h2>
                <button className="adm-btn adm-btn-primary" onClick={onNew}>
                    <i className="fas fa-plus"></i> Write New Post
                </button>
            </div>

            {posts.length === 0 ? (
                <div className="adm-empty">
                    <i className="fas fa-pen-nib"></i>
                    <h3>No posts yet</h3>
                    <p>Click "Write New Post" to start adding educational clinic articles.</p>
                    <button className="adm-btn adm-btn-primary" onClick={onNew}>
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
                                    <p className="adm-post-preview">{post.excerpt.replace(/<[^>]+>/g, '').slice(0, 100)}…</p>
                                </div>
                                <div className="adm-post-actions">
                                    <button className="adm-icon-btn edit" onClick={() => onEdit(post)} title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="adm-icon-btn delete" onClick={() => setConfirmDeleteId(post.id)} title="Delete">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {confirmDeleteId && (
                <div className="adm-overlay" onClick={() => setConfirmDeleteId(null)}>
                    <div className="adm-confirm" onClick={(e) => e.stopPropagation()}>
                        <div className="adm-confirm-icon"><i className="fas fa-exclamation-triangle"></i></div>
                        <h3>Delete Post?</h3>
                        <p>This action cannot be undone. This post will be removed permanently.</p>
                        <div className="adm-confirm-actions">
                            <button className="adm-btn adm-btn-danger" onClick={() => { onDelete(confirmDeleteId); setConfirmDeleteId(null); }}>
                                <i className="fas fa-trash-alt"></i> Yes, Delete
                            </button>
                            <button className="adm-btn adm-btn-ghost" onClick={() => setConfirmDeleteId(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Smile of the Month Tab ──────────────────────────────────────────
function SmileTab({ initialSmile, onSave }) {
    const [form, setForm] = useState(initialSmile || {
        imageUrl: '',
        title: '',
        description: ''
    });

    useEffect(() => {
        if (initialSmile) {
            setForm(initialSmile);
        }
    }, [initialSmile]);

    const handleSave = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="adm-tab-section">
            <div className="adm-section-header">
                <h2>Smile of the Month</h2>
            </div>

            <div className="smile-tab-grid">
                {/* Form */}
                <div className="adm-form-wrap">
                    <form onSubmit={handleSave} className="adm-form-clean">
                        <div className="adm-field">
                            <label>Child Image URL</label>
                            <input 
                                className="adm-input" 
                                type="url" 
                                value={form.imageUrl} 
                                onChange={e => setForm({ ...form, imageUrl: e.target.value })} 
                                placeholder="https://images.unsplash.com/..." 
                                required 
                            />
                            <small className="adm-hint">Copy and paste an image URL from the Media Library.</small>
                        </div>
                        <div className="adm-field">
                            <label>Title</label>
                            <input 
                                className="adm-input" 
                                type="text" 
                                value={form.title} 
                                onChange={e => setForm({ ...form, title: e.target.value })} 
                                placeholder="e.g. Little Aarav - May 2026" 
                                required 
                            />
                        </div>
                        <div className="adm-field">
                            <label>Description (Hero Story)</label>
                            <textarea 
                                className="adm-input adm-textarea" 
                                value={form.description} 
                                onChange={e => setForm({ ...form, description: e.target.value })} 
                                placeholder="e.g. Aarav was super brave during his first cavity filling..." 
                                required
                            ></textarea>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                            <button type="submit" className="adm-btn adm-btn-primary">
                                <i className="fas fa-save"></i> Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Real-time Preview */}
                <div className="smile-preview-pane">
                    <h3>Live Preview</h3>
                    <p style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '16px' }}>This is how the card will look on the homepage:</p>
                    <div className="smile-card" style={{ maxWidth: '400px', margin: '0 auto', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                        <div style={{ height: '220px', background: '#EDF2F7', overflow: 'hidden' }}>
                            {form.imageUrl ? (
                                <img src={form.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyItems: 'center', alignContent: 'center', justifyContent: 'center', color: '#A0AEC0' }}>
                                    <i className="fas fa-image" style={{ fontSize: '3rem' }}></i>
                                </div>
                            )}
                        </div>
                        <div className="smile-info" style={{ padding: '20px' }}>
                            <div className="trophy"><i className="fas fa-trophy" style={{ color: '#FFD93D', fontSize: '1.5rem' }}></i></div>
                            <h3 style={{ fontSize: '1.1rem', margin: '8px 0', fontWeight: '800' }}>{form.title || 'Child Title Goes Here'}</h3>
                            <p style={{ whiteSpace: 'pre-line', fontSize: '0.88rem', color: '#718096', margin: 0 }}>{form.description || 'Description story goes here...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Media Library Tab ────────────────────────────────────────────────
function MediaTab({ media, onAdd, onDelete }) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) return;
        onAdd(name, url);
        setName('');
        setUrl('');
    };

    const handleCopy = (item) => {
        navigator.clipboard.writeText(item.url).then(() => {
            setCopiedId(item.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    return (
        <div className="adm-tab-section">
            <div className="adm-section-header">
                <h2>Media Library</h2>
            </div>

            <div className="adm-form-wrap" style={{ marginBottom: '32px', padding: '24px' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', fontFamily: 'Fredoka One', color: '#2D3748' }}>Register External Image Link</h3>
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <input 
                        className="adm-input" 
                        type="text" 
                        placeholder="Image Name (e.g. Brave Child, Clinic Interior)" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        style={{ flex: 1, minWidth: '200px' }} 
                        required
                    />
                    <input 
                        className="adm-input" 
                        type="url" 
                        placeholder="External Image URL (https://images.unsplash.com/...)" 
                        value={url} 
                        onChange={e => setUrl(e.target.value)} 
                        required 
                        style={{ flex: 2, minWidth: '300px' }} 
                    />
                    <button type="submit" className="adm-btn adm-btn-primary" style={{ padding: '12px 28px' }}>
                        <i className="fas fa-plus"></i> Register Image
                    </button>
                </form>
            </div>

            <div className="media-grid">
                {media.length === 0 ? (
                    <p style={{ color: '#718096', gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>No image files registered yet. Register an external URL above to use in blogs/smile cards.</p>
                ) : (
                    media.map(m => (
                        <div key={m.id} className="media-item-card">
                            <div className="media-card-img-wrap">
                                <img src={m.url} alt={m.name} />
                            </div>
                            <div className="media-card-info">
                                <span className="media-name">{m.name}</span>
                                <div className="media-card-btns">
                                    <button 
                                        type="button"
                                        onClick={() => handleCopy(m)}
                                        className={`adm-btn adm-btn-mini copy-btn ${copiedId === m.id ? 'copied' : ''}`}
                                        style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
                                    >
                                        <i className={`fas ${copiedId === m.id ? 'fa-check' : 'fa-copy'}`}></i>
                                        {copiedId === m.id ? ' Copied!' : ' Copy URL'}
                                    </button>
                                    <button 
                                        className="adm-icon-btn delete" 
                                        onClick={() => onDelete(m.id)} 
                                        title="Delete Image"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// ─── Dashboard Frame ─────────────────────────────────────────────────
function Dashboard({ onLogout }) {
    const [appointments, setAppointments] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [media, setMedia] = useState([]);
    const [smile, setSmile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'blogs' | 'smile' | 'media'
    const [blogView, setBlogView] = useState('list'); // 'list' | 'new' | 'edit'
    const [blogEditing, setBlogEditing] = useState(null);
    const [toast, setToast] = useState('');

    const loadData = async () => {
        setLoading(true);
        try {
            const [apptsData, blogsData, mediaData, smileData] = await Promise.all([
                getAppointments(),
                getBlogs(),
                getMedia(),
                getSmileOfMonth()
            ]);
            setAppointments(apptsData);
            setBlogs(blogsData);
            setMedia(mediaData);
            setSmile(smileData);
        } catch (err) {
            console.error("Error loading admin data:", err);
            showToast("⚠️ Syncing failed. Operating in Offline Demo Mode.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateAppointmentStatus(id, status);
            setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
            showToast(`✅ Status updated to ${status}!`);
        } catch (err) {
            console.error(err);
            showToast("❌ Failed to update status.");
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await deleteAppointment(id);
            setAppointments(prev => prev.filter(a => a.id !== id));
            showToast("🗑️ Appointment record deleted.");
        } catch (err) {
            console.error(err);
            showToast("❌ Failed to delete appointment.");
        }
    };

    const handleSaveBlog = async (post) => {
        try {
            if (blogEditing) {
                const updated = await updateBlog(post);
                setBlogs(prev => prev.map(p => p.id === post.id ? updated : p));
                showToast("✅ Post updated successfully!");
            } else {
                const inserted = await insertBlog(post);
                setBlogs(prev => [inserted, ...prev]);
                showToast("🎉 Post published successfully!");
            }
            setBlogView('list');
            setBlogEditing(null);
        } catch (err) {
            console.error(err);
            showToast("❌ Error saving blog post.");
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            await deleteBlog(id);
            setBlogs(prev => prev.filter(p => p.id !== id));
            showToast("🗑️ Post deleted successfully.");
        } catch (err) {
            console.error(err);
            showToast("❌ Failed to delete post.");
        }
    };

    const handleAddMedia = async (name, url) => {
        try {
            const newItem = {
                id: 'media-' + Date.now(),
                name,
                url
            };
            const inserted = await insertMedia(newItem);
            setMedia(prev => [inserted, ...prev]);
            showToast("🎨 Image registered to media library!");
        } catch (err) {
            console.error(err);
            showToast("❌ Failed to register image.");
        }
    };

    const handleDeleteMedia = async (id) => {
        try {
            await deleteMedia(id);
            setMedia(prev => prev.filter(m => m.id !== id));
            showToast("🗑️ Media deleted.");
        } catch (err) {
            console.error(err);
            showToast("❌ Failed to delete media.");
        }
    };

    const handleSaveSmile = async (smileForm) => {
        try {
            const updated = await updateSmileOfMonth(smileForm);
            setSmile(updated);
            showToast("🏆 Smile of the Month updated!");
        } catch (err) {
            console.error(err);
            showToast("❌ Failed to update Smile of the Month.");
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'appointments':
                return (
                    <AppointmentsTab 
                        appointments={appointments}
                        onUpdateStatus={handleUpdateStatus}
                        onDelete={handleDeleteAppointment}
                    />
                );
            case 'blogs':
                if (blogView === 'new') {
                    return (
                        <PostForm 
                            existing={null}
                            onSave={handleSaveBlog}
                            onCancel={() => setBlogView('list')}
                        />
                    );
                }
                if (blogView === 'edit') {
                    return (
                        <PostForm 
                            existing={blogEditing}
                            onSave={handleSaveBlog}
                            onCancel={() => { setBlogView('list'); setBlogEditing(null); }}
                        />
                    );
                }
                return (
                    <BlogsTab 
                        posts={blogs}
                        onEdit={(post) => { setBlogEditing(post); setBlogView('edit'); }}
                        onDelete={handleDeleteBlog}
                        onNew={() => setBlogView('new')}
                    />
                );
            case 'smile':
                return (
                    <SmileTab 
                        initialSmile={smile}
                        onSave={handleSaveSmile}
                    />
                );
            case 'media':
                return (
                    <MediaTab 
                        media={media}
                        onAdd={handleAddMedia}
                        onDelete={handleDeleteMedia}
                    />
                );
            default:
                return null;
        }
    };

    const pendingAppointments = appointments.filter(a => a.status === 'pending').length;

    return (
        <div className="adm-dashboard-layout">
            {/* Sidebar */}
            <aside className="adm-sidebar">
                <div className="adm-sidebar-brand">
                    <div className="adm-sidebar-logo">
                        <i className="fas fa-tooth"></i>
                    </div>
                    <div>
                        <h2>Thalir Admin</h2>
                        <span>Dental Clinic</span>
                    </div>
                </div>
                
                <div className={`adm-sidebar-mode ${isDemoMode ? 'demo' : 'live'}`}>
                    <i className={isDemoMode ? 'fas fa-flask' : 'fas fa-shield-halved'}></i>
                    <span>{isDemoMode ? 'Demo Mode (Offline)' : 'Live Supabase DB'}</span>
                </div>

                <nav className="adm-sidebar-nav">
                    <button 
                        className={`adm-nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('appointments'); setBlogView('list'); }}
                    >
                        <i className="fas fa-calendar-check"></i>
                        <span>Appointments</span>
                        {pendingAppointments > 0 && (
                            <span className="adm-nav-badge">{pendingAppointments}</span>
                        )}
                    </button>
                    <button 
                        className={`adm-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('blogs'); }}
                    >
                        <i className="fas fa-file-pen"></i>
                        <span>Blog Posts</span>
                    </button>
                    <button 
                        className={`adm-nav-item ${activeTab === 'smile' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('smile'); setBlogView('list'); }}
                    >
                        <i className="fas fa-trophy"></i>
                        <span>Smile of Month</span>
                    </button>
                    <button 
                        className={`adm-nav-item ${activeTab === 'media' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('media'); setBlogView('list'); }}
                    >
                        <i className="fas fa-images"></i>
                        <span>Media Library</span>
                    </button>
                </nav>

                <div className="adm-sidebar-footer">
                    <a href="#/" className="adm-sidebar-btn" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt"></i> View Website
                    </a>
                    <button className="adm-sidebar-btn logout" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="adm-main">
                <header className="adm-main-header">
                    <div className="adm-header-title">
                        <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                        <p>{activeTab === 'blogs' ? 'Compose and organize clinical advice blogs' : activeTab === 'smile' ? 'Acknowledge brave children patients' : activeTab === 'media' ? 'Manage image links for website pages' : 'Manage booking requests'}</p>
                    </div>
                    
                    <div className="adm-header-stats">
                        <div className="adm-header-stat">
                            <span className="stat-label">Appointments</span>
                            <span className="stat-val">{appointments.length} <small>({pendingAppointments} pending)</small></span>
                        </div>
                        <div className="adm-header-stat">
                            <span className="stat-label">Blogs</span>
                            <span className="stat-val">{blogs.length}</span>
                        </div>
                        <div className="adm-header-stat">
                            <span className="stat-label">Media registered</span>
                            <span className="stat-val">{media.length}</span>
                        </div>
                    </div>
                </header>

                <div className="adm-main-content">
                    {loading ? (
                        <div className="adm-loading-screen">
                            <div className="adm-spinner"></div>
                            <p>Loading records...</p>
                        </div>
                    ) : (
                        renderTabContent()
                    )}
                </div>
            </main>

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
