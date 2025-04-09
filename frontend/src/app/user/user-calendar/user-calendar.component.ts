import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "@models";

@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.css'
})
export class UserCalendarComponent implements OnInit {
  protected weekdays: Date[] = [];
  protected currentDate: Date = new Date();
  protected date: Date = new Date();
  protected selectedDate?: Date;

  @Input()
  public appointments?: Appointment[];

  protected getWeeksInMonth(month: number, year: number): Date[][] {
    let date = new Date(year, month, 1);
    let weeks: Date[][] = [];
    let days: Date[] = [];

    for (let i = date.getDay(); i > 0; i--) {
      let day = new Date(date);
      day.setDate(day.getDate() - i);
      days.push(day);
    }

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    // Split days into weeks
    for (let i: number = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }

  public ngOnInit(): void {
    this.weekdays = Array.from({ length: 7 }, (_, i) =>
      new Date(2021, 0, i + 3)
    );
  }

  protected getAppointmentsOfDay(date: Date): Appointment[] {
    return this.appointments?.filter(a => this.compareDates(a.date, date)) ?? [];
  }

  protected onBtnPrevious(): void {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  protected onBtnToday(): void {
    this.date = new Date();
  }

  protected onBtnNext(): void {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  protected compareDates(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  protected showAppointmentDetails(date: Date): void {
    this.selectedDate = date;
  }

  protected readonly String = String;
}
