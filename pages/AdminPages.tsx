import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { DataService } from '../services/dataService';
import { PageContent } from '../types';
import { Edit, Trash2, Plus, ExternalLink } from 'lucide-react';

export const AdminPages = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [isEditing, setIsEditing] = useState<PageContent | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => setPages(DataService.getPages());

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      DataService.deletePage(id);
      refresh();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      DataService.savePage(isEditing);
      setIsEditing(null);
      refresh();
    }
  };

  if (isEditing) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-stone-800">{isEditing.id ? 'Edit Page' : 'New Page'}</h2>
            <button onClick={() => setIsEditing(null)} className="text-stone-500 hover:text-stone-800">Cancel</button>
          </div>
          
          <form onSubmit={handleSave} className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold mb-4 text-primary-700 border-b pb-2">Basic Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Page Title</label>
                  <input 
                    className="w-full p-2 border rounded" 
                    value={isEditing.title} 
                    onChange={e => setIsEditing({...isEditing, title: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                  <input 
                    className="w-full p-2 border rounded" 
                    value={isEditing.slug} 
                    onChange={e => setIsEditing({...isEditing, slug: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select 
                    className="w-full p-2 border rounded" 
                    value={isEditing.type}
                    onChange={e => setIsEditing({...isEditing, type: e.target.value as any})}
                  >
                    <option value="page">Standard Page</option>
                    <option value="blog">Blog Post</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <h3 className="text-lg font-bold mb-4 text-primary-700 border-b pb-2">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Title</label>
                  <input 
                    className="w-full p-2 border rounded" 
                    value={isEditing.seo.title} 
                    onChange={e => setIsEditing({...isEditing, seo: {...isEditing.seo, title: e.target.value}})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meta Description</label>
                  <textarea 
                    className="w-full p-2 border rounded" 
                    value={isEditing.seo.description} 
                    onChange={e => setIsEditing({...isEditing, seo: {...isEditing.seo, description: e.target.value}})} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">OG Image URL</label>
                    <input 
                      className="w-full p-2 border rounded" 
                      value={isEditing.seo.ogImage || ''} 
                      onChange={e => setIsEditing({...isEditing, seo: {...isEditing.seo, ogImage: e.target.value}})} 
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium mb-1">Robots</label>
                    <select 
                      className="w-full p-2 border rounded"
                      value={isEditing.seo.robots}
                      onChange={e => setIsEditing({...isEditing, seo: {...isEditing.seo, robots: e.target.value as any}})}
                    >
                      <option value="index, follow">Index, Follow</option>
                      <option value="noindex, nofollow">Noindex, Nofollow</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
               <h3 className="text-lg font-bold mb-4 text-primary-700 border-b pb-2">Content (HTML Supported)</h3>
               <textarea 
                 rows={10}
                 className="w-full p-4 border rounded font-mono text-sm" 
                 value={isEditing.content} 
                 onChange={e => setIsEditing({...isEditing, content: e.target.value})} 
               />
               <p className="text-xs text-stone-500 mt-2">Supports basic HTML tags.</p>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700">Save Changes</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-xl font-bold text-stone-800">Page Manager</h2>
           <p className="text-stone-500 text-sm">Manage website content and blog posts</p>
        </div>
        <button 
          onClick={() => setIsEditing({
            id: '', 
            slug: '/new-page', 
            title: 'New Page', 
            content: '', 
            isPublished: false, 
            type: 'page',
            seo: { title: '', description: '', robots: 'index, follow' },
            lastModified: new Date().toISOString()
          })}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 font-bold"
        >
          <Plus size={18} /> Create Page
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
             <tr>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">URL Slug</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Last Modified</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600 text-right">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-medium">{page.title}</td>
                <td className="px-6 py-4 text-stone-500 font-mono text-xs">{page.slug}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${page.type === 'blog' ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-700'}`}>
                    {page.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-stone-500 text-sm">{new Date(page.lastModified).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <a href={`#${page.slug}`} target="_blank" rel="noreferrer" className="p-2 text-stone-400 hover:text-stone-800"><ExternalLink size={18} /></a>
                  <button onClick={() => setIsEditing(page)} className="p-2 text-primary-600 hover:bg-primary-50 rounded"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(page.id)} className="p-2 text-red-400 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};