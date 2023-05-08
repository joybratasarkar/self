import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAServerDialogComponent } from './create-a-server-dialog.component';

describe('CreateAServerDialogComponent', () => {
  let component: CreateAServerDialogComponent;
  let fixture: ComponentFixture<CreateAServerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAServerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
