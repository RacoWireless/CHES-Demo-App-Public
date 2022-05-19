import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsManagedKeysComponent } from './aws-managed-keys.component';

describe('AwsManagedKeysComponent', () => {
  let component: AwsManagedKeysComponent;
  let fixture: ComponentFixture<AwsManagedKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwsManagedKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsManagedKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
