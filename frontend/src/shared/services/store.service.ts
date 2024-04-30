import { Injectable } from '@angular/core';
import { store } from '../models/model';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    get store() {
        return store;
    }
}
