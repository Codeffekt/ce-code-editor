import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CeCodeMirrorComponent } from './code-mirror.component';

describe('CodeMirrorComponent', () => {
  let component: CeCodeMirrorComponent;
  let fixture: ComponentFixture<CeCodeMirrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CeCodeMirrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeCodeMirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
