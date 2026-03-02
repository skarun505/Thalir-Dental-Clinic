import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create the client if valid credentials exist
const isConfigured = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('YOUR_');

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function insertAppointment(data) {
    if (!supabase) {
        // Demo mode - simulate success when Supabase is not configured
        console.warn('Supabase not configured. Running in demo mode.');
        return new Promise((resolve) => {
            setTimeout(() => resolve([{ id: 'demo-' + Date.now() }]), 1500);
        });
    }

    const { data: result, error } = await supabase
        .from('appointments')
        .insert([
            {
                parent_name: data.parentName,
                child_name: data.childName,
                child_age: parseInt(data.childAge),
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
    return result;
}
