import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoefficientPage } from './coefficient.page';

describe('CoefficientPage', () => {
  let component: CoefficientPage;
  let fixture: ComponentFixture<CoefficientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoefficientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoefficientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
