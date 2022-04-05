import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscriber,Observable} from 'rxjs';
import { IPlats, Plats } from '../entities/plats/plats.model';
import { PlatsService } from '../entities/plats/plats.service';
@Component({
  selector: 'app-restaurants-ajout-plat',
  templateUrl: './restaurants-ajout-plat.component.html',
  styleUrls: ['./restaurants-ajout-plat.component.css']
})
export class RestaurantsAjoutPlatComponent implements OnInit {
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
  myimage: any;
  constructor(private platsServ:PlatsService) { }

  ngOnInit(): void {
    let item = JSON.parse(localStorage.getItem("token_resto"));
    if(item!=null){
      this.id_resto=item["id_user"];
      this.nom_resto=item["nom"];
    }
    
  }


  insert_plat(){
    const plats = new Plats(this.id_resto,this.nom_resto,this.nom_plat,this.prix_vente,this.prix_revient,this.myimage,this.visibilite,"non");
    this.platsServ.create(plats).then((result: IPlats) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        
         // this.createdUser.emit(result);
          //this.refresh();
       
      }
    });

    console.log(plats);
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
