import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component } from '@angular/core';

// Dummy host component to test content projection
@Component({
  selector: 'test-host',
  template: `<app-card
    ><span class="test-content">Test Content</span></app-card
  >`,
  standalone: true,
  imports: [CardComponent],
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CardComponent in host', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project content', () => {
    const projected = fixture.nativeElement.querySelector('.test-content');
    expect(projected).toBeTruthy();
    expect(projected.textContent).toContain('Test Content');
  });
});
