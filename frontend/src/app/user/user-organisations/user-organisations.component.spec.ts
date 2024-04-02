import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganisationsComponent } from './user-organisations.component';

describe('UserOrganisationsComponent', () => {
  let component: UserOrganisationsComponent;
  let fixture: ComponentFixture<UserOrganisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrganisationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
