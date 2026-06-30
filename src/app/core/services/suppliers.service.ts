import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc,
  query, orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({ providedIn: 'root' })
export class SuppliersService {
  private firestore = inject(Firestore);
  private colRef = collection(this.firestore, 'suppliers');

  getAll(): Observable<Supplier[]> {
    const q = query(this.colRef, orderBy('order', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Supplier[]>;
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
