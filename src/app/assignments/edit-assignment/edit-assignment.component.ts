import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/service/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})

export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  detail!: string;
  note!: number;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssignment();

    // affichage console des query params et du fragment
    console.log("Query params : ", this.route.snapshot.queryParams);
    console.log("Fragment : ", this.route.snapshot.fragment);
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getRendu(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }

  onSaveAssignment() {
    if(this.nomAssignment) this.assignment!.nom = this.nomAssignment;
    if(this.dateDeRendu) this.assignment!.dateDeRendu = this.dateDeRendu;
    this.assignmentsService.updateAssignment(this.assignment!).subscribe((message: any) => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}