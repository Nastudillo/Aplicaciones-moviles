import { TestBed } from '@angular/core/testing';

import { IniciarService } from './iniciar.service';

describe('IniciarService', () => {
  let service: IniciarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniciarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
