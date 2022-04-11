import { Component, OnInit } from '@angular/core';
import { ICommandes } from '../entities/commandes/commandes.model';
import { CommandesService } from '../entities/commandes/commandes.service';

@Component({
  selector: 'app-e-kaly-benefice',
  templateUrl: './e-kaly-benefice.component.html',
  styleUrls: ['./e-kaly-benefice.component.css']
})
export class EKalyBeneficeComponent implements OnInit {

  commandes: Array<ICommandes> = [];
  totalLength:any;
  page:number=1;  
  benef:any;
  constructor(private commandeServ:CommandesService) { }

  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem("token_admin"));
   // this.id_user=item["id_user"];
   
    this.get_Benefice();
   
       // this.benef=this.somme(this.commandes);
        //console.log("Somme==="+this.benef);
    
  }

  get_Benefice(){
    let sommes=0;
    this.commandeServ.get_Benefices_admin()
      .then((result: Array<ICommandes>) => {
        this.commandes = result;
        this.totalLength=result.length;
        if(this.totalLength>0){
        for(let i=0;i<result.length;i++)
        {
            sommes=sommes+result[i].benefice_ekaly;
        }
      this.benef=sommes;
        }
    
      });
  }

 
}
