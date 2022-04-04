import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IResto } from '../entities/user/user.model';
import { UserService } from '../entities/user/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-e-kaly-admin-restaurant',
  templateUrl: './e-kaly-admin-restaurant.component.html',
  styleUrls: ['./e-kaly-admin-restaurant.component.css']
})
export class EKalyAdminRestaurantComponent implements OnInit {
  rest_message='';
  restos: Array<IResto> = [];
  isAdmin="";
  email="";
  @Input() productToDisplay: IResto = null;
  
  constructor(private users:UserService,private route:Router) { }


  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem("token_admin"));    
    if(!item)
    {
      this.route.navigateByUrl("/Login");
    }
    else{
      var  profil=item["profil"];
      this.email=item["email"];
      if(profil=="admin")
      {
          this.isAdmin="oui";
      }
      else{
        this.isAdmin="non";
      }
      console.log(this.isAdmin);
     
    if(profil=="client")
    {
      this.rest_message="Choisissez dans quel restaurant allez vous commander votre plat!";
    }
    if(profil=="admin"){
      this.rest_message="";
    }

    this.loadAll();
  }
  }


  private loadAll() {
    this.users
      .get_resto()
      .then((result: Array<IResto>) => {
        this.restos = result["resto"];
      });
  }

   delete_ekaly_resto(mail:string,nom:string){
    let text;
    if (confirm("Voulez-vous vraiment supprimer le restaurant "+nom+" d'ekaly?") == true) {
      this.users.delete_resto_ekaly(mail,"non").then((result: any) => this.loadAll());;
      text = "You pressed OK!";
    } else {
      text = "You canceled!";
    }
      
      
  }

  ngOnChanges(): void {
    if (this.productToDisplay !== null) {
      this.restos.push(this.productToDisplay);
    }
  }





   add_ekaly_resto(mail:string){
    this.users.delete_resto_ekaly(mail,"oui");
}

}
