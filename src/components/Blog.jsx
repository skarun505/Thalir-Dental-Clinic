import { useState, useEffect } from 'react';
import BlogAdmin from './BlogAdmin';

const colorMap = [
    { color: '#6C63FF', bg: '#EDE9FF' },
    { color: '#FF6B9D', bg: '#FFE0EC' },
    { color: '#FF8A65', bg: '#FFF3E0' },
    { color: '#6BCB77', bg: '#E8F5E9' },
    { color: '#4FC3F7', bg: '#E0F4FF' },
    { color: '#BA68C8', bg: '#F3E5F5' },
];

const samplePosts = [
    {
        id: 'sample-1',
        title: 'When Should My Child Have Their First Dental Visit?',
        excerpt: 'Many parents wonder when to schedule their child\'s first dental appointment. The answer might surprise you — it\'s earlier than you think! Learn why early visits set the foundation for a lifetime of healthy smiles.',
        author: 'Dr. R. Midhunraj',
        date: 'May 10, 2026',
        category: 'Preventive Care',
        readTime: '3 min read',
        emoji: '🦷',
        color: '#6C63FF',
        bg: '#EDE9FF',
    },
    {
        id: 'sample-2',
        title: 'How to Make Brushing Fun for Your Kids',
        excerpt: 'Getting your child to brush their teeth can feel like a battle every night. Discover playful tips, fun routines, and the right tools that turn brushing into the highlight of their bedtime routine.',
        author: 'Dr. K. Pavithra',
        date: 'April 28, 2026',
        category: 'Oral Hygiene Tips',
        readTime: '4 min read',
        emoji: '✨',
        color: '#FF6B9D',
        bg: '#FFE0EC',
    },
    {
        id: 'sample-3',
        title: 'Understanding Tongue Tie in Newborns',
        excerpt: 'Tongue tie (ankyloglossia) can affect breastfeeding, speech, and overall development. We explain the signs to look out for, how it\'s diagnosed, and what laser treatment involves.',
        author: 'Dr. R. Midhunraj',
        date: 'April 15, 2026',
        category: 'Specialist Care',
        readTime: '5 min read',
        emoji: '❤️',
        color: '#FF8A65',
        bg: '#FFF3E0',
    },
];

export default function Blog() {
    const [expanded, setExpanded] = useState(null);
    const [adminOpen, setAdminOpen] = useState(false);
    const [customPosts, setCustomPosts] = useState([]);

    // Load saved posts from localStorage on mount
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        // Apply color cycling to saved posts
        const withColors = saved.map((post, idx) => ({
            ...post,
            color: colorMap[idx % colorMap.length].color,
            bg: colorMap[idx % colorMap.length].bg,
        }));
        setCustomPosts(withColors);
    }, []);

    const handleNewPost = (allPosts) => {
        const withColors = allPosts.map((post, idx) => ({
            ...post,
            color: colorMap[idx % colorMap.length].color,
            bg: colorMap[idx % colorMap.length].bg,
        }));
        setCustomPosts(withColors);
    };

    const handleDelete = (id) => {
        const saved = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const updated = saved.filter((p) => p.id !== id);
        localStorage.setItem('thalir_blog_posts', JSON.stringify(updated));
        const withColors = updated.map((post, idx) => ({
            ...post,
            color: colorMap[idx % colorMap.length].color,
            bg: colorMap[idx % colorMap.length].bg,
        }));
        setCustomPosts(withColors);
    };

    // Show custom posts first, then sample posts as examples
    const allPosts = [...customPosts, ...samplePosts];

    return (
        <section className="section blog-section" id="blog">
            <div className="container">

                {/* Header */}
                <div className="blog-header">
                    <span className="blog-badge">
                        <i className="fas fa-pen-nib"></i> Thalir Health Blog
                    </span>
                    <h2 className="section-title">
                        <i className="fas fa-book-open"></i> Expert Dental Tips &amp; Insights
                    </h2>
                    <p className="section-subtitle">
                        Helpful articles written by our specialists to keep your child's smile healthy and bright
                    </p>

                    {/* Write Post Button — always visible */}
                    <button
                        className="btn btn-primary blog-write-btn"
                        onClick={() => setAdminOpen(true)}
                    >
                        <i className="fas fa-pen-nib"></i> Write a Blog Post
                    </button>
                </div>

                {/* Blog Posts Grid */}
                <div className="blog-grid">
                    {allPosts.map((post, idx) => (
                        <article
                            className="blog-card scroll-animate"
                            key={post.id}
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            {/* Card Top */}
                            <div className="blog-card-top" style={{ background: post.bg }}>
                                <div className="blog-emoji">{post.emoji}</div>
                                <span className="blog-category" style={{ color: post.color, background: 'white' }}>
                                    {post.category}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="blog-card-body">
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">
                                    {expanded === post.id
                                        ? post.excerpt
                                        : post.excerpt.slice(0, 120) + '...'}
                                </p>
                                <button
                                    className="blog-read-more"
                                    style={{ color: post.color }}
                                    onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                                >
                                    {expanded === post.id ? (
                                        <><i className="fas fa-chevron-up"></i> Show Less</>
                                    ) : (
                                        <><i className="fas fa-chevron-down"></i> Read More</>
                                    )}
                                </button>
                            </div>

                            {/* Card Footer */}
                            <div className="blog-card-footer">
                                <div className="blog-author">
                                    <i className="fas fa-user-doctor" style={{ color: post.color }}></i>
                                    <span>{post.author}</span>
                                </div>
                                <div className="blog-meta">
                                    <span><i className="fas fa-calendar-alt"></i> {post.date}</span>
                                    <span><i className="fas fa-clock"></i> {post.readTime}</span>
                                </div>
                            </div>

                            {/* Delete button for custom posts */}
                            {!String(post.id).startsWith('sample') && (
                                <button
                                    className="blog-delete-btn"
                                    title="Delete this post"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            )}
                        </article>
                    ))}
                </div>

                {/* Blog CTA */}
                <div className="blog-cta scroll-animate">
                    <div className="blog-cta-inner">
                        <div className="blog-cta-text">
                            <i className="fas fa-lightbulb"></i>
                            <div>
                                <h3>Want to learn more about your child's dental health?</h3>
                                <p>Our doctors regularly share helpful tips, guides and case studies right here.</p>
                            </div>
                        </div>
                        <a
                            href="https://wa.me/919043060968"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp"
                        >
                            <i className="fab fa-whatsapp"></i> Ask Our Doctors
                        </a>
                    </div>
                </div>
            </div>

            {/* Admin Panel Modal */}
            {adminOpen && (
                <BlogAdmin
                    onSave={handleNewPost}
                    onClose={() => setAdminOpen(false)}
                />
            )}
        </section>
    );
}
