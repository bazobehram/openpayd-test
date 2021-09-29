import { LaunchListState } from "../reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const getLaunchDetailsState = createFeatureSelector<LaunchListState>(
  "launchDetails"
);

export const getLaunchDetails = createSelector(
  getLaunchDetailsState,
  (state: any) => {
    return state.data;
  }
);

export const getLaunchDetailsLoaded = createSelector(
  getLaunchDetailsState,
  (state: any) => state.loaded
);

export const getLaunchDetailsLoading = createSelector(
  getLaunchDetailsState,
  (state: any) => state.loading
);