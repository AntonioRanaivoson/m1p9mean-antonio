import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commandes, ICommandes } from '../entities/commandes/Commandes.model';
import { CommandesService } from '../entities/commandes/commandes.service';
import { IPlats } from '../entities/plats/plats.model';
import { PlatsService } from '../entities/plats/plats.service';

@Component({
  selector: 'app-e-kaly-restaurant-plat',
  templateUrl: './e-kaly-restaurant-plat.component.html',
  styleUrls: ['./e-kaly-restaurant-plat.component.css']
})
export class EKalyRestaurantPlatComponent implements OnInit {
  nom_resto_client="";
  noms="";
  email="";
  id_client="";
  platsRestos: Array<IPlats> = [];
  platsCommandes:Array<IPlats>=[];
  quantite=1;
  error:boolean=true;
  constructor(private activatedRoute:ActivatedRoute,private platsServ:PlatsService,private commandeServ:CommandesService) { }

  ngOnInit(): void {
    let item_client = JSON.parse(localStorage.getItem("token_client")); 

    if(item_client!=null)
    {
      let resto=this.activatedRoute.snapshot.params["nom"];
      this.nom_resto_client=resto;
      this.load_ekaly(resto);
      console.log("plats_R:"+this.platsRestos);
      console.log(resto);
      this.noms=item_client["nom"];
      this.email=item_client["email"];
      this.id_client=item_client["id_user"];
      console.log("Nom resto:"+this.id_client);
     
    }

  }


  private load_ekaly(id) {
    this.platsServ.get_plats_restos_ekaly(id)
      .then((result: Array<IPlats>) => {
        this.platsRestos = result["resto"];
        console.log(this.platsRestos);
      });
  }

   get_plat_id(id){
    this.platsServ.get_plat_id(id)
      .then((result: Array<IPlats>) => {
        this.platsCommandes = result;
        //console.log(this.platsCommandes);
      });
  }


   commander(id_plat:string){
    this.platsServ.get_plat_id(id_plat)
    .then((result: Array<IPlats>) => {
      this.platsCommandes = result;
      console.log(this.platsCommandes);
      let pourcentage=25;
      let benef_plat=(this.platsCommandes[0].prix_vente-this.platsCommandes[0].prix_revient)*this.quantite;
      let prix_total=this.quantite*this.platsCommandes[0].prix_vente;
      let benef_ekaly=((this.platsCommandes[0].prix_vente-this.platsCommandes[0].prix_revient)*this.quantite*pourcentage)/100;
      let benef_resto=((this.platsCommandes[0].prix_vente-this.platsCommandes[0].prix_revient)*this.quantite)-benef_ekaly;
      let date=new Date();
      let date_com=date.toLocaleString(); 
      const commandes = new Commandes(this.id_client,this.email,this.platsCommandes[0].id_resto,this.nom_resto_client.trim(),id_plat,this.platsCommandes[0].nom_plat,this.quantite,this.platsCommandes[0].prix_vente,this.platsCommandes[0].prix_revient,this.platsCommandes[0].image,date_com,pourcentage,"en_cours",prix_total,benef_plat,benef_resto,benef_ekaly);
      

      console.log(commandes);

    if (confirm("Voulez-vous commander "+this.quantite+" "+this.platsCommandes[0].nom_plat) == true) {
     this.commandeServ.create(commandes).then((result: ICommandes) => {
        if (result === undefined) {
          this.error = true;
        } else {
          this.error = false;
          
           // this.createdUser.emit(result);
            //this.refresh();
         
        }
      });
    }
    else{

    }
    });
  

  
  }

}
