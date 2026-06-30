export type AppRole = 'admin' | 'editor';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: AppRole;
  createdAt: Date;
}
