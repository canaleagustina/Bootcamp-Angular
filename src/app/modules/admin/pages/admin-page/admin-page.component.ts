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
  optionSort: { property: string | null, order: string } = { property: null, order: 'asc' };
  newTrack: TrackModel = { name: '', album: '', cover: '', url: '', uid: '' };

  constructor(private tracksService: TrackService, private adminService: AdminService) { }

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
    this.adminService.addTrack$(this.newTrack).subscribe(
      (response) => {
        console.log('Track added successfully:', response);
        this.newTrack = { name: '', album: '', cover: '', url: '', uid: '' };
        this.fetchTracksFromApi(); // Refresh the track list after adding a new track
      },
      (error) => {
        console.error('Error adding track:', error);
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
