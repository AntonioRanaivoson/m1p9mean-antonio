import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ICommandes, Commandes} from './Commandes.model';

@Injectable({
    providedIn: 'root'
})
export class CommandesService {
    options = {headers : { 'Content-Type' : 'application/x-www-form-urlencoded' }};
    private usersUrl = '/api/Commandes';
    
    constructor(private http: Http) { }

    // Get Commandes
    get(): Promise<Array<ICommandes>> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }



    get_Commandes_user_encours(id_user:string): Promise<Array<ICommandes>> {
        return this.http.get(this.usersUrl+"-user-en-cours/"+id_user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    get_Commandes_encours(): Promise<Array<ICommandes>> {
        return this.http.get(this.usersUrl+"-en-cours")
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }




    get_Commandes_restos(id_resto:string): Promise<Array<ICommandes>> {
        return this.http.get(this.usersUrl+"-restos/"+id_resto)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    get_Commandes_restos_ekaly(id_resto:string): Promise<Array<ICommandes>> {
        return this.http.get(this.usersUrl+"-restos-ekalys/"+id_resto)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }




     // Create Commandes
     create(Commandes: Commandes): Promise<ICommandes> {
        return this.http.post(this.usersUrl, Commandes)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    get_plat_id(id:string):Promise<Array<ICommandes>>{
        return this.http.get(this.usersUrl+"/"+id)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }


    delete(id: string): Promise<any> {
        return this.http.get(this.usersUrl+"-delete-ekaly/"+id)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }


  
}
