import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      id: 1,
      nom: 'Devoir Angular de Buffa',
      dateDeRendu: new Date('2023-09-30'),
      rendu: false,
    },
    {
      id: 2,
      nom: 'Devoir SQL de Mopolo',
      dateDeRendu: new Date('2023-10-30'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Devoir gestion de Tounsi',
      dateDeRendu: new Date('2023-08-30'),
      rendu: true,
    },
  ];

  constructor(private loggingService:LoggingService) { }

  // Renvoie comme obersvale l'assignment avec l'id passé en paramètre ou undefined si pas trouvé
  getAssignment(id:number):Observable<Assignment|undefined> {
    const a:Assignment|undefined = this.assignments.find( a => a.id === id);
    return of(a);
  }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment:Assignment): Observable<string> {
    this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, "ajouté");
    return of("Devoir ajouté par le service");
  }

  updateAssignment(assignment:Assignment): Observable<string> {
    this.loggingService.log(assignment.nom, "modifié");
    return of("Devoir modifié par le service");
  }

  deleteAssignment(assignment:Assignment): Observable<string> {
    let index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1);
    this.loggingService.log(assignment.nom, "supprimé");
    return of("Devoir supprimé par le service");
  }
}
