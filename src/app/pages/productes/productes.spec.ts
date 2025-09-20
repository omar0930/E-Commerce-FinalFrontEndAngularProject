import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productes } from './productes';

describe('Productes', () => {
  let component: Productes;
  let fixture: ComponentFixture<Productes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
