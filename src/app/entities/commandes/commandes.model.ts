export interface ICommandes {
    _id?: string;
    id_user:string;
    email:string;
    id_resto: string;
    nom_resto: string;
    id_plat:string;
    nom_plat: string;
    quantite:number;
    prix_vente: number;
    prix_revient: number;
    image: any;
    date:string;
    pourcentage:number;
    etat:string;
    prix_total:number;
    benefice_plat_resto:number;
    benefice_resto:number;
    benefice_ekaly:number;
  }





  export interface ICommandes_livreur {
    _id?: string;
    id_commande:string;
    id_livreur:string;
    nom_livreur:string;
    email_livreur:string;
    email_client:string;
    id_resto: string;
    nom_resto: string;
    id_plat:string;
    nom_plat: string;
    quantite:number;
    image: any;
    date:string;
    date_livraison:string;
    prix_total:number;
    etat:string;
  }


  export class Commandes_livreur implements ICommandes_livreur {
    constructor(
        public id_commande:string,
        public id_livreur:string,
        public nom_livreur:string,
        public email_livreur:string,
        public email_client:string,
        public id_resto: string,
        public nom_resto: string,
        public id_plat:string,
        public nom_plat: string,
        public quantite:number,
        public image: any,
        public date:string,
        public date_livraison:string,
        public prix_total:number,
        public etat:string,

      public _id?:  string,
    ) {
      this._id = _id ? _id : null;
      this.id_commande=id_commande;
      this.id_livreur=id_livreur;
      this.nom_livreur=nom_livreur;
      this.email_livreur=email_livreur;
      this.email_client=email_client;
      this.id_resto = id_resto;
      this.nom_resto = nom_resto;
      this.id_plat=id_plat;
      this.nom_plat = nom_plat;
      this.quantite=quantite
      this.image=image;
      this.date=date;
      this.date=date;
      this.date_livraison=date_livraison;
      this.prix_total=prix_total;
      this.etat;
    }


  }











  export class Commandes implements ICommandes {
    constructor(
      public  id_user:string,
      public  email:string,
      public id_resto: string,
      public nom_resto: string,
      public id_plat:string,
      public nom_plat: string,
      public quantite:number,
      public prix_vente:number,
      public prix_revient:number,
      public image: any,
      public date: string,
      public pourcentage: number,
      public etat:string,
      public prix_total:number,
      public benefice_plat_resto:number,
      public benefice_resto:number,
      public benefice_ekaly:number,

      public _id?:  string,
    ) {
      this._id = _id ? _id : null;
      this.id_user=id_user;
      this.email=email;
      this.id_resto = id_resto;
      this.nom_resto = nom_resto;
      this.id_plat=id_plat;
      this.nom_plat = nom_plat;
      this.quantite=quantite
      this.prix_vente=prix_vente;
      this.prix_revient=prix_revient;
      this.image=image;
      this.date=date;
      this.pourcentage=pourcentage;
      this.etat;
      this.prix_total=prix_total;
      this.benefice_plat_resto=benefice_plat_resto;
      this.benefice_resto=benefice_resto;
      this.benefice_ekaly=benefice_ekaly;
    }
  
  }