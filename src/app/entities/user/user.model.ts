export interface IUser {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  profil:string;
}

export interface LUser{
  email:string;
  mdp:string;
}

export interface IResto{
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  profil:string;
  ekaly:string;
}

export interface ILivreur{
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  mdp: string;
  profil:string;
  ekaly:string;
}






export class User implements IUser {
  constructor(
    public nom: string,
    public prenom: string,
    public email: string,
    public mdp:string,
    public profil:string,
    public _id?:  string,
  ) {
    this._id = _id ? _id : null;
    this.nom = nom;
    this.prenom = prenom;
    this.email=email;
    this.mdp=mdp;
    this.profil=profil;
  }

}

export class Users implements LUser {
  constructor(
    public email: string,
    public mdp: string,
   
  ) {
   
    this.email = email;
    this.mdp = mdp;
  }

}


export class Restos implements IResto {
  constructor(
    public nom: string,
    public prenom: string,
    public email: string,
    public mdp:string,
    public profil:string,
    public ekaly:string,
    public _id?:  string,
  ) {
    this._id = _id ? _id : null;
    this.nom = nom;
    this.prenom = prenom;
    this.email=email;
    this.mdp=mdp;
    this.profil=profil;
    this.ekaly=ekaly;
  }

}



export class Livreurs implements ILivreur {
  constructor(
    public nom: string,
    public prenom: string,
    public email: string,
    public mdp:string,
    public profil:string,
    public ekaly:string,
    public _id?:  string,
  ) {
    this._id = _id ? _id : null;
    this.nom = nom;
    this.prenom = prenom;
    this.email=email;
    this.mdp=mdp;
    this.profil=profil;
    this.ekaly=ekaly;
  }

}



