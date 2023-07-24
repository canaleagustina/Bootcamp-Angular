import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private readonly URL =environment.api;
  constructor(private http:HttpClient) { }


  addTrack$(track:any): Observable<any>{
    console.log('admin', track);
    return this.http.post(`${this.URL}/tracks/add`, track)
  }

  
  editTrack$(id:string, track:any): Observable<any>{
    console.log('admin edit id', id);
    console.log('admin edit track', id);
    return this.http.put(`${this.URL}/tracks/edit/${id}`,track);
  }

  deleteTrack$(id:string): Observable<any>{
    console.log('admin id', id);
    return this.http.delete(`${this.URL}/tracks/delete/${id}`);
  }


}
