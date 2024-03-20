import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPalavrasComponent } from './tela-palavras.component';

describe('TelaPalavrasComponent', () => {
  let component: TelaPalavrasComponent;
  let fixture: ComponentFixture<TelaPalavrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaPalavrasComponent]
    });
    fixture = TestBed.createComponent(TelaPalavrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
