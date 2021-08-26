import { Todo } from './../../models/Todo';
import { TodoService } from './../../services/todo.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo : Todo = {titulo:"",descricao:"",dataParaFinalizar: new Date(),finalizado:false}

  constructor(private router :Router, private service : TodoService , private route :ActivatedRoute) { }

  ngOnInit(): void {
    //pegar id da url
    let id = this.route.snapshot.paramMap.get("id")
    this.service.findId(id).subscribe((resposta)=>{
       
      this.todo = resposta
       console.log(this.todo);

    })
  }

  cancelar ():void {
    this.router.navigate([''])
  }

  update ():void {
    
    this.formataData()
    this.service.update(this.todo).subscribe((resposta)=>{
      this.router.navigate([''])
      this.service.message("to-do atualizado Com sucesso ")
    },err =>{
      this.service.message("Falha ao atualizar To-do ")

    })
    
  }

  formataData():void {
    let data = new Date(this.todo.dataParaFinalizar)

    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() +1}/${data.getFullYear()}`
  }

}
