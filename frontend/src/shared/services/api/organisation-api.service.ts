import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {map, Observable} from "rxjs";
import {fromOrganisationDto, Organisation} from "../../models/organisation";
import {fromOrganisation, OrganisationDto} from "../../models/dtos/organisation-dto";

@Injectable({
    providedIn: 'root'
})
export class OrganisationApiService extends ApiService<Organisation, OrganisationDto> {
    constructor(http: HttpClient) {
        super(http, "organisations", fromOrganisationDto);
    }

    public add(organisation: Organisation): Observable<Organisation> {
        return this.http
            .post<OrganisationDto>(`${this.url}`, fromOrganisation(organisation), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((organisationDto: OrganisationDto) => {
                    return fromOrganisationDto(organisationDto);
                }),
            );
    }
}
