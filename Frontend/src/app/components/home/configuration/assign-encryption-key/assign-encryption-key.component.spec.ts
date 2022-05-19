import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEncryptionKeyComponent } from './assign-encryption-key.component';

describe('AssignEncryptionKeyComponent', () => {
  let component: AssignEncryptionKeyComponent;
  let fixture: ComponentFixture<AssignEncryptionKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEncryptionKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEncryptionKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
