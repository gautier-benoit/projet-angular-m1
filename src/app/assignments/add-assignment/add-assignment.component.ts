import { Component, OnInit, /*EventEmitter, Output*/ } from '@angular/core';
import { AssignmentsService } from 'src/app/service/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir=""
  dateDeRendu?:Date=undefined;
  ajoutActive: any;

  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {}

  onSubmit(event:any) {

    let newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    if(this.dateDeRendu)
    newAssignment.date_de_rendu = this.dateDeRendu;

      newAssignment.rendu = false;

    //this.assignments.push(a);
    //this.nouvelAssignment.emit(newAssignment);
    //this.assignmentsService.addAssignment(newAssignment).subscribe(message => console.log(message));
  }

}
