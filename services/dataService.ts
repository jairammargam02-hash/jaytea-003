import { PageContent, Lead, LeadStatus, AdminStats, SiteConfig } from '../types';

// Simple ID generator since we can't import uuid package in this environment easily without deps
const generateId = () => Math.random().toString(36).substr(2, 9);

const STORAGE_KEYS = {
  PAGES: 'jaitea_pages',
  LEADS: 'jaitea_leads',
  CONFIG: 'jaitea_config',
  INIT: 'jaitea_initialized_v3' // Incremented version
};

const DEFAULT_CONFIG: SiteConfig = {
  contact: {
    phone: '+91 98765 43210',
    email: 'franchise@jaitea.com',
    address: 'Plot No. 45, Jubilee Hills, Hyderabad, Telangana - 500033',
    whatsapp: '+919876543210'
  },
  home: {
    heroTitle: 'Brew Success with JAITEA',
    heroSubtitle: 'Low Investment, High ROI. Start your own profitable tea business today in Telangana or Andhra Pradesh.',
    heroImage: 'https://picsum.photos/1920/1080?blur=5',
    stats: [
      { label: 'Outlets', value: '50+' },
      { label: 'Happy Customers', value: '10k+' },
      { label: 'Cities', value: '12+' },
      { label: 'Tea Varieties', value: '25+' },
    ]
  }
};

