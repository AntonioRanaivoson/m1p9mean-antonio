import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InscriptionComponent } from './inscription/inscription.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { EKalyComponent } from './e-kaly/e-kaly.component';
import { RestaurantsPlatsComponent } from './restaurants-plats/restaurants-plats.component';
import { RestaurantsAjoutPlatComponent } from './restaurants-ajout-plat/restaurants-ajout-plat.component';
import { RestaurantsCommandesComponent } from './restaurants-commandes/restaurants-commandes.component';
import {HttpClientModule} from '@angular/common/http';
import { EKalyRestaurantComponent } from './e-kaly-restaurant/e-kaly-restaurant.component';
import { EKalyRestaurantPlatsComponent } from './e-kaly-restaurant-plats/e-kaly-restaurant-plats.component';
import { EKalyAdminComponent } from './e-kaly-admin/e-kaly-admin.component';
import { EKalyAdminAjoutRestaurantComponent } from './e-kaly-admin-ajout-restaurant/e-kaly-admin-ajout-restaurant.component';
import { EKalyAdminRestaurantComponent } from './e-kaly-admin-restaurant/e-kaly-admin-restaurant.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductlistdetailComponent } from './productlistdetail/productlistdetail.component';
import { EKalyRestaurantPlatComponent } from './e-kaly-restaurant-plat/e-kaly-restaurant-plat.component';
import { EKalyAdminRestaurantPlatComponent } from './e-kaly-admin-restaurant-plat/e-kaly-admin-restaurant-plat.component';
import { EKalyCommandesComponent } from './e-kaly-commandes/e-kaly-commandes.component';
import { EKalyAdminLivreurComponent } from './e-kaly-admin-livreur/e-kaly-admin-livreur.component';
import { EKalyAdminCommandesComponent } from './e-kaly-admin-commandes/e-kaly-admin-commandes.component';
import { LivreurComponent } from './livreur/livreur.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    LoginComponent,
    routingComponents,
    InscriptionComponent,
    RestaurantsComponent,
    EKalyComponent,
    RestaurantsPlatsComponent,
    RestaurantsAjoutPlatComponent,
    RestaurantsCommandesComponent,
    EKalyRestaurantComponent,
    EKalyRestaurantPlatsComponent,
    EKalyAdminComponent,
    EKalyAdminAjoutRestaurantComponent,
    EKalyAdminRestaurantComponent,
    ProductlistdetailComponent,
    EKalyRestaurantPlatComponent,
    EKalyAdminRestaurantPlatComponent,
    EKalyCommandesComponent,
    EKalyAdminLivreurComponent,
    EKalyAdminCommandesComponent,
    LivreurComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    NoopAnimationsModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
