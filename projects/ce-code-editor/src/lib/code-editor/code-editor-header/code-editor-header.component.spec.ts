import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorHeaderComponent } from './code-editor-header.component';

describe('CodeEditorHeaderComponent', () => {
  let component: CodeEditorHeaderComponent;
  let fixture: ComponentFixture<CodeEditorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEditorHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEditorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
