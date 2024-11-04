import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

export abstract class ApiService {
    protected url: string;
    protected headers: HttpHeaders;

    protected constructor(
        protected http: HttpClient,
        type: string,
    ) {
        this.url = `${environment.apiUrl}/${type}`;
        this.headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
    }
}
