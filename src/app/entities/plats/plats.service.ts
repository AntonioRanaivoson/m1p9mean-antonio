import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPlats, Plats} from './plats.model';

@Injectable({
    providedIn: 'root'
})
export class PlatsService {
    options = {headers : { 'Content-Type' : 'application/x-www-form-urlencoded' }};
    private usersUrl = '/api/plats';
    
    constructor(private http: Http) { }

    // Get plats
    get(): Promise<Array<IPlats>> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    get_plats_restos(id_resto:string): Promise<Array<IPlats>> {
        return this.http.get(this.usersUrl+"-restos/"+id_resto)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    get_plats_restos_ekaly(id_resto:string): Promise<Array<IPlats>> {
        return this.http.get(this.usersUrl+"-restos-ekalys/"+id_resto)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }




     // Create plats
     create(plats: Plats): Promise<IPlats> {
        return this.http.post(this.usersUrl, plats)
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
