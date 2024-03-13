import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticatedComponent } from './authenticated.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('AuthenticatedComponent', () => {
  let component: AuthenticatedComponent;
  let fixture: ComponentFixture<AuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedComponent, RouterModule],
      providers: [{ provide: ActivatedRoute, useValue: [] }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
