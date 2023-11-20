import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationsComponent } from './participations.component';

describe('ParticipantsComponent', () => {
  let component: ParticipationsComponent;
  let fixture: ComponentFixture<ParticipationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipationsComponent]
    });
    fixture = TestBed.createComponent(ParticipationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
