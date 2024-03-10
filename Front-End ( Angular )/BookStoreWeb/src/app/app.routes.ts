import { Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { CreateComponent } from './component/create/create.component';
import { UpdateComponent } from './component/update/update.component';
import { GetComponent } from './component/get/get.component';
import { DeleteComponent } from './component/delete/delete.component';

export const routes: Routes = [
    { path: "", component: IndexComponent },
    { path: "Create", component: CreateComponent },
    { path: "Update/:Id", component: UpdateComponent },
    { path: "Get/:Id", component: GetComponent },
    { path: "Delete/:Id", component: DeleteComponent }

];
