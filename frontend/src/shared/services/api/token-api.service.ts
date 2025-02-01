import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ApiService } from "@services/api/api.service";
import { TokenDto, fromToken as fromModel } from "@models/dtos/token-dto";
import { Token, fromTokenDto as fromDto } from "@models/token";
import { set } from "@models/model";

@Injectable({
    providedIn: "root",
})
export class TokenApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, "tokens");
    }

    public getAllForOrganisation() {
        this.http
            .get<TokenDto[]>(`${this.url}`, {
                headers: this.headers,
            })
            .pipe(map((dtos) => dtos.map(fromDto)))
            .subscribe((tokens) => {
                set((model) => {
                    model.tokensForCurrentOrganisation = tokens;
                });
            });
    }

    public getAllForUser(userId: string) {
        this.http
            .get<TokenDto[]>(`${this.url}/${userId}`, {
                headers: this.headers,
            })
            .pipe(map((dtos) => dtos.map(fromDto)))
            .subscribe((tokens) => {
                set((model) => {
                    model.tokensForCurrentUser = tokens;
                });
            });
    }

    public add(token: Token, amount: number) {
        this.http
            .post<TokenDto[]>(`${this.url}/${amount}`, fromModel(token), {
                headers: this.headers.set("Content-Type", "application/json"),
            })
            .pipe(map((dtos) => dtos.map(fromDto)))
            .subscribe((tokens) => {
                set((model) => {
                    model.tokensForCurrentUser.push(...tokens);
                });
            });
    }

    public update(token: Token) {
        this.http
            .put<TokenDto>(`${this.url}/${token.id}`, fromModel(token), {
                headers: this.headers.set("Content-Type", "application/json"),
            })
            .pipe(map(fromDto))
            .subscribe((token) => {
                set((model) => {
                    const index: number = model.tokensForCurrentUser.findIndex(
                        (t) => t.id === token.id,
                    );
                    if (index > -1) {
                        model.tokensForCurrentUser.splice(index, 1, token);
                    }
                });
            });
    }

    // todo: delete
}
