import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Modal} from 'bootstrap';
import {Observable, Subscriber } from 'rxjs';
import { PlatsService } from '../entities/plats/plats.service';
import {Plats,IPlats, PlatsU, IPlatsU} from '../entities/plats/plats.model';


@Component({
  selector: 'app-restaurants-plats',
  templateUrl: './restaurants-plats.component.html',
  styleUrls: ['./restaurants-plats.component.css']
})
export class RestaurantsPlatsComponent implements OnInit {
  selectedFile:File=null;
  id_resto='';
  nom_resto='';
  nom_plat='';
  prix_vente=0;
  prix_revient=0;
  image='';
  visibilite='';
  deleted='';
  error: boolean = false;
  myimage : any
  isResto="";
  isClient="non";
  isAdmin="";
  platsRestos: Array<IPlats> = [];
  message="";
  to_up="non";
  platUp:Array<IPlats>=[];
  @Input() platsRestosDisplay: IPlats = null;
  nom_resto_client="";

  col="";

  totalLength:any;
  page:number=1;  



  ///UP form


  id_plat_u='';
  nom_plat_u='';
  prix_vente_u=0;
  prix_revient_u=0;
  image_u='';
  myimage_u : any;
  visibilite_u='';
  deleted_u='';
  message_u="";
  col_u="";
  
  constructor(private platsServ:PlatsService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   
    let item_resto= JSON.parse(localStorage.getItem("token_resto")); 
   
    
    if(!item_resto){
      this.isResto="non";

    }
    else{
      this.isResto="oui";
      this.id_resto=item_resto["id_user"];
      this.nom_resto=item_resto["nom"];
      this.loadAll(this.id_resto);
    }



    
  }



  ngOnChanges(): void {
    if (this.platsRestosDisplay !== null) {
      this.platsRestos.push(this.platsRestosDisplay);
    }
  }

  insert_plat(){
    const plats = new Plats(this.id_resto,this.nom_resto.trim(),this.nom_plat,this.prix_vente,this.prix_revient,this.myimage,this.visibilite,"non");
    if(plats.nom_plat!=null&&plats.nom_plat!=""&&plats.prix_vente!=null&&plats.prix_revient!=null&&plats.image!=null&&plats.visibilite!=null&&plats.visibilite!=""){
   this.platsServ.create(plats).then((result: IPlats) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.loadAll(this.id_resto);
        this.col="green";
        this.message="Insertion plat reussi";
       
         // this.createdUser.emit(result);
          //this.refresh();
       
      }
    });
   }
   else
   {
    this.col="red";
     this.message="Erreur : Remplir tous les champs!";
    
     console.log("AAA");
   }
    console.log(plats);
  }


  get_plat_to_update(id:string){
    this.to_up="oui";
    this.platsServ.get_plat_id(id).then((result: Array<IPlats>) => {
      this.platUp = result;
      this.nom_plat_u=this.platUp[0].nom_plat;
      this.prix_vente_u=this.platUp[0].prix_vente;
      this.prix_revient_u=this.platUp[0].prix_revient;
      this.myimage_u=this.platUp[0].image;;
      this.visibilite_u=this.platUp[0].visibilite;;
      this.deleted_u=this.platUp[0].deleted;
      this.id_plat_u=id;
      
    });

  }


  update_plat(id_plat:string){
    const plats = new PlatsU(this.id_resto,this.nom_resto.trim(),this.nom_plat_u,this.prix_vente_u,this.prix_revient_u,this.myimage_u,this.visibilite_u,"non");
   if(plats.nom_plat!=null&&plats.nom_plat!=""&&plats.prix_vente!=null&&plats.prix_revient!=null&&plats.image!=null&&plats.visibilite!=null&&plats.visibilite!=""){
  
     this.platsServ.update(id_plat,plats).then((result: IPlatsU) => {
    
        this.error = false;
       
    
    });
    this.col_u="green";
    this.message_u="Modification plat reussi";
    console.log("message="+this.message_u);
    this.loadAll(this.id_resto);

   }
   else
   {
    this.col_u="red";
     this.message_u="Erreur : Remplir tous les champs!";
    
     console.log("AAA");
   }
   
    console.log(plats);

  }


















 



  private loadAll(id) {
    this.platsServ.get_plats_restos(id)
      .then((result: Array<IPlats>) => {
        this.platsRestos = result["resto"];
        this.totalLength=result["resto"].length;
        console.log(this.platsRestos);
      });
  }

  private load_ekaly(id) {
    this.platsServ.get_plats_restos_ekaly(id)
      .then((result: Array<IPlats>) => {
        this.platsRestos = result["resto"];
        console.log(this.platsRestos);
      });
  }



 delete_plats(id:string,ids:string,nom:string){
  let text;
  if (confirm("Voulez-vous vraiment supprimer le plat "+nom+"") == true) {
    this.platsServ.delete(id).then((result: any) => this.loadAll(ids));
    text = "You pressed OK!";
  } else {
    text = "You canceled!";
  }
    

}

annuler()
{
  this.to_up="non";
}

onChange_u($event: Event) {
  var target = $event.target as HTMLInputElement
  const file = target.files![0]
  const onSuccess = (response: any) => {
    console.log('RESPONSE ==> ' + response)
    this.myimage_u = response
  }
  const onError = (response: any) => {
    console.log("err")
  }
  this.convertToBase64(file).subscribe(onSuccess, onError)
}



  onChange($event: Event) {
    var target = $event.target as HTMLInputElement
    const file = target.files![0]
    const onSuccess = (response: any) => {
      console.log('RESPONSE ==> ' + response)
      this.myimage = response
    }
    const onError = (response: any) => {
      console.log("err")
    }
    this.convertToBase64(file).subscribe(onSuccess, onError)
  }

  convertToBase64(file: File) {
    var observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d: any) => {
      return d
    }
    )
    return observable
    //this.myImage = new Observable((subscriber: Subscriber<any>) => {
    //  this.readFile(file, subscriber)
    //})
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      subscriber.next(fileReader.result)
      subscriber.complete()
    };
    fileReader.onerror = (error) => {
      subscriber.error(error)
      subscriber.complete()
    }
  }

}
