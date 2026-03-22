export interface Company {
  companyId: number;
  companyName: string;
  slug: string;

  description: string;
  shortDescription: string;

  // Classification
  industry?: string;
  companySize?: string;
  foundedYear?: number;

  // Links
  websiteUrl: string;
  linkedInUrl?: string;
  twitterUrl?: string;

  // Location
  country?: string;
  city?: string;
  address?: string;
  location: string;

  // Media
  logoUrl?: string;
  bannerUrl?: string;

  phoneNumber?: string;
  email: string;
  fax?: string;

  // Flags
  isFeatured: boolean;
  isVerified: boolean;

  createdAt: Date; // ISO date string
  totalJobs: number;
  createdByUser: string;
}
