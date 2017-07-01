import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: String;
  fullImagePath: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { 
    this.fullImagePath = '/assets/img';
  }
  ngOnInit() {
  }

  onRegisterSubmit(){
  	const user = {
  		email: this.email
  	}

  	// campos requeridos
  	if(!this.validateService.validateRegister(user)) {
  		this.flashMessage.show('Por favor, llena todos los campos', {cssClass: 'alert-danger', timeout: 3000});
  		return false;
  	} 


  	// validar email
  	if(!this.validateService.validateEmail(user.email)) {
  		this.flashMessage.show('Por favor, usa un email válido', {cssClass: 'alert-danger', timeout: 3000});
  		return false;
  	} 

    // registrar usuario

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Gracias por registrarse, verifique su correo', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/register']);
      } else {
        this.flashMessage.show('Algo salió mal', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    })
  }
}