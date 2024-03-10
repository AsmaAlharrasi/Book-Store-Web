import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Book } from '../../datastore/book';
import { ActivatedRoute, RouterLink } from '@angular/router';

//Angular Material & Reactive Forms Imports
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

//Pipe Import
import { IsActivePipe } from '../../pipe/is-active.pipe';



@Component({
  selector: 'app-get',
  standalone: true,
   
  imports: [MatButtonModule , MatCardModule, RouterLink, IsActivePipe],
  templateUrl: './get.component.html',
  styleUrl: './get.component.css'
})
export class GetComponent implements OnInit {

  item: Book | any;

  constructor( private route: ActivatedRoute ,  private apiservice: ApiService){}

  ngOnInit(): void {
    
    const itemId = Number(this.route.snapshot.paramMap.get('Id')); 
    this.apiservice.getItemById(itemId).subscribe(item => {
      this.item = item; 
      console.log(this.item);
    });
  }
}
