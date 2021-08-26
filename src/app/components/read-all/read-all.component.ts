import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/Todo';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css'],
 })
export class ReadAllComponent implements OnInit {

  closed = 0
  list : Todo [] =  []
  listFinished : Todo [] =  []

  constructor(private service : TodoService, private router :Router) { }
  ngOnInit(): void {
    this.findAll()
  }
  
  public findAll() {
    this.service.findAll().subscribe((r)=>{
      r.forEach(todo =>{
        if(todo.finalizado){
          this.listFinished.push(todo)
        }else{
          this.list.push(todo);
        }
      })

      this.closed = this.listFinished.length
    })

  }
 

   finalizar (todo : Todo): void {
     todo.finalizado = true
     this.service.update(todo).subscribe((respota)=>{
      this.service.message("Task Atualizada com sucesso")
      this.list = this.list.filter(respota => respota.id !== todo.id)
      this.closed++

     })
   }

  public delete(id : any) {
     this.service.delete(id).subscribe((resposta)=>{
       if(resposta === null){
         this.service.message("Task Deletada com sucesso")
         this.list = this.list.filter(todo => todo.id !== id)
        }
     });
  }

  navegarParaFinalizados () : void {
    this.router.navigate(['/finalizados'])
  }
}
