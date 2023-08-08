import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderListPipe } from '../../pipe/order-list.pipe'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PlayListBodyComponent } from './play-list-body.component';
import { TrackService } from '../../../modules/tracks/services/track.service';

describe('PlayListBodyComponent', () => {
  let component: PlayListBodyComponent;
  let fixture: ComponentFixture<PlayListBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayListBodyComponent, OrderListPipe], 
      imports: [HttpClientTestingModule],
      providers: [TrackService]
    });
    fixture = TestBed.createComponent(PlayListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
