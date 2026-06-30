import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc,
  query, orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { QuoteRequest } from '../models/quote-request.model';

@Injectable({ providedIn: 'root' })
export class QuoteRequestsService {
  private firestore = inject(Firestore);
  private colRef = collection(this.firestore, 'quoteRequests');

  async create(req: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): Promise<void> {
    await addDoc(this.colRef, { ...req, status: 'nuevo', createdAt: new Date() });
  }

  getAll(): Observable<QuoteRequest[]> {
    const q = query(this.colRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<QuoteRequest[]>;
  }

  async updateStatus(id: string, status: QuoteRequest['status']): Promise<void> {
    await updateDoc(doc(this.firestore, 'quoteRequests', id), { status });
  }

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'quoteRequests', id));
  }
}
