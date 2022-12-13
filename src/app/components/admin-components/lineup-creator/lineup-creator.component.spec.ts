import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupCreatorComponent } from './lineup-creator.component';

describe('LineupCreatorComponent', () => {
  let component: LineupCreatorComponent;
  let fixture: ComponentFixture<LineupCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineupCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineupCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
