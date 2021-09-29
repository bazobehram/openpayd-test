import { LaunchDetailsGQL, LaunchDetailsQueryVariables } from "../../services/spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadLaunchDetails,
  loadLaunchDetailsFail,
  loadLaunchDetailsSuccess
} from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()

export class LaunchDetailsEffects {
  constructor(
    private actions$: Actions,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) { }

  loadLaunchDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLaunchDetails),
      switchMap((action: any) => {
        let id = { id: action.id };
        return this.launchDetailsService.fetch(id).pipe(
          map((response: any) =>
            loadLaunchDetailsSuccess({
              payload: response.data.launch as any
            })
          ),
          catchError(error => of(loadLaunchDetailsFail(error)))
        )
      }
      )
    )
  );
}
