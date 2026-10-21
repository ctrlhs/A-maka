export interface PackageItem {
  id: string;
  name: string;
  badge: string;
  badgeColor?: string;
  isPopular?: boolean;
  subtitle: string;
  priceNote: string;
  features: string[];
  mealsType: string;
}

export interface RouteItem {
  id: string;
  title: string;
  departure: string;
  stops: string[];
  description: string;
  highlights: string[];
  recommendedFor: string;
}

export interface LandmarkItem {
  id: string;
  name: string;
  city: 'مكة المكرمة' | 'المدينة المنورة';
  image: string;
  description: string;
  category: string;
}

export interface ItineraryDay {
  phase: string;
  days: string;
  title: string;
  city: 'مكة المكرمة' | 'المدينة المنورة' | 'السفر والانتقال';
  activities: string[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  route: string;
  packageType: string;
  meals: string;
  travelDate: string;
  travelersCount: string;
  notes: string;
}
