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
