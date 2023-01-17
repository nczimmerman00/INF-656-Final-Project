import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupPositionCreatorComponent } from './lineup-position-creator.component';

describe('LineupPositionCreatorComponent', () => {
  let component: LineupPositionCreatorComponent;
  let fixture: ComponentFixture<LineupPositionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineupPositionCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineupPositionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
