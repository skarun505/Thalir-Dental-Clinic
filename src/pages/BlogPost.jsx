import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../lib/blogData';
import { useEffect } from 'react';
import SEO from '../components/SEO';

export default function BlogPost() {
    const { id } = useParams();
    const post = getPostById(id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Post Not Found</h2>
                <p>The blog post you are looking for does not exist or has been removed.</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                    <i className="fas fa-arrow-left"></i> Back to Home
                </Link>
            </div>
        );
    }

    // Check if it's HTML (from rich editor) or plain text (legacy/sample)
    const isHtml = /<[a-z][\s\S]*>/i.test(post.excerpt);
    const contentHtml = isHtml 
        ? post.excerpt 
        : post.excerpt.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');

    return (
        <div className="blog-post-page" style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '60px' }}>
            <SEO 
                title={post.title} 
                description={post.excerpt.replace(/<[^>]+>/g, '').substring(0, 160)} 
                image={post.imageUrl} 
                url={`/blog/${id}`} 
            />
            {/* Minimal Navbar */}
            <div style={{ backgroundColor: 'white', padding: '16px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#2D3748', fontWeight: 600 }}>
                        <i className="fas fa-arrow-left"></i> Back to Home
                    </Link>
                    <div style={{ fontWeight: 'bold', color: '#6C63FF' }}>
                        <i className="fas fa-tooth"></i> Thalir Blog
                    </div>
                </div>
            </div>

            {/* Post Header / Cover Image */}
            <article className="container" style={{ maxWidth: '800px', marginTop: '40px' }}>
                {post.imageUrl && (
                    <div style={{ width: '100%', height: '350px', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                )}

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <span className="blog-category" style={{ color: post.color, background: post.bg }}>
                        {post.category}
                    </span>
                    <span style={{ fontSize: '1.5rem' }}>{post.emoji}</span>
                </div>

                <h1 style={{ fontSize: '2.5rem', color: '#2D3748', lineHeight: '1.2', marginBottom: '24px' }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #E2E8F0', marginBottom: '32px', color: '#718096', fontSize: '0.95rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: post.bg, color: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <i className="fas fa-user-doctor"></i>
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, color: '#2D3748' }}>{post.author}</div>
                            <div><i className="fas fa-calendar-alt"></i> {post.date}</div>
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fas fa-clock"></i> {post.readTime}
                    </div>
                </div>

                {/* Content */}
                <div 
                    className="blog-content-rich"
                    style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#4A5568' }}
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <style>{`
                    .blog-content-rich p {
                        margin-bottom: 24px;
                    }
                    .blog-content-rich h2, .blog-content-rich h3 {
                        color: #2D3748;
                        margin-top: 40px;
                        margin-bottom: 16px;
                    }
                    .blog-content-rich ul, .blog-content-rich ol {
                        margin-bottom: 24px;
                        padding-left: 24px;
                    }
                    .blog-content-rich li {
                        margin-bottom: 8px;
                    }
                    .blog-content-rich img {
                        max-width: 100%;
                        border-radius: 12px;
                        margin: 32px 0;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    }
                    .blog-content-rich blockquote {
                        border-left: 4px solid #6C63FF;
                        padding-left: 20px;
                        margin: 32px 0;
                        font-style: italic;
                        color: #718096;
                        background: #F7FAFC;
                        padding: 16px 20px;
                        border-radius: 0 8px 8px 0;
                    }
                `}</style>

                {/* Footer CTA */}
                <div style={{ marginTop: '48px', padding: '32px', background: '#EDE9FF', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ color: '#2D3748', marginBottom: '12px' }}>Have questions about your child's dental health?</h3>
                    <p style={{ color: '#4A5568', marginBottom: '20px' }}>Our specialists at Thalir Dental Clinic are here to help.</p>
                    <a href="https://wa.me/919043060968" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <i className="fab fa-whatsapp"></i> Chat with Us
                    </a>
                </div>
            </article>
        </div>
    );
}
