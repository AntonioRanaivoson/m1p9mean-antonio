import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../entities/user/user.model';
import { UserService } from '../entities/user/user.service';

@Component({
  selector: 'app-e-kaly-admin',
  templateUrl: './e-kaly-admin.component.html',
  styleUrls: ['./e-kaly-admin.component.css']
})
export class EKalyAdminComponent implements OnInit {
  noms="";
  email="";

  constructor(private route:Router,private user:UserService) { }

  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem("token_admin"));
    if(!item)
    {
      this.route.navigateByUrl("/Login");
    }
    else{
      if(item["profil"]!="admin")
      {
        this.route.navigateByUrl("/Login");
        this.user.logout("token_admin");
      }
      else{ 
      this.noms=item["nom"];
      this.email=item["email"];
      console.log(item["token"]);}

    }
  }


  deconnexion()
  {
    this.user.logout("token_admin");
  }

}
