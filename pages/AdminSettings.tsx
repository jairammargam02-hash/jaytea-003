
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { DataService } from '../services/dataService';
import { SiteConfig } from '../types';
import { Save } from 'lucide-react';

export const AdminSettings = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setConfig(DataService.getConfig());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (config) {
      DataService.saveConfig(config);
      setMsg('Settings saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleStatChange = (index: number, field: 'label' | 'value', val: string) => {
    if (!config) return;
    const newStats = [...config.home.stats];
    newStats[index] = { ...newStats[index], [field]: val };
    setConfig({ ...config, home: { ...config.home, stats: newStats } });
  };

  if (!config) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800">Global Settings</h2>
          {msg && <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded">{msg}</span>}
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Contact Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-lg font-bold mb-4 text-primary-700 border-b pb-2">Company Contact Info</h3>
            <p className="text-sm text-stone-500 mb-4">These details will appear in the Header, Footer, and Contact page.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number (Display)</label>
                <input 
                  className="w-full p-2 border rounded" 
                  value={config.contact.phone} 
                  onChange={e => setConfig({...config, contact: {...config.contact, phone: e.target.value}})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp Number (No spaces)</label>
                <input 
                  className="w-full p-2 border rounded" 
                  value={config.contact.whatsapp} 
                  onChange={e => setConfig({...config, contact: {...config.contact, whatsapp: e.target.value}})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  className="w-full p-2 border rounded" 
                  value={config.contact.email} 
                  onChange={e => setConfig({...config, contact: {...config.contact, email: e.target.value}})} 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Full Office Address</label>
                <textarea 
                  className="w-full p-2 border rounded" 
                  rows={2}
                  value={config.contact.address} 
                  onChange={e => setConfig({...config, contact: {...config.contact, address: e.target.value}})} 
                />
              </div>
            </div>
          </div>

          {/* Homepage Content */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-lg font-bold mb-4 text-primary-700 border-b pb-2">Homepage Hero & Stats</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Hero Title (Main Heading)</label>
                <input 
                  className="w-full p-2 border rounded font-bold text-lg" 
                  value={config.home.heroTitle} 
                  onChange={e => setConfig({...config, home: {...config.home, heroTitle: e.target.value}})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
                <textarea 
                  className="w-full p-2 border rounded" 
                  value={config.home.heroSubtitle} 
                  onChange={e => setConfig({...config, home: {...config.home, heroSubtitle: e.target.value}})} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hero Background Image URL</label>
                <input 
                  className="w-full p-2 border rounded" 
                  value={config.home.heroImage} 
                  onChange={e => setConfig({...config, home: {...config.home, heroImage: e.target.value}})} 
                />
              </div>
            </div>

            <h4 className="font-bold text-stone-700 mb-2">Key Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {config.home.stats.map((stat, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded border border-stone-200">
                  <label className="block text-xs font-bold text-stone-500 mb-1">Label</label>
                  <input 
                    className="w-full p-1 border rounded text-sm mb-2"
                    value={stat.label}
                    onChange={e => handleStatChange(i, 'label', e.target.value)}
                  />
                  <label className="block text-xs font-bold text-stone-500 mb-1">Value</label>
                  <input 
                    className="w-full p-1 border rounded text-sm font-bold text-primary-600"
                    value={stat.value}
                    onChange={e => handleStatChange(i, 'value', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 flex items-center gap-2">
              <Save size={20} /> Save All Settings
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
