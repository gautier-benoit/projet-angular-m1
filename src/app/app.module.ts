import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule }from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthGuard } from './shared/auth.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  // home page, ce qui sera affiché avec localhost/4200/
  { path: '', component: AssignmentsComponent },
  // ce qui sera affiché avec localhost/4200/home
  { path: 'home', component: AssignmentsComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent, canActivate: [AuthGuard] },
  { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, MatRadioModule,
    FormsModule, MatDatepickerModule, MatNativeDateModule,
    MatToolbarModule, MatSidenavModule, MatListModule,
    MatCheckboxModule, RouterModule.forRoot(routes), MatSlideToggleModule,
    HttpClientModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
