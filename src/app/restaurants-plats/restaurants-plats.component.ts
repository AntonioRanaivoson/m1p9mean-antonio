import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Modal} from 'bootstrap';
import {Observable, Subscriber } from 'rxjs';
import { PlatsService } from '../entities/plats/plats.service';
import {Plats,IPlats} from '../entities/plats/plats.model';


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
  @Input() platsRestosDisplay: IPlats = null;
  nom_resto_client="";

  col="";

  totalLength:any;
  page:number=1;  
  
  constructor(private platsServ:PlatsService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let item_admin = JSON.parse(localStorage.getItem("token_admin"));
    let item_resto= JSON.parse(localStorage.getItem("token_resto")); 
    let item_client = JSON.parse(localStorage.getItem("token_client"));  
    
    if(!item_resto){
      this.isResto="non";
      if(item_client!=null)
      {
        this.isClient="oui";
        console.log(this.isClient);
        let resto=this.activatedRoute.snapshot.params["nom"];
        this.nom_resto_client=resto;
        this.load_ekaly(resto);
        console.log("plats_R:"+this.platsRestos);
        console.log(resto);
        //console.log("Nom resto:"+id);
       
      }
      if(item_admin!=null)
      {
        this.isAdmin="oui";
        let resto=this.activatedRoute.snapshot.params["nom"];
        this.load_ekaly(resto);
        console.log("plats_R:"+this.platsRestos);
        console.log(resto);
        //console.log("Nom resto:"+id);
       
      }
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
    const plats = new Plats(this.id_resto,this.nom_resto,this.nom_plat,this.prix_vente,this.prix_revient,this.myimage,this.visibilite,"non");
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
