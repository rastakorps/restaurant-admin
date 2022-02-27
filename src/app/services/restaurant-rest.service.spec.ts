import { TestBed } from '@angular/core/testing';

import { RestaurantRestService } from './restaurant-rest.service';

describe('RestaurantRestService', () => {
  let service: RestaurantRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
