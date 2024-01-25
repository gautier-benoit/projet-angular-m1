import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from '../shared/logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private apiUrl = 'http://localhost:8010/api/assignments';
  

  constructor(private loggingService:LoggingService, private http: HttpClient) { }

  // Renvoie comme obersvale l'assignment avec l'id passé en paramètre ou undefined si pas trouvé
 /** getAssignment(id:number):Observable<Assignment|undefined> {
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
*/
  public getRendus(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }
}
