import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AdminInstructorsComponent } from './admin/admin-instructors/admin-instructors.component';
import { initializeKeycloak } from './other/init/keycloak-init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AppRoutingModule } from './app-routing.module';
import { UserPacketComponent } from './user/user-packet/user-packet.component';
import { UserOfferComponent } from './user/user-offer/user-offer.component';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        KeycloakAngularModule,
        BrowserAnimationsModule,
        MatButtonModule,
        AppRoutingModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatCardModule,
        MatButtonModule,
        MatTreeModule,
        CdkAccordionModule,
        MatDividerModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        UserPacketComponent,
        AdminInstructorsComponent,
        UserOfferComponent
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

