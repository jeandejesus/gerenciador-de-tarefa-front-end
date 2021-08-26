import { Todo } from './../../models/Todo';
import { TodoService } from './../../services/todo.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todo : Todo = {titulo:"",descricao:"",dataParaFinalizar: new Date(),finalizado:false}

  constructor(private router :Router, private service : TodoService) { }

  ngOnInit(): void {
  }

  cancelar ():void {
    this.router.navigate([''])
  }

  create ():void {
    this.formataData()
    this.service.create(this.todo).subscribe((resposta)=>{
      this.router.navigate([''])
      this.service.message("to-do Criado Com sucesso ")
    },err =>{
      this.service.message("Falha ao criar To-do ")

    })
    
  }

  formataData():void {
    let data = new Date(this.todo.dataParaFinalizar)

    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() +1}/${data.getFullYear()}`
  }
}
