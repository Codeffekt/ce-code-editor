import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObjectBlockComponent } from './form-object-block.component';

describe('FormObjectBlockComponent', () => {
  let component: FormObjectBlockComponent;
  let fixture: ComponentFixture<FormObjectBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormObjectBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormObjectBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
