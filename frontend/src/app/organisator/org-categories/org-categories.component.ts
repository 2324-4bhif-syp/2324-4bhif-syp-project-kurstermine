import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { StoreService } from "@services";
import { distinctUntilChanged, map } from "rxjs";
import { RouterModule } from "@angular/router";
import { AdminUserApiService } from "@services/api/admin-user-api.service";
import { CategoryApiService } from "@services/api";
import { FormBuilder, FormsModule } from "@angular/forms";
import { Category } from "@models/category";

@Component({
  selector: "app-org-categories",
  standalone: true,
  imports: [AsyncPipe, RouterModule, FormsModule],
  templateUrl: "./org-categories.component.html",
  styleUrl: "./org-categories.component.css",
})
export class OrgCategoriesComponent {
  protected adminUserApi = inject(AdminUserApiService);
  protected categoryService = inject(CategoryApiService);
  protected store = inject(StoreService).store;

  protected viewModel = this.store.pipe(
    map((model) => ({
      categories: model.categories.filter((x) => x.organisationId === model.organisationOfCurrentUser?.id),
      organisationOfCurrentUser: model.organisationOfCurrentUser,
    })),
    distinctUntilChanged(),
  );

  public newCategoryName: string | undefined;

  public onCategoryAddSubmit() {
    let name = this.newCategoryName;
    let organisationId = this.store.value.organisationOfCurrentUser?.id;

    if (!name || !organisationId) return;

    let category: Category = {
      name: name,
      organisationId: organisationId,
    };

    this.categoryService.add(category, organisationId);
  }
}
