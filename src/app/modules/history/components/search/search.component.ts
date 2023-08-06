import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackData: EventEmitter<any> = new EventEmitter();
  src: string = '';
  searchResults: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: string): void {
    if (term.length >= 3) {
      this.callbackData.emit(term);
      console.log('🔴 Llamamos a nuestra API HTTP GET---> ', term);
    } else {
      this.searchResults = []; // Limpiar los resultados si el término de búsqueda es menor a 3 letras
      this.callbackData.emit(''); // Emitir un término vacío para borrar la lista en el componente HistoryPageComponent
    }
  }
  
}
