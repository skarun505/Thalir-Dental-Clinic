import { createClient } from '@supabase/supabase-js';
import { colorMap, samplePosts } from './blogData';
export { colorMap };

// Replace these with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create the client if valid credentials exist and are not placeholders
const isConfigured = supabaseUrl && 
                    supabaseAnonKey && 
                    !supabaseUrl.includes('YOUR_') &&
                    !supabaseUrl.includes('your_') &&
                    !supabaseUrl.includes('placeholder') &&
                    supabaseUrl.startsWith('https://');

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
export const isDemoMode = !supabase;

// Helper to assign colors dynamically based on index to keep visuals premium
export function assignColors(posts) {
    return posts.map((post, idx) => ({
        ...post,
        color: colorMap[idx % colorMap.length].color,
        bg: colorMap[idx % colorMap.length].bg,
    }));
}

// ─── APPOINTMENTS MAPPING & OPERATIONS ───────────────────────────────

function mapDbAppointmentToUi(db) {
    if (!db) return null;
    return {
        id: db.id,
        parentName: db.parent_name,
        childName: db.child_name,
        childAge: db.child_age,
        phone: db.phone,
        service: db.service,
        appointmentDate: db.appointment_date,
        appointmentTime: db.appointment_time,
        notes: db.notes || '',
        status: db.status || 'pending',
        createdAt: db.created_at
    };
}

export async function insertAppointment(data) {
    const formattedDemo = {
        id: 'demo-' + Date.now(),
        parent_name: data.parentName,
        child_name: data.childName,
        child_age: parseInt(data.childAge) || 0,
        phone: data.phone,
        service: data.service,
        appointment_date: data.appointmentDate,
        appointment_time: data.appointmentTime,
        notes: data.notes || '',
        status: 'pending',
        created_at: new Date().toISOString()
    };

    if (!supabase) {
        console.warn('Supabase not configured. Running in demo mode.');
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        const updated = [formattedDemo, ...existing];
        localStorage.setItem('thalir_appointments', JSON.stringify(updated));
        return [mapDbAppointmentToUi(formattedDemo)];
    }

    try {
        const { data: result, error } = await supabase
            .from('appointments')
            .insert([
                {
                    parent_name: data.parentName,
                    child_name: data.childName,
                    child_age: parseInt(data.childAge) || 0,
                    phone: data.phone,
                    service: data.service,
                    appointment_date: data.appointmentDate,
                    appointment_time: data.appointmentTime,
                    notes: data.notes || '',
                    status: 'pending',
                },
            ])
            .select();

        if (error) throw error;
        return result.map(mapDbAppointmentToUi);
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        const updated = [formattedDemo, ...existing];
        localStorage.setItem('thalir_appointments', JSON.stringify(updated));
        return [mapDbAppointmentToUi(formattedDemo)];
    }
}

export async function getAppointments() {
    if (!supabase) {
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        return existing.map(mapDbAppointmentToUi);
    }

    try {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data.map(mapDbAppointmentToUi);
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        return existing.map(mapDbAppointmentToUi);
    }
}

export async function updateAppointmentStatus(id, status) {
    if (!supabase || String(id).startsWith('demo-')) {
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        const updated = existing.map(appt => appt.id === id ? { ...appt, status } : appt);
        localStorage.setItem('thalir_appointments', JSON.stringify(updated));
        return updated.map(mapDbAppointmentToUi);
    }

    try {
        const { data, error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id)
            .select();

        if (error) throw error;
        return data.map(mapDbAppointmentToUi);
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        const updated = existing.map(appt => appt.id === id ? { ...appt, status } : appt);
        localStorage.setItem('thalir_appointments', JSON.stringify(updated));
        return updated.map(mapDbAppointmentToUi);
    }
}

export async function deleteAppointment(id) {
    if (!supabase || String(id).startsWith('demo-')) {
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        const updated = existing.filter(appt => appt.id !== id);
        localStorage.setItem('thalir_appointments', JSON.stringify(updated));
        return true;
    }

    try {
        const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_appointments') || '[]');
        const updated = existing.filter(appt => appt.id !== id);
        localStorage.setItem('thalir_appointments', JSON.stringify(updated));
        return true;
    }
}

// ─── BLOG MAPPING & OPERATIONS ───────────────────────────────────────

function mapDbBlogToUi(dbBlog) {
    if (!dbBlog) return null;
    return {
        id: dbBlog.id,
        title: dbBlog.title,
        excerpt: dbBlog.excerpt,
        author: dbBlog.author,
        date: dbBlog.date,
        category: dbBlog.category,
        readTime: dbBlog.read_time,
        emoji: dbBlog.emoji,
        imageUrl: dbBlog.image_url,
        createdAt: dbBlog.created_at
    };
}

function mapUiBlogToDb(uiBlog) {
    return {
        id: String(uiBlog.id),
        title: uiBlog.title,
        excerpt: uiBlog.excerpt,
        author: uiBlog.author,
        date: uiBlog.date,
        category: uiBlog.category,
        read_time: uiBlog.readTime,
        emoji: uiBlog.emoji,
        image_url: uiBlog.imageUrl || null
    };
}

export async function getBlogs() {
    if (!supabase) {
        const local = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const mappedLocal = local.map(post => ({
            ...post,
            id: post.id,
            imageUrl: post.imageUrl || post.image_url,
            readTime: post.readTime || post.read_time
        }));
        return assignColors([...mappedLocal, ...samplePosts]);
    }

    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
            return assignColors(data.map(mapDbBlogToUi));
        } else {
            return assignColors(samplePosts);
        }
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const local = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const mappedLocal = local.map(post => ({
            ...post,
            id: post.id,
            imageUrl: post.imageUrl || post.image_url,
            readTime: post.readTime || post.read_time
        }));
        return assignColors([...mappedLocal, ...samplePosts]);
    }
}

