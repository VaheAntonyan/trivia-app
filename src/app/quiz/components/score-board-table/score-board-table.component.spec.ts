import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardTableComponent } from './score-board-table.component';

describe('ScoreBoardTableComponent', () => {
  let component: ScoreBoardTableComponent;
  let fixture: ComponentFixture<ScoreBoardTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreBoardTableComponent]
    });
    fixture = TestBed.createComponent(ScoreBoardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