// Seed Data
const seedData = () => {
  if (localStorage.getItem(STORAGE_KEYS.INIT)) return;

  const initialPages: PageContent[] = [
    {
      id: generateId(),
      slug: '/',
      title: 'Home',
      content: '<h1>Welcome to JAITEA</h1><p>The premium tea franchise of Telugu states.</p>',
      isPublished: true,
      type: 'page',
      seo: {
        title: 'JAITEA - Premium Tea Franchise in Telangana & Andhra Pradesh',
        description: 'Start your own profitable business with JAITEA. Best Tea Franchise in Hyderabad, Vijayawada, and Visakhapatnam.',
        robots: 'index, follow',
        ogImage: 'https://picsum.photos/1200/630'
      },
      lastModified: new Date().toISOString()
    },
    {
      id: generateId(),
      slug: '/about',
      title: 'About JAITEA',
      content: `
        <h2>Our Story</h2>
        <p>Welcome to <strong>JAITEA</strong>, the fastest-growing tea franchise network across Telangana and Andhra Pradesh. Born from a passion for the perfect cup of chai, we started our journey with a single outlet in Hyderabad and have now expanded to over 50+ locations.</p>
        <p>We believe that tea is not just a beverage; it's an emotion that connects people. Our unique blend of tea leaves, sourced from the finest gardens in Assam and Darjeeling, ensures that every sip delivers an authentic and refreshing experience.</p>
        
        <h3>Our Mission</h3>
        <p>To provide a high-quality, hygienic, and affordable tea experience to millions of customers while empowering entrepreneurs to build successful businesses through our franchise model.</p>
        
        <h3>Our Vision</h3>
        <p>To become the most loved tea brand in South India by 2025, known for our taste, quality, and hospitality.</p>
        
        <img src="https://picsum.photos/800/400?grayscale" alt="JAITEA Store" style="border-radius: 8px; margin: 20px 0; width: 100%; object-fit: cover; height: 300px;" />
        
        <h3>Core Values</h3>
        <ul>
          <li><strong>Quality:</strong> We never compromise on ingredients.</li>
          <li><strong>Hygiene:</strong> Cleanliness is our priority.</li>
          <li><strong>Customer First:</strong> We serve smiles with every cup.</li>
        </ul>
      `,
      isPublished: true,
      type: 'page',
      seo: {
        title: 'About JAITEA - Our Story & Vision',
        description: 'Learn about JAITEA, the leading tea franchise in Telugu states. Our mission is to serve the best tea.',
        robots: 'index, follow'
      },
      lastModified: new Date().toISOString(),
      featuredImage: 'https://picsum.photos/1200/500?blur=2'
    },
    {
      id: generateId(),
      slug: '/services',
      title: 'Our Menu & Services',
      content: `
        <p>At JAITEA, we offer a diverse range of beverages and snacks tailored to the local palate. Our menu is designed to cater to all age groups, making our outlets a perfect hangout spot.</p>
        
        <h3>🍵 Premium Tea Varieties</h3>
        <ul>
          <li><strong>JAITEA Special Chai:</strong> Our signature blend with secret spices.</li>
          <li><strong>Ginger Tea (Allam Tea):</strong> Perfect for a refreshing kick.</li>
          <li><strong>Masala Chai:</strong> Traditional spices blended to perfection.</li>
          <li><strong>Lemon Tea:</strong> Zesty and refreshing.</li>
          <li><strong>Green Tea:</strong> For the health-conscious.</li>
        </ul>

        <h3>☕ Coffee & Milk</h3>
        <ul>
          <li><strong>Filter Coffee:</strong> Authentic South Indian taste.</li>
          <li><strong>Boost / Horlicks:</strong> Comfort drinks for everyone.</li>
          <li><strong>Badam Milk:</strong> Rich and creamy.</li>
        </ul>

        <h3>🍪 Snacks</h3>
        <ul>
          <li><strong>Osmania Biscuits:</strong> The classic Hyderabad combo.</li>
          <li><strong>Samosa:</strong> Hot and crispy aloo samosas.</li>
          <li><strong>Sandwiches:</strong> Grilled to perfection.</li>
          <li><strong>Bun Maska:</strong> Soft bun with generous butter.</li>
        </ul>
        
        <h3>🥤 Coolers & Shakes</h3>
        <p>We also serve a variety of thick shakes, cold coffee, and mojitos to beat the heat.</p>
      `,
      isPublished: true,
      type: 'page',
      seo: {
        title: 'JAITEA Menu - Tea, Coffee & Snacks',
        description: 'Explore our wide range of teas, coffees, and snacks. From Masala Chai to Osmania Biscuits.',
        robots: 'index, follow'
      },
      lastModified: new Date().toISOString(),
      featuredImage: 'https://picsum.photos/1200/500?grayscale'
    },
    {
      id: generateId(),
      slug: '/contact',
      title: 'Contact Us',
      content: `
        <p>Have questions? Want to know more about our franchise model? Reach out to us!</p>
        
        <div style="background: #f5f5f4; padding: 20px; border-radius: 8px; border: 1px solid #e7e5e4;">
          <h3>Corporate Office</h3>
          <p><strong>JAITEA Foods Pvt Ltd.</strong><br/>
          Plot No. 45, Jubilee Hills,<br/>
          Hyderabad, Telangana - 500033</p>
          
          <p><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
          <p><strong>Email:</strong> <a href="mailto:franchise@jaitea.com">franchise@jaitea.com</a></p>
          <p><strong>Business Hours:</strong> Mon - Sat: 10:00 AM - 7:00 PM</p>
        </div>

        <h3>Franchise Inquiries</h3>
        <p>For immediate assistance regarding franchise opportunities, please fill out the application form on our <a href="#/franchise" style="color: #059669; font-weight: bold;">Franchise Page</a> or call us directly.</p>
      `,
      isPublished: true,
      type: 'page',
      seo: {
        title: 'Contact JAITEA - Hyderabad Corporate Office',
        description: 'Get in touch with JAITEA for franchise inquiries or general support.',
        robots: 'index, follow'
      },
      lastModified: new Date().toISOString()
    },
    {
      id: generateId(),
      slug: '/franchise',
      title: 'Franchise Opportunities',
      content: '<h2>Become a Partner</h2><p>Join the fastest growing tea network.</p>',
      isPublished: true,
      type: 'page',
      seo: {
        title: 'Apply for JAITEA Franchise | Low Investment High Return',
        description: 'Looking for a business opportunity? Apply for JAITEA franchise today.',
        robots: 'index, follow'
      },
      lastModified: new Date().toISOString()
    },
    {
      id: generateId(),
      slug: '/blog/tea-trends-2024',
      title: 'Tea Industry Trends in 2024',
      content: `
        <p>The tea industry in India is witnessing a massive shift. From traditional tapri culture to premium tea cafes, the evolution is evident.</p>
        <h3>1. Health Consciousness</h3>
        <p>Customers are increasingly opting for Green Tea, Lemon Tea, and herbal blends over sugary milk tea.</p>
        <h3>2. Ambiance Matters</h3>
        <p>Tea drinking is now a social activity. Outlets like JAITEA provide a clean, green, and pleasant environment for meetings and hangouts.</p>
        <h3>3. Technology Integration</h3>
        <p>From digital menus to loyalty programs, technology is playing a key role in customer retention.</p>
      `,
      isPublished: true,
      type: 'blog',
      category: 'Market Insights',
      seo: {
        title: 'Tea Trends 2024 - JAITEA Insights',
        description: 'Read about the latest trends in the tea industry.',
        robots: 'index, follow'
      },
      lastModified: new Date().toISOString(),
      featuredImage: 'https://picsum.photos/800/400'
    },
    {
      id: generateId(),
      slug: '/blog/why-invest-in-tea-franchise',
      title: 'Why Invest in a Tea Franchise?',
      content: `
        <p>Investing in a tea franchise is one of the safest and most profitable business decisions in India right now.</p>
        <h3>Low Investment, High Returns</h3>
        <p>Compared to fine dining restaurants, a tea cafe requires significantly lower capital but offers high profit margins due to low raw material costs.</p>
        <h3>All-Season Demand</h3>
        <p>Tea is an essential part of Indian culture. Come rain or shine, the demand for chai never drops.</p>
        <h3>Standardized Operations</h3>
        <p>With JAITEA, you get a proven business model, standard recipes, and staff training, making it easy to run the business even without prior experience.</p>
      `,
      isPublished: true,
      type: 'blog',
      category: 'Business Tips',
      seo: {
        title: 'Is Tea Franchise Profitable? - JAITEA Blog',
        description: 'Discover why investing in a tea franchise is a smart business move.',
        robots: 'index, follow'
      },
      lastModified: new Date().toISOString(),
      featuredImage: 'https://picsum.photos/800/401'
    }
  ];

  const initialLeads: Lead[] = [
    {
      id: generateId(),
      name: 'Ramesh Gupta',
      email: 'ramesh@example.com',
      phone: '9876543210',
      type: 'FRANCHISE',
      message: 'Interested in opening a franchise in Warangal.',
      status: LeadStatus.NEW,
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    }
  ];

  localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(initialPages));
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(initialLeads));
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
  localStorage.setItem(STORAGE_KEYS.INIT, 'true');
};

