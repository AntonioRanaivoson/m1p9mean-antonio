import { Component, OnInit } from '@angular/core';
import { Commandes_livreur, ICommandes, ICommandes_livreur } from '../entities/commandes/commandes.model';
import { CommandesService } from '../entities/commandes/commandes.service';
import { ILivreur, IUser } from '../entities/user/user.model';
import { UserService } from '../entities/user/user.service';

@Component({
  selector: 'app-e-kaly-admin-commandes',
  templateUrl: './e-kaly-admin-commandes.component.html',
  styleUrls: ['./e-kaly-admin-commandes.component.css']
})
export class EKalyAdminCommandesComponent implements OnInit {

  
  commandes_encours:Array<ICommandes>;
  id_livreur=[] as any;
  livreur:Array<ILivreur>;
  email_client="" as any;
  message="";
  constructor(private commandeServ:CommandesService,private userServ:UserService) { }

  ngOnInit(): void {
    this.get_a_livrer();
    this.get_livreur();
  }




   get_a_livrer() {
    this.commandeServ.get_Commandes_encours()
      .then((result: Array<ICommandes>) => {
        this.commandes_encours = result;
        console.log(this.commandes_encours);
      });
  }

   get_livreur() {
    this.userServ.get_livreur()
      .then((result: Array<ILivreur>) => {
        this.livreur = result;
        console.log(result);
      });
  }


  livrer(id_commande:string,mail_client:string,id_resto:string,nom_resto:string,id_plat:string,nom_plat,quantite:number,image:string,date:string,prix:number){
    //console.log(this.id_livreur["nom"]+""+this.id_livreur["email"]);
    let id_livreur=this.id_livreur["_id"];
   //
    let nom_livreur=this.id_livreur["nom"];
    let email_livreur=this.id_livreur["email"];
    if(id_livreur==undefined)
    {
      //console.log("IDLIVRERA=AAA");
      this.message="Veuillez choisir un livreur";
    }
    else{
   
    const commandes = new Commandes_livreur(id_commande,id_livreur,nom_livreur,email_livreur,mail_client,id_resto,nom_resto,id_plat,nom_plat,quantite,image,date,"",prix,"livre");  
    console.log(commandes);
    if (confirm("Livrer ce commande par le livreur "+nom_livreur+"-"+email_livreur+" ?") == true) {
     this.commandeServ.create_commande_livreur(commandes).then((result: ICommandes_livreur) => {
        if (result === undefined) {
         
        } else {
         
        }
      });
    }
    else{

    }  
    
  
  }
}
}

