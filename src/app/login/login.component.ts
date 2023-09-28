import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private router: Router )
    {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(username, password)
      .subscribe(
        (response) => {
          // Manejar la respuesta del servidor aquí, por ejemplo, redirigir al dashboard.
          console.log('Inicio de sesión exitoso:', response);
          this.router.navigate(['/dashbord']);
          // Puedes redirigir a la pantalla de dashboard aquí
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
          this.errorMessage = 'Inicio de sesión fallido. Verifica tus credenciales.'; // Mostrar mensaje de error
        }
      );
    }
  }
}
