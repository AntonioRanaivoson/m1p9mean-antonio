import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
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
  platsRestos: Array<IPlats> = [];
  @Input() platsRestosDisplay: IPlats = null;

  totalLength:any;
  page:number=1;  
  
  constructor(private route:Router,private platsServ:PlatsService) { }

  ngOnInit(): void {
    let item_admin = JSON.parse(localStorage.getItem("token_admin"));
    let item_resto= JSON.parse(localStorage.getItem("token_resto")); 
    let item_client = JSON.parse(localStorage.getItem("token_client"));   
    
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
    const plats = new Plats(this.id_resto,this.nom_resto,this.nom_plat,this.prix_vente,this.prix_revient,this.myimage,this.visibilite,"non");
   this.platsServ.create(plats).then((result: IPlats) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.loadAll(this.id_resto);
        
         // this.createdUser.emit(result);
          //this.refresh();
       
      }
    });
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
        this.platsRestos = result;
        console.log(this.platsRestos);
      });
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
