import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

//Interface Import
import { Book } from '../../datastore/book';

//Angular Material & Reactive Forms Imports 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatLabel
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  book!: FormGroup;
  item!: Book;
  isActive: boolean = false;
  constructor(private apiservice: ApiService, private builder: FormBuilder, private route: Router) {


    this.book = this.builder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      isActive: [false]
    });
  }


  onSubmit(): void {
    if (this.book.valid) {
      const item = this.book.value;

      this.apiservice.createItem(item)
        .subscribe(
          (createItem) => {
            console.log('Book created:', createItem);
            this.route.navigate(['']);
          },
          (error) => {
            console.error('Error creating book:', error);
          }
        );

    } else {
      console.error('Form is invalid');
    }
  }

  onCheckboxChange(event: MatCheckboxChange) {
    const control = this.book.get('isActive');
    if (control) {
      control.setValue(event.checked);
    }
  }
}
