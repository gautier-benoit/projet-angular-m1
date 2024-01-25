import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private apiUrl = 'http://localhost:8010/api/assignments';
  
  constructor(private http: HttpClient) { }

  public getRendus(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }
}
