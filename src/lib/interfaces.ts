export interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  features: { name: string }[];
  imageUrl: string[];
}

export interface Preference {
  id: string;
  title: string;
  number: number;
  unit_price: number;
}

export interface RoomSearch {
  id: string;
  number: number;
  price: number;
  category: string;
  features: Feature[];
  images: string[];
  description: string;
}

export interface ServicesProps {
  id: string;
  title: string;
  icon: string;
}

export interface RoomCardProps {
  id: string;
  imageUrl: string;
  number: number;
  title: string;
  price: number;
  services: ServicesProps[];
}

export interface Service {
  id: string;
  type: string;
  price: number;
}

export interface SummaryItem {
  name: string;
  price: number;
}

export interface SummaryProps {
  title: string;
  basePrice: number;
  additionalItems: SummaryItem[];
  id: string;
}

export interface Feature {
  id: string;
  name: string;
  icon: string;
}
