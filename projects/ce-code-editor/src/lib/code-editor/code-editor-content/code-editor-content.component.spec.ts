import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorContentComponent } from './code-editor-content.component';

describe('CodeEditorContentComponent', () => {
  let component: CodeEditorContentComponent;
  let fixture: ComponentFixture<CodeEditorContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEditorContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEditorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
