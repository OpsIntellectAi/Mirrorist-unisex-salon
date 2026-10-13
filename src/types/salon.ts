export interface SalonService {
  id: string;
  name: string;
  category: 'hair' | 'treatments' | 'skin' | 'mens' | 'bridal' | 'nails';
  gender: 'unisex' | 'women' | 'men';
  duration: string; // e.g. "45 mins" or "2.5 - 3 hrs"
  price: number; // in INR
  originalPrice?: number;
  description: string;
  benefits: string[];
  popular?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  rating: number;
  image: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: 'nanoplastia' | 'color' | 'haircut' | 'bridal' | 'mens';
  beforeImage: string;
  afterImage: string;
  treatmentUsed: string;
  clientStory: string;
  stylistName: string;
  duration: string;
}

export interface Branch {
  id: string;
  name: string;
  area: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  timings: string;
  days: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  embedMapUrl: string;
  landmarks: string;
  parking: string;
  isFlagship?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  coverImage: string;
  content: string[];
  keyTakeaways: string[];
  recommendedServices?: string[];
}

export interface Review {
  id: string;
  clientName: string;
  service: string;
  branch: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface AppointmentBooking {
  id: string;
  branchId: string;
  serviceIds: string[];
  stylistId?: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  gender: 'female' | 'male' | 'unisex';
  notes?: string;
  totalPrice: number;
  totalDurationMinutes: number;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed';
}
