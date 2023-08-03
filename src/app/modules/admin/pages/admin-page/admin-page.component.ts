import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
        console.error('Error al obtener las canciones', error);
      }
    );
  }

  @ViewChild('trackForm') trackForm!: NgForm; // Obtener una referencia al formulario

  onAddTrack(event: Event, form: NgForm): void {
    event.preventDefault();
    if (this.isEditing && this.selectedTrack) {
      // Actualizar solo el nombre de la canción en el objeto selectedTrack
      this.selectedTrack.name = this.newTrack.name;

      // Llamar al servicio para actualizar solo el nombre de la canción
      this.adminService.updateTrack$(this.selectedTrack).subscribe(
        (response) => {
          console.log('Canción actualizada:', response);
          this.newTrack = { name: '', album: '', cover: '', url: '', uid: '' };
          this.isEditing = false;
          this.trackForm.resetForm(); // Resetear el formulario después de guardar los cambios
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
          console.log('Canción agregada:', response);
          this.newTrack = { name: '', album: '', cover: '', url: '', uid: '' };
          this.trackForm.resetForm(); // Resetear el formulario después de agregar una nueva canción
          this.fetchTracksFromApi(); // Refrescar la lista de canciones después de agregar una nueva canción
        },
        (error) => {
          console.error('Error agregando track:', error);
        }
      );
    }
  }

  onEditTrack(track: TrackModel): void {
    this.selectedTrack = track;
    this.newTrack = { ...track };
    this.isEditing = true;
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.trackForm.resetForm(); // Resetear el formulario después de cancelar la edición
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
