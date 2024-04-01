import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPacketsOfOrgComponent } from './user-packets-of-org.component';

describe('UserPacketsOfOrgComponent', () => {
  let component: UserPacketsOfOrgComponent;
  let fixture: ComponentFixture<UserPacketsOfOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPacketsOfOrgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPacketsOfOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
