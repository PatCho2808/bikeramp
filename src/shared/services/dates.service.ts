import { Injectable } from '@nestjs/common';

@Injectable()
export class DatesService {
  getMondayDateOfCurrentWeek() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  }

  getSundayDateOfCurrentWeek() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() + 7 - day + (day === 0 ? -7 : 0);
    return new Date(today.setDate(diff));
  }

  getDateOfFirstDayOfTheMonth() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 2);
  }

  getDateOfLastDayOfTheMonth() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  getFormattedDate(date: Date) {
    const month = date.toLocaleDateString('en-UD', { month: 'long' });
    const day = date.getDate();
    return `${month}, ${day}${this.getNth(day)}`;
  }

  private getNth(day: number) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
