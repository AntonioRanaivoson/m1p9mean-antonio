import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsAjoutPlatComponent } from './restaurants-ajout-plat.component';

describe('RestaurantsAjoutPlatComponent', () => {
  let component: RestaurantsAjoutPlatComponent;
  let fixture: ComponentFixture<RestaurantsAjoutPlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsAjoutPlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsAjoutPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
