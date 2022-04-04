import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../entities/user/user.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  noms="";
  email="";

  constructor(private route:Router,private user:UserService) { }

  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem("token_resto"));
    if(!item)
    {
      this.route.navigateByUrl("/Login");
    }
    else{
      if(item["profil"]!="resto")
      {
        this.route.navigateByUrl("/Login");
        this.user.logout("token_resto");
      }
      else{ 
      this.noms=item["nom"];
      this.email=item["email"];
      console.log(item["token"]);}
  }
  }

  deconnexion(){
    this.user.logout("token_resto");
  }
}
