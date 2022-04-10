import { Component, OnInit } from '@angular/core';
import { ICommandes } from '../entities/commandes/commandes.model';
import { CommandesService } from '../entities/commandes/commandes.service';

@Component({
  selector: 'app-benefice-restaurant',
  templateUrl: './benefice-restaurant.component.html',
  styleUrls: ['./benefice-restaurant.component.css']
})
export class BeneficeRestaurantComponent implements OnInit {

  id_user="";
  commandes: Array<ICommandes> = [];
  totalLength:any;
  page:number=1;  
  constructor(private commandeServ:CommandesService) { }

  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem("token_resto"));
    this.id_user=item["id_user"];
   
    this.get_Benefice(this.id_user);
  }

  get_Benefice(id){
    this.commandeServ.get_Benefices_resto(id)
      .then((result: Array<ICommandes>) => {
        this.commandes = result;
        this.totalLength=result.length;
       
      });
  }

}
