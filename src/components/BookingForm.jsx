import { useState } from 'react';
import { insertAppointment } from '../lib/supabase';

const serviceOptions = [
    'Tooth Cleaning',
    'Fluoride Treatment',
    'Cavity Filling',
    'Braces & Aligners',
    'First Visit',
    'Emergency Care',
    'General Check-up',
];

const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM',
    '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM',
    '6:30 PM',
];

export default function BookingForm({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        parentName: '',
        childName: '',
        childAge: '',
        phone: '',
        service: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.parentName.trim()) return 'Parent name is required';
        if (!formData.childName.trim()) return 'Child name is required';
        if (!formData.childAge || formData.childAge < 0 || formData.childAge > 18) return 'Please enter a valid age (0-18)';
        if (!formData.phone.trim() || formData.phone.length < 10) return 'Please enter a valid phone number';
        if (!formData.service) return 'Please select a service';
        if (!formData.appointmentDate) return 'Please select a date';
        if (!formData.appointmentTime) return 'Please select a time';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await insertAppointment(formData);
            setSuccess(true);
        } catch (err) {
            console.error('Booking error:', err);
            setError('Something went wrong. Please try again or call us directly.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSuccess(false);
        setError('');
        setFormData({
            parentName: '',
            childName: '',
            childAge: '',
            phone: '',
            service: '',
            appointmentDate: '',
            appointmentTime: '',
            notes: '',
        });
        onClose();
    };

    // Get tomorrow's date as min date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className="exit-popup-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
            <div className="booking-form-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <button className="exit-popup-close" onClick={handleClose}><i className="fas fa-times"></i></button>

                {success ? (
                    <div className="booking-success">
                        <div className="success-icon"><i className="fas fa-check-circle" style={{ color: '#6BCB77' }}></i></div>
                        <h3>Appointment Booked!</h3>
                        <p>
                            Thank you, {formData.parentName}! We've received {formData.childName}'s appointment
                            request for <strong>{formData.appointmentDate}</strong> at <strong>{formData.appointmentTime}</strong>.
                            <br /><br />
                            We'll confirm via call/WhatsApp shortly! <i className="fas fa-mobile-alt"></i>
                        </p>
                        <button className="btn btn-primary" onClick={handleClose}>
                            <i className="fas fa-check"></i> Done
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="booking-form-header">
                            <span className="emoji"><i className="fas fa-tooth" style={{ color: '#6C63FF' }}></i></span>
                            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                                Book Appointment
                            </h2>
                            <p className="section-subtitle" style={{ marginBottom: 0, fontSize: '0.9rem' }}>
                                Fill in the details and we'll confirm your slot!
                            </p>
                        </div>

                        {error && (
                            <div style={{
                                background: '#FFE0EC',
                                color: '#D32F2F',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                marginBottom: '16px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                            }}>
                                <i className="fas fa-exclamation-triangle"></i> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label><i className="fas fa-user"></i> Parent Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="parentName"
                                    className="form-input"
                                    placeholder="Enter parent's full name"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label><i className="fas fa-child"></i> Child Name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        name="childName"
                                        className="form-input"
                                        placeholder="Child's name"
                                        value={formData.childName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><i className="fas fa-birthday-cake"></i> Child Age <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        name="childAge"
                                        className="form-input"
                                        placeholder="Age"
                                        min="0"
                                        max="18"
                                        value={formData.childAge}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label><i className="fas fa-phone"></i> Phone Number <span className="required">*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label><i className="fas fa-tooth"></i> Service Type <span className="required">*</span></label>
                                <select
                                    name="service"
                                    className="form-input"
                                    value={formData.service}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a service</option>
                                    {serviceOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label><i className="fas fa-calendar-alt"></i> Preferred Date <span className="required">*</span></label>
                                    <input
                                        type="date"
                                        name="appointmentDate"
                                        className="form-input"
                                        min={minDate}
                                        value={formData.appointmentDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><i className="fas fa-clock"></i> Preferred Time <span className="required">*</span></label>
                                    <select
                                        name="appointmentTime"
                                        className="form-input"
                                        value={formData.appointmentTime}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select time</option>
                                        {timeSlots.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label><i className="fas fa-sticky-note"></i> Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    className="form-input"
                                    placeholder="Any special concerns or requests..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary form-submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <><i className="fas fa-spinner fa-spin"></i> Booking...</>
                                ) : (
                                    <><i className="fas fa-calendar-check"></i> Confirm Appointment</>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
