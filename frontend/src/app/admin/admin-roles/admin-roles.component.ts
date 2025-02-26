import {Component, inject, OnInit} from '@angular/core';
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AdminUserApiService} from "@services/api/admin-user-api.service";

@Component({
  selector: 'app-admin-roles',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './admin-roles.component.html'
})
export class AdminRolesComponent implements OnInit {
  protected adminUserApi = inject(AdminUserApiService);

  protected viewModel = inject(StoreService).store.pipe(
    map((model) => model.adminUsers),
    distinctUntilChanged(),
  );

  ngOnInit() {
    this.adminUserApi.getAll();
  }
}
