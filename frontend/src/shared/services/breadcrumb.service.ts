import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

  constructor() { }

  getBreadcrumbs() {
    return this.breadcrumbs.asObservable();
  }

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbs.next(breadcrumbs);
  }
}
