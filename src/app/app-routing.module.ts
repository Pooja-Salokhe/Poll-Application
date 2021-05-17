import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePollComponent } from './component/create-poll/create-poll.component';

const routes: Routes = [
  { path: '', component: CreatePollComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
