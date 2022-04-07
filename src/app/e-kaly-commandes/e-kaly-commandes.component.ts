import { Component, OnInit } from '@angular/core';
import { ICommandes } from '../entities/commandes/Commandes.model';
import { CommandesService } from '../entities/commandes/commandes.service';

@Component({
  selector: 'app-e-kaly-commandes',
  templateUrl: './e-kaly-commandes.component.html',
  styleUrls: ['./e-kaly-commandes.component.css']
})
export class EKalyCommandesComponent implements OnInit {
  id_user="";
  commandes: Array<ICommandes> = [];
  totalLength:any;
  page:number=1;  
  constructor(private commandeServ:CommandesService) { }

  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem("token_client"));
    this.id_user=item["id_user"];
   
    this.get_commande_en_cours(this.id_user);
  }

  get_commande_en_cours(id){
    this.commandeServ.get_Commandes_user_encours(id)
      .then((result: Array<ICommandes>) => {
        this.commandes = result;
        this.totalLength=result.length;
       
      });
  }


}
