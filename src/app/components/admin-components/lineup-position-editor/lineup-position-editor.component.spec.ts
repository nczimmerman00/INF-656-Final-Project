import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupPositionEditorComponent } from './lineup-position-editor.component';

describe('LineupPositionEditorComponent', () => {
  let component: LineupPositionEditorComponent;
  let fixture: ComponentFixture<LineupPositionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineupPositionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineupPositionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
