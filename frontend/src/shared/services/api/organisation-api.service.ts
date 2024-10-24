import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { fromOrganisationDto as fromDto, Organisation, set } from "@models";
import { ApiService } from "@services/api/api.service";
import { OrganisationDto, fromOrganisation as fromModel } from "@models/dtos";

@Injectable({
  providedIn: "root",
})
export class OrganisationApiService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "organisations");
  }

  public getAll() {
    this.http
      .get<OrganisationDto[]>(this.url, {
        headers: this.headers,
      })
      .pipe(map((dtos) => dtos.map(fromDto)))
      .subscribe((organisations) => {
        set((model) => {
          if (model.organisations.length === 0) {
            model.organisations = organisations;
          }
        });
      });
  }

  public add(organisation: Organisation) {
    this.http
      .post<OrganisationDto>(`${this.url}`, fromModel(organisation), {
        headers: this.headers.set("Content-Type", "application/json"),
      })
      .pipe(map(fromDto))
      .subscribe((organisation) => {
        set((model) => {
          model.organisations.push(organisation);
        });
      });
  }

  public search(pattern: String) {
    this.http
      .get<OrganisationDto[]>(`${this.url}/search?pattern=${pattern}`)
      .pipe(map((organisationDtos) => organisationDtos.map(fromDto)))
      .subscribe((organisations) => {
        set((model) => {
          model.organisations = organisations;
        });
      });
  }
}
