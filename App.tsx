import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { PublicHome } from './pages/PublicHome';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLeads } from './pages/AdminLeads';
import { AdminPages } from './pages/AdminPages';
import { AdminSettings } from './pages/AdminSettings';
import { PublicLayout } from './components/PublicLayout';
import { LeadForm } from './components/LeadForm';
import { MOCK_ADMIN_PASSWORD } from './constants';
import { DataService } from './services/dataService';
import { SEOHead } from './components/SEOHead';
import { ArrowRight, Calendar, User } from 'lucide-react';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const auth = localStorage.getItem('jaitea_auth');
  if (auth !== 'true') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Login Page
const AdminLogin = () => {
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === MOCK_ADMIN_PASSWORD) {
      localStorage.setItem('jaitea_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-stone-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-800">Partner Login</h2>
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-primary-500 outline-none"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition">Login</button>
      </form>
    </div>
  );
};

// Blog Index Page
const BlogIndex = () => {
  const pages = DataService.getPages().filter(p => p.type === 'blog' && p.isPublished);

  return (
    <PublicLayout>
      <SEOHead seo={{
        title: 'Blog & Insights - JAITEA Franchise',
        description: 'Latest news, trends, and business insights from the tea industry.',
        robots: 'index, follow'
      }} />
      <div className="bg-earth-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & News</h1>
          <p className="text-xl text-earth-200">Updates from the world of chai and business.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pages.map(blog => (
            <Link key={blog.id} to={blog.slug} className="group bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="h-48 bg-stone-200 relative overflow-hidden">
                <img 
                  src={blog.featuredImage || 'https://picsum.photos/800/400'} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.lastModified).toLocaleDateString()}</span>
                  {blog.category && <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-bold">{blog.category}</span>}
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-primary-700 transition-colors">{blog.title}</h3>
                <div className="flex items-center text-primary-600 font-bold text-sm mt-4">
                  Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
          {pages.length === 0 && (
            <div className="col-span-3 text-center py-12 text-stone-500">
              <p>No articles published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

// Generic CMS Page Renderer
const CMSPageRenderer = () => {
  const location = useLocation();
  // Ensure we are looking up exactly the pathname (e.g. /about or /services)
  const page = DataService.getPageBySlug(location.pathname);

  if (!page) {
    return (
      <PublicLayout>
        <SEOHead seo={{ title: '404 Not Found', description: 'Page not found', robots: 'noindex, nofollow' }} />
        <div className="min-h-[60vh] flex items-center justify-center flex-col bg-stone-50">
           <h1 className="text-6xl font-bold text-earth-200 mb-4">404</h1>
           <p className="text-stone-500 text-lg">The page you are looking for does not exist.</p>
           <Link to="/" className="mt-6 bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition">Return Home</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <SEOHead seo={page.seo} />
      <div className="bg-stone-50 min-h-screen pb-20">
        {/* Dynamic Header if Featured Image Exists */}
        {page.featuredImage ? (
           <div className="relative h-64 md:h-80 w-full">
             <img src={page.featuredImage} alt={page.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
               <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">{page.title}</h1>
             </div>
           </div>
        ) : (
           <div className="bg-earth-900 text-white py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold">{page.title}</h1>
           </div>
        )}

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
           <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-100">
             <div 
               className="prose prose-lg prose-stone max-w-none prose-headings:text-earth-800 prose-a:text-primary-600"
               dangerouslySetInnerHTML={{ __html: page.content }} 
             />
           </div>
           
           {/* If it's the Contact page, embed the map roughly (Mock) */}
           {page.slug === '/contact' && (
             <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-stone-200 h-80 bg-stone-200 relative">
               <div className="absolute inset-0 flex items-center justify-center text-stone-500">
                  Google Map Embed Placeholder (Hyderabad)
               </div>
             </div>
           )}
        </div>
      </div>
    </PublicLayout>
  );
};

// Franchise Page (Hardcoded for special layout)
const FranchisePage = () => {
  return (
    <PublicLayout>
       <SEOHead seo={{
         title: "Apply for Franchise | JAITEA", 
         description: "Start your own business with JAITEA. Low investment franchise model.", 
         robots: "index, follow"
       }} />
       <div className="bg-earth-900 py-20 text-center text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-primary-900/20 pattern-grid-lg"></div>
         <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner with Us</h1>
            <p className="text-xl text-earth-200 max-w-2xl mx-auto px-4">Join the fastest growing tea chain in South India. Build your future with JAITEA.</p>
         </div>
       </div>
       <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
         <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
           <div className="md:w-1/2 p-8 md:p-12 bg-primary-50">
             <h3 className="text-2xl font-bold text-earth-900 mb-6">Why Franchise with us?</h3>
             <ul className="space-y-4">
                {[
                  'Proven Business Model',
                  'Low Investment (Starts @ 5 Lakhs)',
                  'Complete Staff Training',
                  'Marketing & Branding Support',
                  'No Chef Required (Standard Recipes)',
                  'High Profit Margins (40-50%)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700">
                    <span className="bg-primary-200 text-primary-800 p-1 rounded-full"><ArrowRight size={14}/></span> {item}
                  </li>
                ))}
             </ul>
           </div>
           <div className="md:w-1/2 p-8 md:p-12">
             <LeadForm type="FRANCHISE" title="Franchise Application" />
           </div>
         </div>
       </div>
    </PublicLayout>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/franchise" element={<FranchisePage />} />
        <Route path="/blog" element={<BlogIndex />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/leads" element={<ProtectedRoute><AdminLeads /></ProtectedRoute>} />
        <Route path="/admin/pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        
        {/* Catch-all for CMS pages (About, Services, Blog Posts) */}
        <Route path="*" element={<CMSPageRenderer />} />
      </Routes>
    </HashRouter>
  );
}