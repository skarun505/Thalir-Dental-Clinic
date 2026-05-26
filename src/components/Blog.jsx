import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../lib/supabase';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        getBlogs()
            .then((data) => {
                if (active) {
                    setPosts(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error('Error fetching blogs:', err);
                if (active) setLoading(false);
            });
        return () => { active = false; };
    }, []);

    if (loading) {
        return (
            <section className="section blog-section" id="blog">
                <div className="container">
                    <div className="blog-header">
                        <span className="blog-badge">
                            <i className="fas fa-pen-nib"></i> Thalir Health Blog
                        </span>
                        <h2 className="section-title">
                            <i className="fas fa-book-open"></i> Expert Dental Tips &amp; Insights
                        </h2>
                        <p className="section-subtitle">
                            Loading helpful articles written by our specialists...
                        </p>
                    </div>

                    <div className="blog-grid">
                        {[1, 2, 3].map((i) => (
                            <div className="blog-card skeleton-card" key={i}>
                                <div className="blog-card-top skeleton-shimmer" style={{ height: '160px', background: '#F3F4F6' }}></div>
                                <div className="blog-card-body">
                                    <div className="skeleton-line skeleton-shimmer" style={{ height: '24px', width: '80%', marginBottom: '12px', background: '#E5E7EB', borderRadius: '6px' }}></div>
                                    <div className="skeleton-line skeleton-shimmer" style={{ height: '14px', width: '100%', marginBottom: '8px', background: '#E5E7EB', borderRadius: '4px' }}></div>
                                    <div className="skeleton-line skeleton-shimmer" style={{ height: '14px', width: '90%', marginBottom: '20px', background: '#E5E7EB', borderRadius: '4px' }}></div>
                                    <div className="skeleton-line skeleton-shimmer" style={{ height: '16px', width: '35%', background: '#E5E7EB', borderRadius: '4px' }}></div>
                                </div>
                                <div className="blog-card-footer" style={{ borderTop: '1px solid #F3F4F6', padding: '16px 20px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="skeleton-line skeleton-shimmer" style={{ height: '14px', width: '40%', background: '#E5E7EB', borderRadius: '4px' }}></div>
                                    <div className="skeleton-line skeleton-shimmer" style={{ height: '14px', width: '30%', background: '#E5E7EB', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

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

                </div>

                {/* Blog Posts Grid */}
                <div className="blog-grid">
                    {posts.map((post, idx) => (
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

        </section>
    );
}
