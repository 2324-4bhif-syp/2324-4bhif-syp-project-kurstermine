import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ApiService } from "@services/api/api.service";
import { CategoryDto, fromCategory as fromModel } from "@models/dtos/category-dto";
import { Category, fromCategoryDto as fromDto } from "@models/category";
import { set } from "@models/model";

@Injectable({
  providedIn: "root",
})
export class CategoryApiService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "categories");
  }

  public getAll() {
    this.http
      .get<CategoryDto[]>(this.url, {
        headers: this.headers,
      })
      .pipe(map((dtos) => dtos.map(fromDto)))
      .subscribe((categories) => {
        set((model) => {
          if (model.categories.length === 0) {
            model.categories = categories;
          }
        });
      });
  }

  public add(category: Category, organisationId: number) {
    this.http
      .post<CategoryDto>(`${this.url}/${organisationId}`, fromModel(category), {
        headers: this.headers.set("Content-Type", "application/json"),
      })
      .pipe(map(fromDto))
      .subscribe((category) => {
        set((model) => {
          model.categories.push(category);
        });
      });
  }

  // todo: delete
}
