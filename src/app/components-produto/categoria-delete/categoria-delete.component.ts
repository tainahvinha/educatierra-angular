import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../../model/Categoria';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria:Categoria = new Categoria()
  idCategoria:number
  constructor(
    private router: Router,
    private categoriaService:CategoriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0) 
    if(environment.token == ''){
      this.router.navigate(['/admin']) //ve se ta certo o home mano 
    }
    this.idCategoria = this.route.snapshot.params['id']
    this.categoriaPeloId(this.idCategoria)
    this.categoriaService.refreshToken()
  }

  categoriaPeloId(id:number){
    this.categoriaService.categoriaPeloId(id).subscribe((resp:Categoria)=>{
      this.categoria = resp
    })
  }

  apagar(){
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe(()=>{
      console.log(environment.adminUsuario)
      alert('Deleted')
      this.router.navigate(['/admin'])
    })
  }
 
}
