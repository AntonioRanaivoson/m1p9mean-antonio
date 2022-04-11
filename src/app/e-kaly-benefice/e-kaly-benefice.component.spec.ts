import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyBeneficeComponent } from './e-kaly-benefice.component';

describe('EKalyBeneficeComponent', () => {
  let component: EKalyBeneficeComponent;
  let fixture: ComponentFixture<EKalyBeneficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyBeneficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyBeneficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
