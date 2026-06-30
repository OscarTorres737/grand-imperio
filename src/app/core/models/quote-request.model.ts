export interface QuoteRequest {
  id?: string;
  name: string;
  phone: string;
  email: string;
  guestCount: number;
  eventType: string;
  packageId: string | null;
  packageName: string | null;
  estimatedTotal: number;
  notes: string;
  status: 'nuevo' | 'contactado' | 'cerrado';
  createdAt: Date;
}
