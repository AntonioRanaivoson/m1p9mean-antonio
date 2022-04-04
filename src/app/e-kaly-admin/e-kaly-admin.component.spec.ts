import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyAdminComponent } from './e-kaly-admin.component';

describe('EKalyAdminComponent', () => {
  let component: EKalyAdminComponent;
  let fixture: ComponentFixture<EKalyAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
