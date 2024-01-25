import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/service/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ assignmentTransmis?:Assignment;

  constructor(private assignmentsService:AssignmentsService, private route: ActivatedRoute, private router:Router, private authService:AuthService) { }

  onAssignmentRendu() {
    if(this.assignmentTransmis)
      this.assignmentTransmis.rendu = true;
    //this.assignmentsService.updateAssignment(this.assignmentTransmis!).subscribe(message => console.log(message));
    this.router.navigate(['/home']);
  }
  
  ngOnInit(): void {
    //this.getAssignment();
  }
/**
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
