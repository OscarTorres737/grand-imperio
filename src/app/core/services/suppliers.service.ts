import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc,
  query, orderBy
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Supplier } from '../models/supplier.model';

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'mock-banquete-real',
    name: 'Banquetes Real',
    category: 'banquetes',
    description: 'Menú tradicional mexicano e internacional, servicio de meseros incluido.',
    priceFrom: 280,
    priceTo: 450,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
    phone: '8112345678',
    order: 1,
    active: true,
  },
  {
    id: 'mock-barra-imperial',
    name: 'Barra Imperial',
    category: 'alcohol',
    description: 'Barra libre con mixología de autor y bartenders certificados.',
    priceFrom: 150,
    priceTo: 320,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    phone: '8112345679',
    order: 2,
    active: true,
  },
  {
    id: 'mock-dj-pulso',
    name: 'DJ Pulso',
    category: 'dj',
    description: 'DJ profesional con equipo de sonido e iluminación incluido.',
    priceFrom: 8000,
    priceTo: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    phone: '8112345680',
    order: 3,
    active: true,
  },
  {
    id: 'mock-grupo-versatil',
    name: 'Grupo Versátil MX',
    category: 'grupos',
    description: 'Banda en vivo para ambientar tu evento con los mejores éxitos.',
    priceFrom: 12000,
    priceTo: null,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    phone: '8112345681',
    order: 4,
    active: true,
  },
];

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  private firestore = inject(Firestore);
  private colRef = collection(this.firestore, 'suppliers');

  getAll(): Observable<Supplier[]> {
    const q = query(this.colRef, orderBy('order', 'asc'));
    return (collectionData(q, { idField: 'id' }) as Observable<Supplier[]>).pipe(
      catchError(() => of(MOCK_SUPPLIERS))
    );
  }

  async create(supplier: Omit<Supplier, 'id'>): Promise<void> {
    await addDoc(this.colRef, supplier);
  }

  async update(id: string, supplier: Partial<Supplier>): Promise<void> {
    await updateDoc(doc(this.firestore, 'suppliers', id), supplier);
  }

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'suppliers', id));
  }
}
