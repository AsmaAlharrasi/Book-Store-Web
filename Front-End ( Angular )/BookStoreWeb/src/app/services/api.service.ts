import { Injectable } from '@angular/core';
import { Book } from '../datastore/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7216/api/Book';

  constructor(private http: HttpClient) { }


  //Get All Books
  getItems(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }


  //Get Book By Id
  getItemById(Id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/id:int?id=${Id}`);
  }


  //Create New Book
  createItem(item: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, item);
  }


  //Delete one Book
  deleteItem(Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id:int?id=${Id}`);
  }


  //Update Existing Book
  updateItem(Id: number, item: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/id:int?id=${Id}`, item);
  }

}
