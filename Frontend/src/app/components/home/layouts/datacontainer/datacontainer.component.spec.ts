import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacontainerComponent } from './datacontainer.component';

describe('DatacontainerComponent', () => {
  let component: DatacontainerComponent;
  let fixture: ComponentFixture<DatacontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatacontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
