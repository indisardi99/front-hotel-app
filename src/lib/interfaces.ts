export interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  features: { name: string }[];
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
