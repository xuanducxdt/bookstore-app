import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookFormDialogComponent } from './add-book-form-dialog.component';

describe('AddBookFormDialogComponent', () => {
  let component: AddBookFormDialogComponent;
  let fixture: ComponentFixture<AddBookFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
