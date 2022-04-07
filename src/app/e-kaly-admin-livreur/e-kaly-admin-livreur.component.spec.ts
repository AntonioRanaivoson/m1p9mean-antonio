import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyAdminLivreurComponent } from './e-kaly-admin-livreur.component';

describe('EKalyAdminLivreurComponent', () => {
  let component: EKalyAdminLivreurComponent;
  let fixture: ComponentFixture<EKalyAdminLivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyAdminLivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyAdminLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
