import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { DataService } from './shared/services/data.service';
import { ConfigService } from './shared/utils/config.service';
import { ItemsService } from './shared/utils/items.service';
import { NotificationService } from './shared/utils/notification.service';
import { FormsModule } from '@angular/forms';

import { PaginationModule, PaginationComponent, PaginationConfig } from 'ng2-bootstrap';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';



@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2BootstrapModule,
        PaginationModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        ConfigService,
        DataService,
        ItemsService,
        NotificationService,
        PaginationConfig
    ]
})
export class AppModule {
}
