import { Component, OnInit } from '@angular/core';

import { UsuarioLogin } from '../../model/UsuarioLogin';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../model/User';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.css']
})
export class ApresentacaoComponent implements OnInit {
  usuarioLogin: UsuarioLogin =  new UsuarioLogin()
  user: User = new User()
  confirmarSenha: string


  constructor(
    private auth: AuthService,
    private router: Router 
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  logar(){
    this.auth.logar(this.usuarioLogin).subscribe((resposta: UsuarioLogin) => {
      this.usuarioLogin = resposta

      environment.token = this.usuarioLogin.token
      environment.nomeCompleto = this.usuarioLogin.nomeCompleto
      environment.id = this.usuarioLogin.id
      environment.email = this.usuarioLogin.email
      environment.usuario = this.usuarioLogin.usuario

     /*  this.router.navigate(['/produtos']) */
    }, erro =>{
      if(erro.status == 500){
        alert('Usuário ou senha estão incorretos')
      }
    })

  }
  cadastrar(){
    this.auth.cadastrar(this.user).subscribe((resposta: User) => {
      this.user = resposta
     /*  this.router.navigate(['/home']) */
      alert('Usuário cadastrado com sucesso!')

    }, erro =>{
      if(erro.status == 400){
        alert('Usuário já cadastrado!')
      }
    })
  }

}
