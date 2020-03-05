import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { FacedetectionComponent } from './facedetection/facedetection.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'facedetection', component: FacedetectionComponent },
  { path: 'enrollment', component: EnrollmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
