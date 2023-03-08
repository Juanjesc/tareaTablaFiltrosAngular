import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameInput: string = ''
  datos: any = []
  constructor(private router: Router, private http: HttpClient) { 
  
  }
  consumirApi(){

    this.http
        .get('http://localhost:3000/juegos')
        .subscribe((data) => {
          var datos = JSON.parse(JSON.stringify(data));
        
           this.datos = datos;
           console.log(this.datos)
           
           
        });
  }

  
  ngOnInit(): void {
    this.consumirApi()
  }
  onSubmit(e: Event){
    e.preventDefault()
    let loginExiste: boolean = false;
    for(let i = 0; i< this.datos.length; i++){
      if (this.usernameInput.toLowerCase() === this.datos[i].perteneceA.toLowerCase()){
        
        sessionStorage.setItem('nombredeusuario', this.usernameInput);
        this.router.navigate(['/home'])
        loginExiste = true;
        return
      }
    }
    if (!loginExiste){
      alert('El usuario no existe prueba de nuevo')
    }
    document.forms[0].reset()
  }

}
