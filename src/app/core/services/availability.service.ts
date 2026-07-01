import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  getSlotsForDate(date: Date): string[] {
    const day = date.getDay();
    const slots: string[] = [];

    let startHour = 9, startMin = 0;
    let endHour = 19, endMin = 30;

    if (day === 0) {
      startHour = 12; startMin = 0;
      endHour = 18; endMin = 0;
    }

    let h = startHour, m = startMin;
    while (h < endHour || (h === endHour && m < endMin)) {
      const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      slots.push(label);
      m += 30;
      if (m >= 60) { m = 0; h++; }
    }

    return slots;
  }

  isDateAvailable(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }
}
