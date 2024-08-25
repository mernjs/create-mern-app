import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingViewComponent } from './drawing-view.component';

describe('DrawingViewComponent', () => {
  let component: DrawingViewComponent;
  let fixture: ComponentFixture<DrawingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
