import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FavoritePageComponent } from './favorite-page.component';
import { PlayListHeaderComponent } from '../../../../shared/components/play-list-header/play-list-header.component';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';
import { OrderListPipe } from '../../../../shared/pipe/order-list.pipe'; 

describe('FavoritePageComponent', () => {
  let component: FavoritePageComponent;
  let fixture: ComponentFixture<FavoritePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FavoritePageComponent, PlayListHeaderComponent, PlayListBodyComponent, OrderListPipe], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
