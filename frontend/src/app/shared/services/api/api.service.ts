import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { map, Observable } from 'rxjs';

export abstract class ApiService<T, TDto> {
    protected url: string;
    protected headers: HttpHeaders;

    protected constructor(
        protected http: HttpClient,
        type: string,
        private fromDto: (type: TDto) => T,
    ) {
        this.url = `${environment.apiUrl}/${type}`;
        this.headers = new HttpHeaders().set('Accept', 'application/json');
    }

    public getAll(): Observable<T[]> {
        return this.http
            .get<TDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((instructors) => {
                    return instructors.map<T>(this.fromDto);
                }),
            );
    }
}