export async function getBlogById(id) {
    const blogs = await getBlogs();
    return blogs.find(b => String(b.id) === String(id));
}

export async function insertBlog(post) {
    const dbPost = mapUiBlogToDb(post);
    
    if (!supabase) {
        const existing = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        localStorage.setItem('thalir_blog_posts', JSON.stringify([dbPost, ...existing]));
        return mapDbBlogToUi(dbPost);
    }

    try {
        const { data, error } = await supabase
            .from('blogs')
            .insert([dbPost])
            .select();

        if (error) throw error;
        return mapDbBlogToUi(data[0]);
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        localStorage.setItem('thalir_blog_posts', JSON.stringify([dbPost, ...existing]));
        return mapDbBlogToUi(dbPost);
    }
}

export async function updateBlog(post) {
    const dbPost = mapUiBlogToDb(post);

    if (!supabase || String(post.id).startsWith('sample-') || isNaN(Number(post.id))) {
        const existing = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const updated = existing.some(p => String(p.id) === String(post.id))
            ? existing.map(p => String(p.id) === String(post.id) ? dbPost : p)
            : [dbPost, ...existing];
        localStorage.setItem('thalir_blog_posts', JSON.stringify(updated));
        return mapDbBlogToUi(dbPost);
    }

    try {
        const { data, error } = await supabase
            .from('blogs')
            .update(dbPost)
            .eq('id', String(post.id))
            .select();

        if (error) throw error;
        return mapDbBlogToUi(data[0]);
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const updated = existing.some(p => String(p.id) === String(post.id))
            ? existing.map(p => String(p.id) === String(post.id) ? dbPost : p)
            : [dbPost, ...existing];
        localStorage.setItem('thalir_blog_posts', JSON.stringify(updated));
        return mapDbBlogToUi(dbPost);
    }
}

export async function deleteBlog(id) {
    if (!supabase || String(id).startsWith('sample-') || isNaN(Number(id))) {
        const existing = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const updated = existing.filter(p => String(p.id) !== String(id));
        localStorage.setItem('thalir_blog_posts', JSON.stringify(updated));
        return true;
    }

    try {
        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', String(id));

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_blog_posts') || '[]');
        const updated = existing.filter(p => String(p.id) !== String(id));
        localStorage.setItem('thalir_blog_posts', JSON.stringify(updated));
        return true;
    }
}

// ─── MEDIA LIBRARY OPERATIONS ────────────────────────────────────────

export async function getMedia() {
    if (!supabase) {
        return JSON.parse(localStorage.getItem('thalir_media_library') || '[]');
    }

    try {
        const { data, error } = await supabase
            .from('media_library')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        return JSON.parse(localStorage.getItem('thalir_media_library') || '[]');
    }
}

export async function insertMedia(item) {
    const dbItem = {
        id: String(item.id),
        name: item.name,
        url: item.url
    };

    if (!supabase) {
        const existing = JSON.parse(localStorage.getItem('thalir_media_library') || '[]');
        const updated = [dbItem, ...existing];
        localStorage.setItem('thalir_media_library', JSON.stringify(updated));
        return dbItem;
    }

    try {
        const { data, error } = await supabase
            .from('media_library')
            .insert([dbItem])
            .select();

        if (error) throw error;
        return data[0];
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_media_library') || '[]');
        const updated = [dbItem, ...existing];
        localStorage.setItem('thalir_media_library', JSON.stringify(updated));
        return dbItem;
    }
}

export async function deleteMedia(id) {
    if (!supabase || String(id).startsWith('demo-') || isNaN(Number(id))) {
        const existing = JSON.parse(localStorage.getItem('thalir_media_library') || '[]');
        const updated = existing.filter(m => String(m.id) !== String(id));
        localStorage.setItem('thalir_media_library', JSON.stringify(updated));
        return true;
    }

    try {
        const { error } = await supabase
            .from('media_library')
            .delete()
            .eq('id', String(id));

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        const existing = JSON.parse(localStorage.getItem('thalir_media_library') || '[]');
        const updated = existing.filter(m => String(m.id) !== String(id));
        localStorage.setItem('thalir_media_library', JSON.stringify(updated));
        return true;
    }
}

// ─── SMILE OF THE MONTH OPERATIONS ────────────────────────────────────

export async function getSmileOfMonth() {
    if (!supabase) {
        return JSON.parse(localStorage.getItem('thalir_smile_of_month') || 'null');
    }

    try {
        const { data, error } = await supabase
            .from('smile_of_the_month')
            .select('*')
            .eq('id', 1)
            .maybeSingle();

        if (error) throw error;
        if (data) {
            return {
                imageUrl: data.image_url,
                title: data.title,
                description: data.description
            };
        }
        return null;
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        return JSON.parse(localStorage.getItem('thalir_smile_of_month') || 'null');
    }
}

export async function updateSmileOfMonth(smile) {
    const dbSmile = {
        id: 1,
        image_url: smile.imageUrl,
        title: smile.title,
        description: smile.description,
        updated_at: new Date().toISOString()
    };

    if (!supabase) {
        localStorage.setItem('thalir_smile_of_month', JSON.stringify(smile));
        return smile;
    }

    try {
        const { data, error } = await supabase
            .from('smile_of_the_month')
            .upsert(dbSmile)
            .select();

        if (error) throw error;
        return {
            imageUrl: data[0].image_url,
            title: data[0].title,
            description: data[0].description
        };
    } catch (err) {
        console.error('Supabase query failed, falling back to local storage:', err);
        localStorage.setItem('thalir_smile_of_month', JSON.stringify(smile));
        return smile;
    }
}
