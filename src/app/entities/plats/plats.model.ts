import { Observable } from "rxjs";

export interface IPlats {
    _id?: string;
    id_resto: string;
    nom_resto: string;
    nom_plat: string;
    prix_vente: number;
    prix_revient: number;
    image: any;
    visibilite:string;
    deleted:string;
  }

  export interface IPlatsU {
    id_resto: string;
    nom_resto: string;
    nom_plat: string;
    prix_vente: number;
    prix_revient: number;
    image: any;
    visibilite:string;
    deleted:string;
  }


  export class PlatsU implements IPlatsU {
    constructor(
      public id_resto: string,
      public nom_resto: string,
      public nom_plat: string,
      public prix_vente:number,
      public prix_revient:number,
      public image: any,
      public visibilite: string,
      public deleted: string,
    ) {
      this.id_resto = id_resto;
      this.nom_resto = nom_resto;
      this.nom_plat = nom_plat;
      this.prix_vente=prix_vente;
      this.prix_revient=prix_revient;
      this.image=image;
      this.visibilite = visibilite;
      this.deleted = deleted;
    }
  }


  export class Plats implements IPlats {
    constructor(
      public id_resto: string,
      public nom_resto: string,
      public nom_plat: string,
      public prix_vente:number,
      public prix_revient:number,
      public image: any,
      public visibilite: string,
      public deleted: string,
      public _id?:  string,
    ) {
      this._id = _id ? _id : null;
      this.id_resto = id_resto;
      this.nom_resto = nom_resto;
      this.nom_plat = nom_plat;
      this.prix_vente=prix_vente;
      this.prix_revient=prix_revient;
      this.image=image;
      this.visibilite = visibilite;
      this.deleted = deleted;
    }
  
  }