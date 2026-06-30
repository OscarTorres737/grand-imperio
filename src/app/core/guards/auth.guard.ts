import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Waits for the first resolved auth state (currentUser starts as `undefined`)
// before deciding, so a hard refresh on an admin route doesn't bounce to login.
function waitForResolvedUser(auth: AuthService): Promise<void> {
  return new Promise(resolve => {
    const check = () => {
      if (auth.currentUser() !== undefined) { resolve(); return; }
      setTimeout(check, 30);
    };
    check();
  });
}

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await waitForResolvedUser(auth);

  if (auth.isStaff()) return true;
  router.navigate(['/admin/login']);
  return false;
};
