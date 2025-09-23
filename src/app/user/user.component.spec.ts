import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { User } from './user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const mockUser: User = {
    id: 'u1',
    avatar: 'avatar1.png',
    name: 'Test User',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    component.selected = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct user input', () => {
    expect(component.user).toEqual(mockUser);
  });

  it('should have the correct selected input', () => {
    expect(component.selected).toBeFalse();
    component.selected = true;
    expect(component.selected).toBeTrue();
  });

  it('should return correct imagePath', () => {
    expect(component.imagePath).toBe('assets/users/avatar1.png');
  });

  it('should emit select event with user id when onSelectUser is called', () => {
    spyOn(component.select, 'emit');
    component.onSelectUser();
    expect(component.select.emit).toHaveBeenCalledWith('u1');
  });
});
