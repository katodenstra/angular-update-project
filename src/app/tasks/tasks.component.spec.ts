import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { NewTaskData } from './task/task.model';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent],
      providers: [TasksService],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    component.userId = 'u1';
    component.name = 'Test User';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tasksService.getUserTasks with userId', () => {
    spyOn(tasksService, 'getUserTasks').and.returnValue([]);
    component.userId = 'u2';
    fixture.detectChanges();
    expect(component.selectedUserTasks).toEqual([]);
    expect(tasksService.getUserTasks).toHaveBeenCalledWith('u2');
  });

  it('should set isAddingTask to true when onStartAddTask is called', () => {
    component.isAddingTask = false;
    component.onStartAddTask();
    expect(component.isAddingTask).toBeTrue();
  });

  it('should set isAddingTask to false when onCloseAddTask is called', () => {
    component.isAddingTask = true;
    component.onCloseAddTask();
    expect(component.isAddingTask).toBeFalse();
  });

  it('should set isAddingTask to false when onAddTask is called', () => {
    component.isAddingTask = true;
    const taskData: NewTaskData = {
      title: 'New Task',
      summary: 'Summary',
      dueDate: '2025-12-31',
    };
    component.onAddTask(taskData);
    expect(component.isAddingTask).toBeFalse();
  });

  it('should emit addTask event when onAddTask is called', () => {
    spyOn(component.addTask, 'emit');
    const taskData: NewTaskData = {
      title: 'New Task',
      summary: 'Summary',
      dueDate: '2025-12-31',
    };
    component.onAddTask(taskData);
    expect(component.addTask.emit).toHaveBeenCalled();
  });
});
