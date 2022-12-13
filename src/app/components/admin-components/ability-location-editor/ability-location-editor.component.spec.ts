import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityLocationEditorComponent } from './ability-location-editor.component';

describe('AbilityLocationEditorComponent', () => {
  let component: AbilityLocationEditorComponent;
  let fixture: ComponentFixture<AbilityLocationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilityLocationEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilityLocationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
