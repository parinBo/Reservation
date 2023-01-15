import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgOneComponent } from './bg-one.component';

describe('BgOneComponent', () => {
  let component: BgOneComponent;
  let fixture: ComponentFixture<BgOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BgOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
