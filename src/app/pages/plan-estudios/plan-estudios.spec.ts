import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudios } from './plan-estudios';

describe('PlanEstudios', () => {
  let component: PlanEstudios;
  let fixture: ComponentFixture<PlanEstudios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEstudios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanEstudios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
