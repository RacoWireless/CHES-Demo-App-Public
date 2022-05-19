import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadKeyComponent } from './download-key.component';

describe('DownloadKeyComponent', () => {
  let component: DownloadKeyComponent;
  let fixture: ComponentFixture<DownloadKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
