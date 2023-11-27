import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotfundPage } from './notfund.page';

describe('NotfundPage', () => {
  let component: NotfundPage;
  let fixture: ComponentFixture<NotfundPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotfundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
