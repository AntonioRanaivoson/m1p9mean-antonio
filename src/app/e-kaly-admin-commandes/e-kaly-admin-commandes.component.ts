import { Component, OnInit } from '@angular/core';
import { ICommandes } from '../entities/commandes/Commandes.model';
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
  livreurs:any;
  livreur:Array<ILivreur>;
  constructor(private commandeServ:CommandesService,private userServ:UserService) { }

  ngOnInit(): void {
    this.get_a_livrer();
    this.get_livreur();
  }




  private get_a_livrer() {
    this.commandeServ.get_Commandes_encours()
      .then((result: Array<ICommandes>) => {
        this.commandes_encours = result;
        console.log(this.commandes_encours);
      });
  }

  private get_livreur() {
    this.userServ.get_livreur()
      .then((result: Array<ILivreur>) => {
        this.livreur = result;
        console.log(result);
      });
  }

  livrer(){
    console.log(this.livreurs);
  }


}
