import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private firestore = inject(Firestore);

  async create(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<void> {
    const col = collection(this.firestore, 'appointments');
    await addDoc(col, { ...appointment, createdAt: new Date() });
  }

  getAll(): Observable<Appointment[]> {
    const col = collection(this.firestore, 'appointments');
    return collectionData(col, { idField: 'id' }) as Observable<Appointment[]>;
  }
}
