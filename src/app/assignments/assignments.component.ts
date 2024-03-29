import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../service/assignments.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { get } from 'mongoose';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = "Formulaire d'ajout de devoir";
  ajoutActive = false;
  color = 'green';
  id!: number;
  boutonDesactive = true;
  nomDevoir = ""
  dateDeRendu?: Date = undefined;
  assignmentSelectionne?: Assignment;
  formVisible = false;
  assignments: Assignment[] = [];
  rendus: Assignment[] = [];
  dataSource = new MatTableDataSource(this.rendus);
  displayedColumns: string[] = ['nom', 'matiere', 'dateDeRendu', 'rendu', 'actions'];
  isCompleted = false;
  constructor(private assignmentsService: AssignmentsService, public dialog: MatDialog, private router: Router) { }

  @ViewChild('eventsSort') eventsSort = new MatSort();
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngOnInit() {
    this.getAssignments();
    console.log(" AVANT RENDU DE LA PAGE !");
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.eventsSort;
    this.dataSource.paginator = this.paginator;
  }

  getDescription() {
    return 'Je suis un sous composant';
  }

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  onSubmit(event: any) {
    this.titre = "Vous avez tapé : " + this.dateDeRendu;
    console.log(event)
    //event.preventDefault();

    let a = new Assignment();
    a.nom = this.nomDevoir;
    if (this.dateDeRendu)
      a.dateDeRendu = this.dateDeRendu;

    a.rendu = false;

    this.assignments.push(a);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(rendu: Assignment) {
    this.dialog.open(AssignmentDetailComponent, {
      width: '600px',
      data: rendu
    },);
  }

  viewAddAssignment() {
    this.dialog.open(AddAssignmentComponent, {
      width: '600px',
    },);
    this.getAssignments();
  }

  editAssignment() {
    let assignment = this.assignmentSelectionne;
    this.dialog.open(EditAssignmentComponent, {
      width: '600px',
      data: assignment
    },);
    this.getAssignments();
  }

  assignmentClique(assignment: Assignment) {
    console.log("Assignment cliqué : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }

  getAssignments() {
    this.assignmentsService.getRendus().subscribe((assignments) => {
      if (this.isCompleted) {
        this.assignments = assignments.filter(assignment => assignment.rendu);
      } else {
        this.assignments = assignments;
      }
      this.dataSource.data = this.assignments;
    });
  }

  deleteAssignment() {
    this.assignmentsService.deleteAssignment(this.assignmentSelectionne!).subscribe((message) => {
      console.log(message);
      this.getAssignments();
      this.router.navigate(['/home']);
    });
  }
}
