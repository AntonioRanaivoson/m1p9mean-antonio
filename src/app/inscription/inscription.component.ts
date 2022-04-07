import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IUser, User } from 'src/app/entities/user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantsComponent } from '../restaurants/restaurants.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  userForm: FormGroup;
  nom='';
  prenom='';
  email='';
  mdp='';
  profil='client';
  error: boolean = false;
  message='';
  col='';
  users:IUser;
  check:string;
  
  @Output() createdUser = new EventEmitter<IUser>();

  constructor(protected userService:UserService,protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    
  }

    // Manage the submit action and create the new product.
    onSubmit() {
      const user = new User(this.userForm.value['nom'].trim(), this.userForm.value['prenom'],this.userForm.value['email'],this.userForm.value['mdp'],this.profil);
      this.userService
      .check_mail(this.userForm.value['email'])
      .then((result:IUser) => {
        let users = result;
        if(!users)
        {
            this.userService.create(user).then((result: IUser) => {
          if (result === undefined) {
            this.error = true;
          } else {
            this.error = false;
            
             // this.createdUser.emit(result);
              //this.refresh();
           
          }
        });
        this.message='Inscription reussi';
        this.col="green";
        console.log(this.message);

        }
        else{
          console.log("AAA");
          this.message='Erreur , adresse email deja enregistre';
          this.col="red";
          console.log(this.message);
        }


        
      });
    
      
      
  
    }
  
    // Hide the error message.
    hideError() {
      this.error = false;
    }
  
    // Init the creation form.
    private initForm() {
      this.userForm = new FormGroup({
        nom: new FormControl(this.nom, Validators.required),
        prenom: new FormControl(this.prenom),
        email: new FormControl(this.email, Validators.required),
        mdp: new FormControl(this.mdp, Validators.required),
      });
    }
  
    private refresh(){
      this.nom='';
      this.prenom='';
      this.email='';
      this.mdp='';
      //this.users=null;
    }


    private check_mail(mail) {
      this.userService
        .check_mail(mail)
        .then((result:IUser) => {
          this.users = result;
          console.log(this.users)
        });
        
    }

   
}
