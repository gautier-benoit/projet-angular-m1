import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/service/assignments.service';
import { Assignment } from '../assignment.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { get } from 'mongoose';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})

export class EditAssignmentComponent implements OnInit {
  nomAssignment!: string;
  dateDeRendu!: Date;
  description!: string;
  matiere!: string;
  note!: number;
  prof!: string;
  assignmentTransmis?: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public assignment: Assignment,
    public dialogRef: MatDialogRef<EditAssignmentComponent>
  ) { }

  ngOnInit(): void {
    console.log("Assignment reçu dans l'edit : ", this.assignment);
    this.getAssignment();
  }

  onSubmit(event: any) {
    event.preventDefault();
    if (this.nomAssignment) this.assignment!.nom = this.nomAssignment;
    if (this.dateDeRendu) this.assignment!.dateDeRendu = this.dateDeRendu;
    if (this.description) this.assignment!.description = this.description;
    if (this.matiere) this.assignment!.matiere = this.matiere;
    if (this.prof) this.assignment!.prof = this.prof;
    this.assignmentsService.updateAssignment(this.assignment!).subscribe((message: any) => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  getAssignment() {
    if (!this.assignment) return;
    this.assignment
    // Pour pré-remplir le formulaire
    this.nomAssignment = this.assignment.nom;
    this.dateDeRendu = this.assignment.dateDeRendu;
    this.description = this.assignment.description;
    this.matiere = this.assignment.matiere;
    this.note = this.assignment.note;
    this.prof = this.assignment.prof;
  }
}