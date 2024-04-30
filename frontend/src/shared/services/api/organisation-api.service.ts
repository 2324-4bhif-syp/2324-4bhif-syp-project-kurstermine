import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs";
import { set } from 'src/shared/models/model';
import { fromOrganisation, OrganisationDto } from "../../models/dtos/organisation-dto";
import { fromOrganisationDto, Organisation } from "../../models/organisation";
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class OrganisationApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, "organisations");
    }

    public getAll() {
        this.http
            .get<OrganisationDto[]>(this.url, {
                headers: this.headers
            })
            .pipe(
                map((dtos) => {
                    return dtos.map<Organisation>(fromOrganisationDto);
                })
            )
            .subscribe(organisations => {
                set(model => {
                    model.organisations = organisations;
                })
            });
    }

    public add(organisation: Organisation) {
        this.http
            .post<OrganisationDto>(`${this.url}`, fromOrganisation(organisation), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((organisationDto: OrganisationDto) => {
                    return fromOrganisationDto(organisationDto);
                }),
            )
            .subscribe(organisation => {
                set(model => {
                    model.organisations.push(organisation);
                })
            });
    }

    public search(pattern: String) {
        this.http
            .get<OrganisationDto[]>(`${this.url}/search?pattern=${pattern}`)
            .pipe(
                map((organisationDtos: OrganisationDto[]) => {
                    return organisationDtos.map(organisationDto => fromOrganisationDto(organisationDto));
                })
            )
            .subscribe(organisations => {
                set(model => {
                    model.organisations = organisations;
                })
            });
    }
}
