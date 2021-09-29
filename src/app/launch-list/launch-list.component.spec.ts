import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { RelativeTimePipe } from '../core/helpers/pipes/relative-time/relative-time.pipe';
import { launchReducers } from '../store';

import { LaunchListComponent } from './launch-list.component';

describe('LaunchListComponent', () => {
  let component: LaunchListComponent;
  let fixture: ComponentFixture<LaunchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchListComponent, RelativeTimePipe ],
        imports: [
        RouterModule,
        MatCardModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot(launchReducers)
      ],
      providers: [Apollo]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
