export interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  features: { name: string }[];
  imageUrl: string[];
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

export interface SummaryItem {
  name: string;
  price: number;
}

export interface SummaryProps {
  title: string;
  basePrice: number;
  additionalItems: SummaryItem[];
  onContinue: () => void;
}

export interface Feature {
  id: string;
  name: string;
  icon: string;
}

export interface Service {
  id: string;
  price: number;
  type: string;
}
