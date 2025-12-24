import React, { useState } from 'react';
import { DataService } from '../services/dataService';
import { FORMSPREE_ENDPOINT } from '../constants';

interface LeadFormProps {
  type: 'FRANCHISE' | 'GENERAL';
  title?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ type, title }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    // 1. Save to Local Lead Manager (Architecture requirement: UI never accesses storage directly, but we use Service)
    DataService.addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      type: type
    });

    // 2. POST to Formspree
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, leadType: type })
      });

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      console.error(error);
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="p-8 bg-primary-50 rounded-xl border border-primary-200 text-center animate-fade-in">
        <h3 className="text-2xl font-bold text-primary-800 mb-2">Thank You!</h3>
        <p className="text-primary-700">We have received your details. Our franchise manager will call you shortly.</p>
        <button onClick={() => setStatus('IDLE')} className="mt-4 text-sm underline text-primary-600">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-earth-100">
      {title && <h3 className="text-xl font-bold text-earth-800 mb-4">{title}</h3>}
      
      <div>
        <label className="block text-sm font-medium text-stone-600 mb-1">Full Name</label>
        <input
          required
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">Phone Number</label>
          <input
            required
            type="tel"
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1">Email Address</label>
          <input
            required
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-600 mb-1">Message / Query</label>
        <textarea
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'SUBMITTING'}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {status === 'SUBMITTING' ? 'Sending...' : (type === 'FRANCHISE' ? 'Apply Now' : 'Send Message')}
      </button>
      
      {status === 'ERROR' && (
        <p className="text-red-500 text-sm text-center">Something went wrong. Please try again or call us directly.</p>
      )}
    </form>
  );
};