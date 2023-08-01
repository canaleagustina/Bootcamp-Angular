import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  @Input() tracks: TrackModel[] = [];
  optionSort: { property: string | null; order: string } = { property: null, order: 'asc' };
  newTrack: TrackModel = { name: '', album: '', cover: '', url: '', uid: '' };
  selectedTrack: TrackModel | undefined;
  isEditing = false;

  constructor(private tracksService: TrackService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchTracksFromApi();
  }

  fetchTracksFromApi(): void {
    this.tracksService.getAllTracks$().subscribe(
      (data: TrackModel[]) => {
        this.tracks = data;
      },
      (error) => {
        console.error('Error al obtener las canciones desde la API:', error);
      }
    );
  }

  onAddTrack(event: Event): void {
    event.preventDefault();
    if (this.isEditing && this.selectedTrack) {
      // Actualizar solo el nombre de la canción en el objeto selectedTrack
      this.selectedTrack.name = this.newTrack.name;
      
      // Llamar al servicio para actualizar solo el nombre de la canción
      this.adminService.updateTrack$(this.selectedTrack).subscribe(
        (response) => {
          console.log('Track name updated successfully:', response);
          this.newTrack = { name: '', album: '', cover: '', url: '', uid: '' };
          this.isEditing = false;
          this.fetchTracksFromApi(); // Refrescar la lista de canciones después de actualizar una canción
        },
        (error) => {
          console.error('Error updating track name:', error);
        }
      );
    } else {
      // Agregar una nueva canción
      this.adminService.addTrack$(this.newTrack).subscribe(
        (response) => {
          console.log('Track added successfully:', response);
          this.newTrack = { name: '', album: '', cover: '', url: '', uid: '' };
          this.fetchTracksFromApi(); // Refrescar la lista de canciones después de agregar una nueva canción
        },
        (error) => {
          console.error('Error adding track:', error);
        }
      );
    }
  }

  onEditTrack(track: TrackModel): void {
    this.selectedTrack = track;
    this.newTrack = { ...track };
    this.isEditing = true;
  }

  onDeleteTrack(uid: string): void {
    this.adminService.deleteTrack$(uid).subscribe(
      (response) => {
        console.log('Track deleted successfully:', response);
        this.fetchTracksFromApi(); // Refrescar la lista de canciones después de eliminar una canción
      },
      (error) => {
        console.error('Error deleting track:', error);
      }
    );
  }

  changeSort(property: string): void {
    const { order } = this.optionSort;
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    };
  }
}
