import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOginPage } from './login.page';

describe('LOginPage', () => {
  let component: LOginPage;
  let fixture: ComponentFixture<LOginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LOginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
