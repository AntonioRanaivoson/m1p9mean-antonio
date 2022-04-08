import { Component, OnInit } from '@angular/core';
import { User,Users,LUser } from '../entities/user/user.model';
import { UserService } from '../entities/user/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email='' as any;
  mdp='' as any;
  message="";
  user=[] as any;
  constructor(private users:UserService,private route:Router) { }
  error: boolean = false;

  ngOnInit(): void {
  }

  login(){
    const user =new Users(this.email,this.mdp);
  //  console.log(this.email);
   // console.log(user);
    this.users.login(user).then((result: LUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        
        if(result["status"]=="NON"){
          console.log("NONONON");
          this.message=result["message"];
        }
        else if(result["status"]=="OK"){
          console.log("YES");
          this.message=result["message"];
          console.log(result);
         
          if(result["profil"]=="client")
          {
            localStorage.setItem("token_client",JSON.stringify(result));
           // let item = JSON.parse(localStorage.getItem("token_client"));
            this.route.navigateByUrl("/e-kaly");
          }
          if(result["profil"]=="resto")
          {
            localStorage.setItem("token_resto",JSON.stringify(result));
            let item = JSON.parse(localStorage.getItem("token_resto"));
            this.route.navigateByUrl("/restaurant");
          }
          if(result["profil"]=="admin")
          {
            localStorage.setItem("token_admin",JSON.stringify(result));
            let item = JSON.parse(localStorage.getItem("token_admin"));
            this.route.navigateByUrl("/e-kaly-admin");
          }

          if(result["profil"]=="livreur")
          {
            localStorage.setItem("token_livreur",JSON.stringify(result));
           // let item = JSON.parse(localStorage.getItem("token_client"));
            this.route.navigateByUrl("/livreur");
          }
         
          //console.log("ITO"+item["token"]);

        }
        
         // this.createdUser.emit(result);
          //this.refresh();
       
      }
    });
     
  }
}
