import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCreateKeyComponent } from './aws-create-key.component';

describe('AwsCreateKeyComponent', () => {
  let component: AwsCreateKeyComponent;
  let fixture: ComponentFixture<AwsCreateKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwsCreateKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsCreateKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
