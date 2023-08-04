import { Component, Input } from '@angular/core';
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
    this.getTracks();
  }

  getTracks(): void {
    this.tracksService.getAllTracks$().subscribe(
      (data: TrackModel[]) => {
        this.tracks = data;
      },
      (error) => {
        console.error('Error al obtener las canciones', error);
      }
    );
  }

  onAddTrack(event: Event, form: NgForm): void {
    event.preventDefault();
    if (!this.isEditing) {
      this.addTrack(form);
    } else {
      this.saveOrCancelEdit(form);
    }
  }

  private addTrack(form: NgForm): void {
    this.adminService.addTrack$(this.newTrack).subscribe(
      (response) => {
        console.log('Canción agregada:', response);
        this.clearFormAndRefresh(form);
      },
      (error) => {
        console.error('Error agregando track:', error);
      }
    );
  }

  private saveOrCancelEdit(form: NgForm): void {
    if (this.isEditing && this.selectedTrack) {
      this.selectedTrack.name = this.newTrack.name;
      this.adminService.updateTrack$(this.selectedTrack).subscribe(
        (response) => {
          console.log('Canción actualizada:', response);
          this.clearFormAndRefresh(form);
        },
        (error) => {
          console.error('Error editando:', error);
        }
      );
    }
    this.isEditing = false; // Salir del modo de edición
    this.selectedTrack = undefined;
  }

  private clearFormAndRefresh(form: NgForm): void {
    form.resetForm();
    this.newTrack = { name: '', album: '', cover: '', url: '', uid: '' };
    this.getTracks();
    this.isEditing = false; // Asegurarse de que isEditing sea falso
  }

  onEditTrack(track: TrackModel): void {
    this.selectedTrack = track;
    this.newTrack = { ...track };
    this.isEditing = true;
  }

  onDeleteTrack(uid: string): void {
    this.adminService.deleteTrack$(uid).subscribe(
      (response) => {
        console.log('Track borrado:', response);
        this.getTracks(); // Refrescar la lista de canciones después de eliminar una canción
      },
      (error) => {
        console.error('Error borrando track:', error);
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
