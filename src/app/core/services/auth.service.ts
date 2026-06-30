import { Injectable, inject, signal, Injector, runInInjectionContext } from '@angular/core';
import {
  Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User
} from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AppUser, AppRole } from '../models/app-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  // null = signed out (or no role doc), undefined = initial auth state not resolved yet
  currentUser = signal<AppUser | null | undefined>(undefined);
  // Surfaces *why* a signed-in user ended up signed out (denied rules, missing role doc, etc.)
  authError = signal<string | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => this.resolveRole(user));
  }

  /** Signs in, then resolves (and returns) the matching role document directly —
   *  callers don't need to poll `currentUser` waiting for onAuthStateChanged to fire. */
  async login(email: string, password: string): Promise<AppUser | null> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    return this.resolveRole(cred.user);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  isStaff(): boolean {
    const u = this.currentUser();
    return !!u && (u.role === 'admin' || u.role === 'editor');
  }

  hasRole(role: AppRole): boolean {
    return this.currentUser()?.role === role;
  }

  private async resolveRole(user: User | null): Promise<AppUser | null> {
    this.authError.set(null);

    if (!user) {
      this.currentUser.set(null);
      return null;
    }

    try {
      // Firestore calls must run inside Angular's injection context to avoid
      // the "outside injection context" warning and zone-stability issues.
      const snap = await runInInjectionContext(this.injector, () =>
        getDoc(doc(this.firestore, 'users', user.uid))
      );

      if (!snap.exists()) {
        this.authError.set(
          `No existe el documento users/${user.uid} en Firestore. Crea ese documento ` +
          `con ese ID exacto y un campo role: "admin".`
        );
        this.currentUser.set(null);
        return null;
      }

      const data = snap.data() as Omit<AppUser, 'uid'>;
      const appUser: AppUser = { uid: user.uid, ...data };
      this.currentUser.set(appUser);
      return appUser;
    } catch (err) {
      // Most common cause: firestore.rules not published yet, or the users/{uid}
      // document ID doesn't match the Auth UID, so the rules' get() call fails.
      console.error('AuthService: failed to read role document', err);
      this.authError.set(
        'No se pudo verificar tu rol en Firestore (permisos denegados). ' +
        'Revisa que firestore.rules esté publicado y que exista users/' + user.uid + ' con role: "admin".'
      );
      this.currentUser.set(null);
      return null;
    }
  }
}
