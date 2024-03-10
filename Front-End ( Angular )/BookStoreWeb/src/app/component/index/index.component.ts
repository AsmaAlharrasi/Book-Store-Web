import { Component, OnInit } from '@angular/core';

//Components Imports
import { UpdateComponent } from '../update/update.component';
import { CreateComponent } from '../create/create.component';
import { GetComponent } from '../get/get.component';
import { DeleteComponent } from '../delete/delete.component';

//sengelton services Imports
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

//Interface Import
import { Book } from '../../datastore/book';

//Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

//Pipe Import
import { IsActivePipe } from '../../pipe/is-active.pipe';





@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    UpdateComponent,
    CreateComponent,
    GetComponent,
    DeleteComponent,
    RouterLink,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    IsActivePipe
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {


  columnsToDisplay: string[] = ['Id', 'Name', 'Author', 'Description', 'isActive', 'action'];

  items: Book[] = [];



  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.apiservice.getItems().subscribe(
      (data: Book[]) => {
        this.items = data;

        if (data.length > 0) {
          console.log(data);
        } else {
          console.log("book not found");
        }

      });


  }




}



