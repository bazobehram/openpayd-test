import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { launchReducers } from '../store';

import { LaunchDetailsFacadeService } from './launch-details-facade.service';

describe('LaunchDetailsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [StoreModule.forRoot(launchReducers)],
    providers: [Apollo]
  }));

  it('should be created', () => {
    const service: LaunchDetailsFacadeService = TestBed.get(LaunchDetailsFacadeService);
    expect(service).toBeTruthy();
  });
});
