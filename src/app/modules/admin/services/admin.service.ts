// admin.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrackModel } from '../../../core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) {}

  addTrack$(track: TrackModel): Observable<any> {
    return this.http.post(`${this.URL}/tracks/add`, track);
  }

  updateTrack$(track: TrackModel): Observable<any> {
    return this.http.put(`${this.URL}/tracks/${track.uid}`, track);
  }

  deleteTrack$(uid: string): Observable<any> {
    return this.http.delete(`${this.URL}/tracks/delete/${uid}`);
  }
}
