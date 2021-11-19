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
}
