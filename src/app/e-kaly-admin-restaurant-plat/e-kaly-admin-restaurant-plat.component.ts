import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlats } from '../entities/plats/plats.model';
import { PlatsService } from '../entities/plats/plats.service';

@Component({
  selector: 'app-e-kaly-admin-restaurant-plat',
  templateUrl: './e-kaly-admin-restaurant-plat.component.html',
  styleUrls: ['./e-kaly-admin-restaurant-plat.component.css']
})
export class EKalyAdminRestaurantPlatComponent implements OnInit {
  nom_resto_client="";
  platsRestos: Array<IPlats> = [];
  constructor(private activatedRoute:ActivatedRoute,private platsServ:PlatsService) { }

  ngOnInit(): void {
    let item_admin = JSON.parse(localStorage.getItem("token_admin")); 

    if(item_admin!=null)
    {
      let resto=this.activatedRoute.snapshot.params["nom"];
      this.nom_resto_client=resto;
      this.load_ekaly(resto);
      console.log("plats_R:"+this.platsRestos);
      console.log(resto);
      //console.log("Nom resto:"+id);
     
    }

  }


  private load_ekaly(id) {
    this.platsServ.get_plats_restos_ekaly(id)
      .then((result: Array<IPlats>) => {
        this.platsRestos = result["resto"];
        console.log(this.platsRestos);
      });
  }

}
