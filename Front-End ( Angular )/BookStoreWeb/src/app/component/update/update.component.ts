import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

//Interface Import
import { Book } from '../../datastore/book';

//Angular Material & Reactive Forms Imports 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';

//Pipe Import
import { IsActivePipe } from '../../pipe/is-active.pipe';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    IsActivePipe,
    MatCheckboxModule

  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  item: Book | any;
  book!: FormGroup;
  Id!: number | null;


  constructor(
    private apiservice: ApiService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('Id') as number | null;

    this.book = this.builder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      isActive: []

    });

    if (this.Id) {
      this.apiservice.getItemById(this.Id).subscribe(item => {
        this.item = item;
        //Bug
        console.log(this.item);
        this.book.patchValue(item);
      });
    }
  }



  onSubmit(): void {

    if (this.book.valid) {
      const item = this.book.value;
      item.Id = this.Id;

      item.isActive = this.book.get('isActive')?.value;

      this.apiservice.updateItem(item.Id, item).subscribe(
        () => {
          console.log(`Book with ID ${item.Id} updated successfully`)
          this.router.navigate(['']);
        }, (error) => {
          console.error(`Error updating book with ID ${item.Id}:`, error);

        }
      );
    }
  }


}
