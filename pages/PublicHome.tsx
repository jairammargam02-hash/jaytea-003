
import React from 'react';
import { PublicLayout } from '../components/PublicLayout';
import { SEOHead } from '../components/SEOHead';
import { LeadForm } from '../components/LeadForm';
import { CheckCircle, TrendingUp, Users, Coffee } from 'lucide-react';
import { DataService } from '../services/dataService';
import { Link } from 'react-router-dom';

export const PublicHome = () => {
  const pageData = DataService.getPageBySlug('/');
  const config = DataService.getConfig();
  
  const seo = pageData?.seo || {
    title: 'JAITEA - Best Tea Franchise',
    description: 'Join JAITEA',
    robots: 'index, follow'
  };

  return (
    <PublicLayout>
      <SEOHead seo={seo} />
      
      {/* Hero Section */}
      <section className="relative bg-earth-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary-900 opacity-20 pattern-grid-lg"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url('${config.home.heroImage}')` }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-primary-500/20 border border-primary-400 text-primary-300 text-sm font-bold tracking-wider uppercase">
              #1 Tea Franchise in Telugu States
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {config.home.heroTitle}
            </h1>
            <p className="text-xl text-earth-100 max-w-lg">
              {config.home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/franchise" className="bg-primary-500 hover:bg-primary-400 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-primary-500/50 transition-all text-center">
                Apply for Franchise
              </Link>
              <Link to="/services" className="bg-transparent border-2 border-white hover:bg-white hover:text-earth-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all text-center">
                Explore Menu
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://picsum.photos/600/600" 
              alt="Tea Cup" 
              className="rounded-2xl shadow-2xl border-4 border-earth-700/50 transform rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-10 relative z-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl shadow-xl border border-stone-100">
          {config.home.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary-600 mb-1">{stat.value}</div>
              <div className="text-stone-500 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-4">Why Partner with JAITEA?</h2>
            <p className="text-lg text-stone-600">We provide end-to-end support to ensure your franchise becomes a local favorite from Day 1.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <TrendingUp size={32} />, title: 'High ROI', desc: 'Proven business model with excellent profit margins and quick break-even.' },
              { icon: <Users size={32} />, title: 'Full Support', desc: 'From site selection to staff training, we are with you at every step.' },
              { icon: <Coffee size={32} />, title: 'Premium Taste', desc: 'Our secret recipes ensure customers keep coming back for more.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-stone-100">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-earth-800 mb-3">{feature.title}</h3>
                <p className="text-stone-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <ul className="space-y-4 mb-8">
                {['Low Setup Cost', 'No Royalty Fees (Limited Offer)', 'Marketing Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg">
                    <CheckCircle className="text-primary-200" /> {item}
                  </li>
                ))}
              </ul>
              <div className="bg-primary-700/50 p-6 rounded-lg border border-primary-500">
                <p className="font-semibold mb-2">📞 Direct Franchise Line</p>
                <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="text-2xl font-bold hover:text-primary-200">{config.contact.phone}</a>
              </div>
            </div>
            <div>
              <LeadForm type="FRANCHISE" title="Request Franchise Details" />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
