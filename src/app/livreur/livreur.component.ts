import { PlatformLocation } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICommandes_livreur } from '../entities/commandes/commandes.model';
import { CommandesService } from '../entities/commandes/commandes.service';
import { UserService } from '../entities/user/user.service';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {
  noms="";
  id_user="";
  email="";
  commandes_encours:Array<ICommandes_livreur>;
  totalLength:number;
  page=1;
  @Input() productToDisplay: ICommandes_livreur = null;


  constructor(private route:Router,private user:UserService,private commandeServ:CommandesService) { }

  ngOnInit(): void {
   
    let item = JSON.parse(localStorage.getItem("token_livreur"));
    if(!item)
    {
      this.route.navigateByUrl("/Login");
    }
    else{
      if(item["profil"]!="livreur")
      {
        localStorage.removeItem("token_livreur");
        this.route.navigateByUrl("/Login");
        this.user.logout("token_livreur");
      }
      else{ 
      this.noms=item["nom"];
      this.email=item["email"];
      this.id_user=item["id_user"];

      console.log(item["token"]);}

      this.get_commande_en_cours(this.id_user);
    }
  }

  async get_commande_en_cours(id){
    this.commandeServ.get_commande_livreur(id)
      .then((result: Array<ICommandes_livreur>) => {
        this.commandes_encours = result;
        this.totalLength=result.length;
       
      });
  }

  livrer_commandes_livreur(id:string){
    this.commandeServ.valider_commandes_livreurs(id);
  }
  livrer_commandes(id:string){
    this.commandeServ.valider_commandes(id);
  }

  livrer(id_commande:string,id_commande_livr:string,plat:any,quantite:any,resto:any,prix,email_client:any){
    this.livrer_commandes_livreur(id_commande_livr);
    this.livrer_commandes(id_commande);
    this.sendmail(plat,quantite,resto,prix,email_client);
  //  window.location.reload();
  }

  sendmail(plat:any,quantite:any,resto:any,prix,email_client:any){
    let data={"plat":plat,"quantite":quantite,"resto":resto,"prix":prix};
    console.log(data);
    this.user.sendMail(email_client,data);
  }

  deconnexion()
  {
    this.user.logout("token_livreur");
  }


  ngOnChanges(): void {
    if (this.productToDisplay !== null) {
      this.commandes_encours.push(this.productToDisplay);
    }
  }

  
  
}
