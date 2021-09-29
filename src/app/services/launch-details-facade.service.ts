import { LaunchListState } from "../store/reducers/launch-list.reducer";
import { map } from "rxjs/operators";
import { LaunchDetailsGQL } from "./spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadLaunchDetails, loadLaunchList } from "../store/actions";
import * as launchDetailsQuery from "../store/selectors";

@Injectable({
  providedIn: "root"
})
export class LaunchDetailsFacadeService {
  launchDetailsState$ = this.store.select(launchDetailsQuery.getLaunchDetailsState);
  launchDetails$ = this.store.select(launchDetailsQuery.getLaunchDetails);
  launchDetailsLoaded$ = this.store.select(launchDetailsQuery.getLaunchDetailsLoaded);
  launchDetailsLoading$ = this.store.select(launchDetailsQuery.getLaunchDetailsLoading);

  constructor(
    private readonly store: Store<LaunchListState>,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}

  launchDetailsStoreCache(id: string) {
    this.store.dispatch(loadLaunchDetails({ id }));
    return this.launchDetails$;
  }

  launchDetailsFacade(id: string) {
    return this.launchDetailsService
      .fetch({id})
      .pipe(map(res => res.data.launch));
  }
}
