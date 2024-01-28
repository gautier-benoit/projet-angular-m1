import { Component, OnInit, /*EventEmitter, Output*/ } from '@angular/core';
import { AssignmentsService } from 'src/app/service/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir = ""
  dateDeRendu?: Date = undefined;
  description = ""
  matieres: Matiere[] = [];
  matiere = ""
  image: any
  professeur: any

  ajoutActive: any;

  constructor(private assignmentsService: AssignmentsService, private router: Router) { }

  ngOnInit(): void {
    this.getMatieres();
   }

  onSubmit(event: any) {
    event.preventDefault();
    let newAssignment = new Assignment();
    newAssignment._id = Math.floor(Math.random() * 1000).toString();
    newAssignment.nom = this.nomDevoir;
    if (this.dateDeRendu)
      newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.description = this.description;
    newAssignment.matiere = this.matiere;
    newAssignment.picture = this.image;
    newAssignment.prof = this.professeur;

    this.assignmentsService.addAssignment(newAssignment).subscribe((message: any) => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  getMatieres() {
    this.assignmentsService.getMatieres().subscribe((matieres) => {
      this.matieres = matieres;
    });
  }

  getDetailMatiereSelect(event: any) {
    this.professeur = event.value.prof;
    this.image = event.value.photo;
  }

}
