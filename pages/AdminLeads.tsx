import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { DataService } from '../services/dataService';
import { Lead, LeadStatus } from '../types';
import { Search, Filter, Phone, Mail } from 'lucide-react';

export const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    setLeads(DataService.getLeads());
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    DataService.updateLeadStatus(id, newStatus as LeadStatus);
    setLeads(DataService.getLeads()); // Refresh
  };

  const filteredLeads = filter === 'ALL' ? leads : leads.filter(l => l.status === filter);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
          />
        </div>
        <div className="flex gap-2">
          {['ALL', 'NEW', 'READ', 'CONTACTED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === f 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-stone-600 text-sm">Name & Details</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-sm">Type</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-sm">Message</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-sm">Status</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-sm">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-stone-800">{lead.name}</div>
                  <div className="flex flex-col text-xs text-stone-500 mt-1 gap-1">
                    <span className="flex items-center gap-1"><Mail size={12}/> {lead.email}</span>
                    <span className="flex items-center gap-1"><Phone size={12}/> {lead.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                    lead.type === 'FRANCHISE' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {lead.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600 max-w-xs truncate">
                  {lead.message}
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className="text-xs font-medium border border-stone-200 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    {Object.values(LeadStatus).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                  No leads found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};