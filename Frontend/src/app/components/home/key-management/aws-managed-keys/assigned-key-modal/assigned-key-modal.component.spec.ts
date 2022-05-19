import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedKeyModalComponent } from './assigned-key-modal.component';

describe('AssignedKeyModalComponent', () => {
  let component: AssignedKeyModalComponent;
  let fixture: ComponentFixture<AssignedKeyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedKeyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedKeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
