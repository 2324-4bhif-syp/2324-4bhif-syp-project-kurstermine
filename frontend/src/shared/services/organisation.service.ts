import { Injectable } from '@angular/core';
import {ReplayBaseService} from "./replay-base-service";
import {Organisation} from "../models/organisation";
import {OrganisationApiService} from "./api/organisation-api.service";

@Injectable({
    providedIn: 'root'
})
export class OrganisationService extends ReplayBaseService<Organisation> {

    constructor(
        protected api: OrganisationApiService
    ) {
        super(api, api.getAll, (organisation) => super.add(...organisation));
    }

    override add(item: Organisation): void {
        this.api.add(item).subscribe({
            next: (organisation: Organisation) => {
                super.add(organisation);
            },
        });
    }
}
