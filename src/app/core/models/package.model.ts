export interface VenuePackage {
  id?: string;
  name: string;
  basePersonCount: number;
  basePrice: number;
  pricePerExtraPerson: number;
  maxPersonCount: number;
  includes: string[];
  imageUrl: string;
  featured: boolean;
  order: number;
  active: boolean;
}
