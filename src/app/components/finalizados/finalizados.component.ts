import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/Todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {


  closed = 0
  list : Todo [] =  []
  listFinished : Todo [] =  []

  constructor(private service : TodoService, private router : Router) { }
  ngOnInit(): void {
    this.findAll()
  }
  
  public findAll() {
    this.service.findAll().subscribe((r)=>{
      r.forEach(todo =>{
        if(todo.finalizado){
          this.listFinished.push(todo)
        } 
      })

     })

  }

  voltar(){
    this.router.navigate([''])
  }
 
}
