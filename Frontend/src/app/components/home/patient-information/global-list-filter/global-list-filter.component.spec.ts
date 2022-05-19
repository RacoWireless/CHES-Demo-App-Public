import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalListFilterComponent } from './global-list-filter.component';

describe('GlobalListFilterComponent', () => {
  let component: GlobalListFilterComponent;
  let fixture: ComponentFixture<GlobalListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
