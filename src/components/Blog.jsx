import { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogAdmin from './BlogAdmin';
import { colorMap, samplePosts, getCustomPosts } from '../lib/blogData';

export default function Blog() {
    const [adminOpen, setAdminOpen] = useState(false);
    const [customPosts, setCustomPosts] = useState(() => getCustomPosts());

    const handleNewPost = () => {
        setCustomPosts(getCustomPosts());
    };

    const handleDelete = (id) => {
        const saved = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const updated = saved.filter((p) => p.id !== id);
        localStorage.setItem('thalir_blog_posts', JSON.stringify(updated));
        setCustomPosts(getCustomPosts());
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
                                    {post.excerpt.replace(/<[^>]+>/g, '').slice(0, 120) + '...'}
                                </p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="blog-read-more"
                                    style={{ color: post.color, textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}
                                >
                                    <i className="fas fa-arrow-right"></i> Read Full Post
                                </Link>
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
