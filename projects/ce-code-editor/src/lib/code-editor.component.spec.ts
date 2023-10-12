import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CeCodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CeCodeEditorComponent;
  let fixture: ComponentFixture<CeCodeEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CeCodeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
