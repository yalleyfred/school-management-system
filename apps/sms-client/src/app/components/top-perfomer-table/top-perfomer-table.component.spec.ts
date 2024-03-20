import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPerfomerTableComponent } from './top-perfomer-table.component';

describe('TopPerfomerTableComponent', () => {
  let component: TopPerfomerTableComponent;
  let fixture: ComponentFixture<TopPerfomerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPerfomerTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopPerfomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
