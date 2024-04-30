import { Injectable } from '@angular/core';
import { store } from '@models';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    get store() {
        return store;
    }
}
