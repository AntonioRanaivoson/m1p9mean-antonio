import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  visibilite=''
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    this.selectedFile=event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(){
    const fd=new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name)
  }

}
