import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewapiComponent } from './newapi.component';

describe('NewapiComponent', () => {
  let component: NewapiComponent;
  let fixture: ComponentFixture<NewapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
