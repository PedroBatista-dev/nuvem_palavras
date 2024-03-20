import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPerguntaComponent } from './tela-pergunta.component';

describe('TelaPerguntaComponent', () => {
  let component: TelaPerguntaComponent;
  let fixture: ComponentFixture<TelaPerguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaPerguntaComponent]
    });
    fixture = TestBed.createComponent(TelaPerguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
