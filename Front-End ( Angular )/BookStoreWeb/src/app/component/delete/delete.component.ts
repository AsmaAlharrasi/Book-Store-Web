import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {

  constructor(private apiservice: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('Id'));
    this.apiservice.deleteItem(itemId).subscribe(
      () => {
        console.log(`Book with ID ${itemId} deleted successfully`);

        this.router.navigate(['']);
      },
      (error) => {
        console.error(`Error deleting book with ID ${itemId}:`, error);
      }
    );

  }


}
