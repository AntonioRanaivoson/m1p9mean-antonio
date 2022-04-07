import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyAdminCommandesComponent } from './e-kaly-admin-commandes.component';

describe('EKalyAdminCommandesComponent', () => {
  let component: EKalyAdminCommandesComponent;
  let fixture: ComponentFixture<EKalyAdminCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyAdminCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyAdminCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
