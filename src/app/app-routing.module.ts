import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectsComponent } from './components/objects/objects.component';
import { AddObjectComponent } from './components/add-object/add-object.component';

// Parent Routes
const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ObjectsComponent
  },
  {
    path: 'add',
    component: AddObjectComponent
  },
  {
    path: 'list/update/:id',
    component: AddObjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
