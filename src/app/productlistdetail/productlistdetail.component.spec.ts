import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistdetailComponent } from './productlistdetail.component';

describe('ProductlistdetailComponent', () => {
  let component: ProductlistdetailComponent;
  let fixture: ComponentFixture<ProductlistdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductlistdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
