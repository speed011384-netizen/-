export interface Review {
  id: string;
  author: string;
  petName: string;
  petType: 'dog' | 'cat' | 'special';
  rating: number;
  content: string;
  date: string;
  imageUrl?: string;
  isCustom?: boolean;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  petType: 'dog' | 'cat' | 'special';
  petDetails: string;
  pickup: string;
  dropoff: string;
  distance: number;
  fare: number;
  options: string[];
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  category: 'dog' | 'cat' | 'special';
  title: string;
  description: string;
  imageUrl: string;
}

export interface SiteConfig {
  companyName: string;
  ceoName: string;
  address: string;
  businessNumber: string;
  mailOrderNumber: string;
  animalLicenseNumber: string;
  phone: string;
  privacyOfficer: string;
  naverBlogUrl?: string;
  naverTalktalkUrl?: string;
  instagramUrl?: string;
  naverTvUrl?: string;
}

export interface FareConfig {
  baseFare: number;
  perKmFare: number;
  minFare: number;
  minFareDistanceLimit: number; // 7km
  petCareSurcharge: number;     // 5,000
  viaSurcharge: number;         // 5,000
  nightSurcharge: number;       // 5,000
  outOfSeoulSurcharge: number;  // 5,000
  waitingFarePer10Min: number;  // 1,000
}
