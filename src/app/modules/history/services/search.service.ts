import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<any> {
    return this.http.get(`${this.URL}/tracks?src=${term}`).pipe(
      map((dataRaw: any) => this.sortBySearchTerm(dataRaw.data, term))
    );
  }

  private sortBySearchTerm(data: any[], term: string): any[] {
    // Ordenar los resultados según la similitud con el término de búsqueda
    return data.sort((a, b) => {
      const aMatch = a.name.toLowerCase().includes(term.toLowerCase());
      const bMatch = b.name.toLowerCase().includes(term.toLowerCase());

      if (aMatch && !bMatch) {
        return -1;
      } else if (!aMatch && bMatch) {
        return 1;
      } else {
        return a.name.localeCompare(b.name); // Ordenar alfabéticamente si no hay una diferencia en la similitud
      }
    });
  }
}
