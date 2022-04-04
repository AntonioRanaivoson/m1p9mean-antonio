import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../entities/user/user.service';

@Component({
  selector: 'app-e-kaly',
  templateUrl: './e-kaly.component.html',
  styleUrls: ['./e-kaly.component.css']
})
export class EKalyComponent implements OnInit {
  noms="" as any;
  email="" as any;
  constructor(private route:Router,private user :UserService) { }

  ngOnInit(): void {
    
    let item = JSON.parse(localStorage.getItem("token_client"));
    if(!item)
    {
      this.route.navigateByUrl("/Login");
    }
    else{
      if(item["profil"]!="client")
      {
        localStorage.removeItem("token_admin");
        this.route.navigateByUrl("/Login");
        this.user.logout("token_client");
      }
      else{ 
      this.noms=item["nom"];
      this.email=item["email"];
      console.log(item["token"]);}
    }
  }

  deconnexion()
  {
    this.user.logout("token_client");
  }

  

}
