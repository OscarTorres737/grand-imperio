export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  eventType: string;
  notes: string;
  guestCount: number | null;
  packageId: string | null;
  packageName: string | null;
  estimatedTotal: number | null;
  createdAt: Date;
}
