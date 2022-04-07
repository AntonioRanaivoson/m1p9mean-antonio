import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { RestaurantsPlatsComponent } from './restaurants-plats/restaurants-plats.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsAjoutPlatComponent } from './restaurants-ajout-plat/restaurants-ajout-plat.component';
import { RestaurantsCommandesComponent } from './restaurants-commandes/restaurants-commandes.component';
import { EKalyComponent } from './e-kaly/e-kaly.component';
import { EKalyRestaurantComponent } from './e-kaly-restaurant/e-kaly-restaurant.component';
import { EKalyAdminComponent } from './e-kaly-admin/e-kaly-admin.component';
import { EKalyAdminAjoutRestaurantComponent } from './e-kaly-admin-ajout-restaurant/e-kaly-admin-ajout-restaurant.component';
import { EKalyAdminRestaurantComponent } from './e-kaly-admin-restaurant/e-kaly-admin-restaurant.component';
import { ProductlistdetailComponent } from './productlistdetail/productlistdetail.component';
import { EKalyRestaurantPlatComponent } from './e-kaly-restaurant-plat/e-kaly-restaurant-plat.component';
import { EKalyAdminRestaurantPlatComponent } from './e-kaly-admin-restaurant-plat/e-kaly-admin-restaurant-plat.component';
import { EKalyCommandesComponent } from './e-kaly-commandes/e-kaly-commandes.component';
import { EKalyAdminLivreurComponent } from './e-kaly-admin-livreur/e-kaly-admin-livreur.component';
import { EKalyAdminCommandesComponent } from './e-kaly-admin-commandes/e-kaly-admin-commandes.component';


const routes: Routes = [
  { path:'',redirectTo:'/Login',pathMatch:'full'},
  {path:'Login',component:LoginComponent} , 
  {path:'Inscription',component:InscriptionComponent} , 
  {path:'list-products',component:ProductListComponent} ,
  {
    path:'restaurant',component:RestaurantsComponent ,
    children: [
      {path:'',component:RestaurantsPlatsComponent},
      {path:'plats',component:RestaurantsPlatsComponent},
      {path:'ajout-plat',component:RestaurantsAjoutPlatComponent},
      {path:'commandes',component:RestaurantsCommandesComponent},
    
    ]

  } , 

  {
    path:'e-kaly',component:EKalyComponent ,
    children: [
      {path:'',component:EKalyRestaurantComponent},
      {path:'restaurant/:nom',component:EKalyRestaurantPlatComponent},
      {path:'commandes',component:EKalyCommandesComponent},
    ]

  } , 


  {
    path:'e-kaly-admin',component:EKalyAdminComponent ,
    children: [
      {path:'',component:EKalyAdminRestaurantComponent},
      {path:'ajout-restaurant',component:EKalyAdminAjoutRestaurantComponent},
      {path:'restaurant/:nom',component:EKalyAdminRestaurantPlatComponent},
      {path:'livreur',component:EKalyAdminLivreurComponent},
      {path:'commandes',component:EKalyAdminCommandesComponent},

    ]

  } , 


  {
    path:'list',component:ProductListComponent ,
   

  } , 
  {
    path:'list/:nom',component:ProductlistdetailComponent ,
  } , 


   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,ProductListComponent,InscriptionComponent]
