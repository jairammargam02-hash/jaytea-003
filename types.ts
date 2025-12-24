
export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  robots: 'index, follow' | 'noindex, nofollow';
  jsonLd?: string;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string; // HTML or Markdown
  isPublished: boolean;
  type: 'page' | 'blog' | 'service';
  seo: SEOMetadata;
  lastModified: string;
  author?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
}

export enum LeadStatus {
  NEW = 'NEW',
  READ = 'READ',
  CONTACTED = 'CONTACTED',
  CONVERTED = 'CONVERTED',
  ARCHIVED = 'ARCHIVED'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'FRANCHISE' | 'GENERAL' | 'CALLBACK';
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface AdminStats {
  totalPages: number;
  totalBlogs: number;
  totalLeads: number;
  seoScore: number;
}

export interface SiteConfig {
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    stats: { label: string; value: string }[];
  };
}
