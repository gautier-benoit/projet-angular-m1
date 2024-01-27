import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../service/assignments.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = "Formulaire d'ajout de devoir";
  ajoutActive = false;
  color = 'green';
  id = "monParagraphe";
  boutonDesactive = true;
  nomDevoir = ""
  dateDeRendu?: Date = undefined;
  assignmentSelectionne!: Assignment;
  formVisible = false;
  assignments: Assignment[] = [];
  rendus: Assignment[] = [];
  dataSource = new MatTableDataSource(this.rendus);
  displayedColumns: string[] = ['nom', 'matiere', 'dateDeRendu', 'rendu', 'actions'];
  constructor(private assignmentsService: AssignmentsService, public dialog: MatDialog) { }

  @ViewChild('eventsSort') eventsSort = new MatSort();
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngOnInit() {
    //this.getAssignments();
    console.log(" AVANT RENDU DE LA PAGE !");
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000)
    this.assignmentsService.getRendus().subscribe(data => {
      this.rendus = data;
      this.dataSource.data = this.rendus;
      console.log(this.dataSource.data)
    });
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
      /**
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
    */
}
