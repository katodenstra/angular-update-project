import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskComponent } from './new-task.component';
import { TasksService } from '../tasks.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskComponent, FormsModule],
      providers: [TasksService],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    component.userId = 'u1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when onCancel is called', () => {
    spyOn(component.close, 'emit');
    component.onCancel();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call tasksService.addTask and emit close on submit', () => {
    spyOn(tasksService, 'addTask');
    spyOn(component.close, 'emit');
    component.enteredTitle = 'Test Task';
    component.enteredSummary = 'Test Summary';
    component.enteredDueDate = '2025-12-31';

    component.onSubmit();

    expect(tasksService.addTask).toHaveBeenCalledWith(
      {
        title: 'Test Task',
        summary: 'Test Summary',
        dueDate: '2025-12-31',
      },
      'u1'
    );
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should bind input fields to component properties', () => {
    const titleInput = fixture.debugElement.query(
      By.css('input[name="title"]')
    );
    const summaryInput = fixture.debugElement.query(
      By.css('textarea[name="summary"]')
    );
    const dueDateInput = fixture.debugElement.query(
      By.css('input[name="due-date"]')
    );

    titleInput.nativeElement.value = 'My Title';
    titleInput.nativeElement.dispatchEvent(new Event('input'));
    summaryInput.nativeElement.value = 'My Summary';
    summaryInput.nativeElement.dispatchEvent(new Event('input'));
    dueDateInput.nativeElement.value = '2025-01-01';
    dueDateInput.nativeElement.dispatchEvent(new Event('input'));

    // Update bindings
    fixture.detectChanges();

    expect(component.enteredTitle).toBe('My Title');
    expect(component.enteredSummary).toBe('My Summary');
    expect(component.enteredDueDate).toBe('2025-01-01');
  });
});
