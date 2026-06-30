import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc,
  query, orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VenuePackage } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private firestore = inject(Firestore);
  private colRef = collection(this.firestore, 'packages');

  getAll(): Observable<VenuePackage[]> {
    const q = query(this.colRef, orderBy('order', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<VenuePackage[]>;
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
