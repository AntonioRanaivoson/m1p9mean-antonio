import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsCommandesComponent } from './restaurants-commandes.component';

describe('RestaurantsCommandesComponent', () => {
  let component: RestaurantsCommandesComponent;
  let fixture: ComponentFixture<RestaurantsCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
