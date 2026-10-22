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

export interface LandmarkItem {
  id: string;
  name: string;
  city: 'مكة المكرمة' | 'المدينة المنورة';
  image: string;
  description: string;
  category: string;
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
