import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DasboardComponent } from './dasboard.component';
import { DashboardTileComponent } from '../../components/dashboard-tile/dashboard-tile.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';

describe('DasboardComponent', () => {
  let component: DasboardComponent;
  let fixture: ComponentFixture<DasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardComponent, DashboardTileComponent, CalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
