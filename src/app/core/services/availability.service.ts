import { Injectable, signal } from '@angular/core';

function daysFromToday(n: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  private reservedDates = signal<Set<string>>(new Set([
    daysFromToday(3),
    daysFromToday(4),
    daysFromToday(9),
    daysFromToday(15),
    daysFromToday(16),
    daysFromToday(22),
    daysFromToday(30),
    daysFromToday(38),
  ]));

  private toKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getSlotsForDate(date: Date): string[] {
    if (this.isDateReserved(date)) return [];

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
    return date >= today && !this.isDateReserved(date);
  }

  isDateReserved(date: Date): boolean {
    return this.reservedDates().has(this.toKey(date));
  }

  reserveDate(date: Date | string): void {
    const key = typeof date === 'string' ? date : this.toKey(date);
    this.reservedDates.update(set => new Set(set).add(key));
  }
}
