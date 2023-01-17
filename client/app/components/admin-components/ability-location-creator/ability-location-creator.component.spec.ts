import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityLocationCreatorComponent } from './ability-location-creator.component';

describe('AbilityLocationCreatorComponent', () => {
  let component: AbilityLocationCreatorComponent;
  let fixture: ComponentFixture<AbilityLocationCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilityLocationCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilityLocationCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
