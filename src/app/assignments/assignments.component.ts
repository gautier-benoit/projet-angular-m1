import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = "Formulaire d'ajout de devoir";
  ajoutActive = false;
  color = 'green';
  id="monParagraphe";
  boutonDesactive = true;
  nomDevoir=""
  dateDeRendu?:Date=undefined;
  assignmentSelectionne!:Assignment;
  formVisible = false;
  assignments:Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit() {
    this.getAssignments();
    console.log(" AVANT RENDU DE LA PAGE !");
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000)
  }

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  onSubmit(event:any) {
    this.titre = "Vous avez tapé : " + this.dateDeRendu;
    console.log(event)
    //event.preventDefault();

    let a = new Assignment();
    a.nom = this.nomDevoir;
    if(this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;

    a.rendu = false;

    this.assignments.push(a);
  }

  assignmentClique(assignment:Assignment) {
    console.log("Assignment cliqué : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }
  
  getAssignments() {
    this.assignmentsService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }

  // onNouvelAssignment(event:Assignment) {
  //   //this.assignments.push(event);
  //   this.assignmentsService.addAssignment(event).subscribe(message => console.log(message));
  //   this.formVisible = false;
  // }
}
