import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/service/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  /*@Input()*/ assignmentTransmis?:Assignment;
  @Output() assignmentASupprimer = new EventEmitter<Assignment>();

  constructor(@Inject(MAT_DIALOG_DATA) public assignment: any) { }

  // onAssignmentRendu() {
  //   if(this.assignmentTransmis)
  //     this.assignmentTransmis.rendu = true;
  //   //this.assignmentsService.updateAssignment(this.assignmentTransmis!).subscribe(message => console.log(message));
  //   this.router.navigate(['/home']);
  // }
  
  ngOnInit(): void {
    console.log("Assignment reçu dans le détail : ", this.assignment);
  }

  // getAssignment(assignment:) {
  //    const id = +this.route.snapshot.params['id'];
  //    this.assignmentsService.getAssignment(id).subscribe((assignment: Assignment | undefined) => this.assignmentTransmis = assignment);
  // }

  // onClickEdit() {
  //   this.router.navigate(["/assignment", this.assignmentsService?.id, "edit"],
  //     { queryParams: { nom: this.assignmentsService?.nom, fragment: "edition" } });
  // }

  // onDeleteRendu() {
  //   this.assignmentsService.deleteAssignment(this.assignmentTransmis!)
  //     .subscribe(() => {
  //       this.router.navigate(["/home"]);
  //     });
  //   this.router.navigate(["/home"]);
  // }

  // isAdmin(): boolean {
  //   return this.authService.isAdmin();
  // }

/** Méthodes de l'ancien assignment-detail.component.ts vu en TD
 
  getAssignment(): void {
    // On récupère l'id dans le snapshot passé par le routeur
    // Le + devant permet de caster la chaine de caractères en nombre
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'], {queryParams: {nom: this.assignmentTransmis?.nom}, fragment: 'edition'});
  }

  onDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis!).subscribe(message => console.log(message));
    // this.assignmentTransmis = undefined;
    this.router.navigate(['/home']);
  }

  isAdministrator(): boolean {
    return this.authService.isAdmin();
  }
  
*/
}
