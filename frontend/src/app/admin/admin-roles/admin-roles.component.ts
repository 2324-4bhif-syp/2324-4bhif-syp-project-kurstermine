import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AdminUserApiService} from "@services/api/admin-user-api.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-roles',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './admin-roles.component.html'
})
export class AdminRolesComponent implements OnInit {
  protected adminUserApi = inject(AdminUserApiService);
  @ViewChild("RoleAdder") protected roleAdder!: ElementRef<HTMLDialogElement>;

  protected viewModel = inject(StoreService).store.pipe(
    map((model) => model.adminUsers),
    distinctUntilChanged(),
  );

  protected userRole: string = "";
  protected userId?: string = "";
  readonly roles = ["admin", "organisator", "instructor", "customer"];

  openRoleAdder(id: string) {
    console.log(this.roleAdder);
    this.roleAdder.nativeElement.showModal();
    this.userId = id;
  }

  ngOnInit() {
    this.adminUserApi.getAll();
  }

  close() {
    this.roleAdder.nativeElement.close();
  }

  addRole() {
    console.log(this.userRole);
    this.adminUserApi.addRole(this.userId!, this.userRole);
    this.close();
  }
}
