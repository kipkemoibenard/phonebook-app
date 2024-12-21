import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'phonebook/contact-list', pathMatch: 'full' },
  { path: 'phonebook', loadChildren: () => import('./features/phonebook/phonebook.module').then(m => m.PhonebookModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