// Initialize
if (typeof window !== 'undefined') {
  seedData();
}

export const DataService = {
  // Config
  getConfig: (): SiteConfig => {
    const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return data ? JSON.parse(data) : DEFAULT_CONFIG;
  },

  saveConfig: (config: SiteConfig): void => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  },

  // Pages & Content
  getPages: (): PageContent[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PAGES);
    return data ? JSON.parse(data) : [];
  },

  getPageBySlug: (slug: string): PageContent | undefined => {
    const pages = DataService.getPages();
    return pages.find(p => p.slug === slug);
  },

  savePage: (page: PageContent): void => {
    const pages = DataService.getPages();
    const existingIndex = pages.findIndex(p => p.id === page.id);
    if (existingIndex >= 0) {
      pages[existingIndex] = { ...page, lastModified: new Date().toISOString() };
    } else {
      page.id = generateId();
      page.lastModified = new Date().toISOString();
      pages.push(page);
    }
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
  },

  deletePage: (id: string): void => {
    const pages = DataService.getPages().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
  },

  // Leads
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  },

  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): void => {
    const leads = DataService.getLeads();
    const newLead: Lead = {
      ...lead,
      id: generateId(),
      status: LeadStatus.NEW,
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead); // Add to top
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  },

  updateLeadStatus: (id: string, status: LeadStatus): void => {
    const leads = DataService.getLeads();
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex >= 0) {
      leads[leadIndex].status = status;
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    }
  },

  // Stats
  getStats: (): AdminStats => {
    const pages = DataService.getPages();
    const leads = DataService.getLeads();
    return {
      totalPages: pages.filter(p => p.type === 'page').length,
      totalBlogs: pages.filter(p => p.type === 'blog').length,
      totalLeads: leads.length,
      seoScore: 92 // Mock score based on filled meta tags
    };
  }
};