import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { DataService } from '../services/dataService';
import { AdminStats } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Users, Globe, Eye } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    setStats(DataService.getStats());
  }, []);

  if (!stats) return <AdminLayout>Loading...</AdminLayout>;

  const cards = [
    { label: 'Total Pages', value: stats.totalPages, icon: <FileText />, color: 'bg-blue-500' },
    { label: 'Published Blogs', value: stats.totalBlogs, icon: <Eye />, color: 'bg-purple-500' },
    { label: 'Total Leads', value: stats.totalLeads, icon: <Users />, color: 'bg-green-500' },
    { label: 'SEO Score', value: `${stats.seoScore}/100`, icon: <Globe />, color: 'bg-orange-500' },
  ];

  const chartData = [
    { name: 'Mon', leads: 4 },
    { name: 'Tue', leads: 3 },
    { name: 'Wed', leads: 7 },
    { name: 'Thu', leads: 5 },
    { name: 'Fri', leads: 8 },
    { name: 'Sat', leads: 12 },
    { name: 'Sun', leads: 9 },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center justify-between">
            <div>
              <p className="text-stone-500 text-sm font-medium">{card.label}</p>
              <h3 className="text-2xl font-bold text-stone-800 mt-1">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-lg text-white ${card.color}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <h3 className="text-lg font-bold text-stone-800 mb-6">Lead Acquisition (This Week)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f5f5f4' }}
                />
                <Bar dataKey="leads" fill="#059669" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-sm font-medium transition flex items-center justify-between group">
              <span>Add New Blog Post</span>
              <span className="text-stone-400 group-hover:text-stone-600">→</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-sm font-medium transition flex items-center justify-between group">
              <span>Generate Sitemap.xml</span>
              <span className="text-stone-400 group-hover:text-stone-600">Download</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-sm font-medium transition flex items-center justify-between group">
              <span>Review New Leads</span>
              <span className="text-primary-600 font-bold bg-primary-50 px-2 py-0.5 rounded text-xs">2 New</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};