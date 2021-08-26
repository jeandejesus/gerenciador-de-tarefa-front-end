import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Todo } from './../models/Todo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  

   baseUrl = environment.baseUrl

  constructor(private http:HttpClient , private snack : MatSnackBar) {

   }

    findAll(): Observable<Todo[]> {

    return this.http.get<Todo[]>(this.baseUrl)
     
   }

   findId(id :any): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Todo>(url)
    }

   update(todo: Todo) : Observable<Todo>{
    const url = `${this.baseUrl}/${todo.id}`
    console.log(this.http.put<Todo>(url,todo) );
    
     return  this.http.put<Todo>(url,todo) 
   }

   create (todo :Todo) : Observable<Todo> {
     return this.http.post<Todo>(this.baseUrl,todo)
   }

   delete(id : any) : Observable<void> {
     const url = `${this.baseUrl}/${id}`
     return this.http.delete<void>(url)
   }

   message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
