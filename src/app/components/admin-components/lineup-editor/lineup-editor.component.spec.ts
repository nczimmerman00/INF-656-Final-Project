import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupEditorComponent } from './lineup-editor.component';

describe('LineupEditorComponent', () => {
  let component: LineupEditorComponent;
  let fixture: ComponentFixture<LineupEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineupEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
