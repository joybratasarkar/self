import { TestBed } from '@angular/core/testing';

import { BroadcastInterceptor } from './broadcast.interceptor';

describe('BroadcastInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BroadcastInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BroadcastInterceptor = TestBed.inject(BroadcastInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
