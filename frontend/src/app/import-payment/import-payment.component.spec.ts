import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPaymentComponent } from './import-payment.component';

describe('ImportPaymentComponent', () => {
  let component: ImportPaymentComponent;
  let fixture: ComponentFixture<ImportPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
