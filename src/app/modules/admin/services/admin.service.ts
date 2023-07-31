import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

  addTrack$(track: TrackModel): Observable<any> {
    console.log('admin', track);
    return this.http.post(`${this.URL}/tracks/add`, track);
  }
}
