import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsPlatsComponent } from './restaurants-plats.component';

describe('RestaurantsPlatsComponent', () => {
  let component: RestaurantsPlatsComponent;
  let fixture: ComponentFixture<RestaurantsPlatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsPlatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsPlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
