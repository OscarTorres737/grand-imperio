import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc,
  query, orderBy
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VenuePackage } from '../models/package.model';

const MOCK_PACKAGES: VenuePackage[] = [
  {
    id: 'mock-esencial',
    name: 'Esencial',
    basePersonCount: 100,
    basePrice: 45000,
    pricePerExtraPerson: 320,
    maxPersonCount: 250,
    includes: ['Salón por 6 horas', 'Mobiliario básico', 'Montaje y limpieza', 'Estacionamiento'],
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    featured: false,
    order: 1,
    active: true,
  },
  {
    id: 'mock-imperial',
    name: 'Imperial',
    basePersonCount: 150,
    basePrice: 78000,
    pricePerExtraPerson: 360,
    maxPersonCount: 400,
    includes: ['Salón por 8 horas', 'Decoración temática', 'Barra libre nacional', 'Coordinador de evento', 'Iluminación ambiental'],
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85',
    featured: true,
    order: 2,
    active: true,
  },
  {
    id: 'mock-gala',
    name: 'Gala',
    basePersonCount: 200,
    basePrice: 120000,
    pricePerExtraPerson: 410,
    maxPersonCount: 500,
    includes: ['Salón principal + terraza', 'Barra premium', 'Mobiliario de lujo', 'Coordinador dedicado'],
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    featured: false,
    order: 3,
    active: true,
  },
];

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private firestore = inject(Firestore);
  private colRef = collection(this.firestore, 'packages');

  getAll(): Observable<VenuePackage[]> {
    const q = query(this.colRef, orderBy('order', 'asc'));
    return (collectionData(q, { idField: 'id' }) as Observable<VenuePackage[]>).pipe(
      catchError(() => of(MOCK_PACKAGES))
    );
  }

  async create(pkg: Omit<VenuePackage, 'id'>): Promise<void> {
    await addDoc(this.colRef, pkg);
  }

  async update(id: string, pkg: Partial<VenuePackage>): Promise<void> {
    await updateDoc(doc(this.firestore, 'packages', id), pkg);
  }

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'packages', id));
  }
}
