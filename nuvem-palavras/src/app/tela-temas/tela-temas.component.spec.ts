import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaTemasComponent } from './tela-temas.component';

describe('TelaTemasComponent', () => {
  let component: TelaTemasComponent;
  let fixture: ComponentFixture<TelaTemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaTemasComponent]
    });
    fixture = TestBed.createComponent(TelaTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
