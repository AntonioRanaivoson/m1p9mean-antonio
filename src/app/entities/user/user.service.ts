import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, User ,Users,LUser, IResto, ILivreur} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    options = {headers : { 'Content-Type' : 'application/x-www-form-urlencoded' }};
    private usersUrl = '/api/users';
    
    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IUser>> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }


    get_livreur():Promise<Array<ILivreur>> {
        return this.http.get('/api/Livreur')
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }




    check_mail(email:string): Promise<IUser>{
        return this.http.get(this.usersUrl+'/'+email).toPromise().then(response => response.json())
        .catch(this.error);
    }
    //Login
    login(user : Users):Promise<LUser>{
        return this.http.post(this.usersUrl+ "/login", user)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
      }

    // Create product
    create(user: User): Promise<IUser> {
        return this.http.post(this.usersUrl, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Delete a product
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.usersUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

  //  users/token/:id'

    delete_token(id: string): Promise<any> {
        return this.http.delete(`${this.usersUrl+"/token"}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }


    logout(token:string){
        let item = JSON.parse(localStorage.getItem(token));
        let id_user=item["id_user"];
        console.log(id_user);
        this.delete_token(id_user);
        localStorage.removeItem(token);
        window.location.reload()
       
    }
    
    get_resto(): Promise<Array<IResto>> {
        return this.http.get(this.usersUrl+"/restos-ekaly")
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    delete_resto_ekaly(mail:string,option:string)
    {
        return this.http.get(this.usersUrl+"/restos-ekaly/delete/"+mail+"/"+option)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }


    sendMail(email:string,data:any): Promise<IUser> {
        return this.http.post("api/user/sendmail/"+email, data)
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
