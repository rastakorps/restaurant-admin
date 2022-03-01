import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaucerItemNormalComponent } from './saucer-item-normal.component';

describe('SaucerItemNormalComponent', () => {
  let component: SaucerItemNormalComponent;
  let fixture: ComponentFixture<SaucerItemNormalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaucerItemNormalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaucerItemNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
