import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFounnd } from './not-founnd';

describe('NotFounnd', () => {
  let component: NotFounnd;
  let fixture: ComponentFixture<NotFounnd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFounnd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFounnd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
