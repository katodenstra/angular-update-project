import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TasksService } from '../tasks.service';
import { Task } from './task.model';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let tasksService: TasksService;

  const mockTask: Task = {
    id: 't1',
    userId: 'u1',
    title: 'Test Task',
    summary: 'Test Summary',
    dueDate: '2025-12-31',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [TasksService],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tasksService.removeTask with the correct id when onCompleteTask is called', () => {
    spyOn(tasksService, 'removeTask');
    component.onCompleteTask();
    expect(tasksService.removeTask).toHaveBeenCalledWith('t1');
  });

  it('should have the correct task input', () => {
    expect(component.task).toEqual(mockTask);
  });
});
