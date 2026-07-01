import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private firestore = inject(Firestore);
  private colRef = collection(this.firestore, 'users');

  getAll(): Observable<AppUser[]> {
    return collectionData(this.colRef, { idField: 'uid' }) as Observable<AppUser[]>;
  }

  async upsertRole(uid: string, email: string, displayName: string, role: AppUser['role']): Promise<void> {
    await setDoc(doc(this.firestore, 'users', uid), { email, displayName, role, createdAt: new Date() });
  }

  async updateRole(uid: string, role: AppUser['role']): Promise<void> {
    await updateDoc(doc(this.firestore, 'users', uid), { role });
  }

  async remove(uid: string): Promise<void> {
    await deleteDoc(doc(this.firestore, 'users', uid));
  }
}
