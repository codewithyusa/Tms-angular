import { inject } from "@angular/core";

import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from "@ngrx/signals";

import {
  removeEntity,
  setAllEntities,
  withEntities,
} from "@ngrx/signals/entities";

import { catchError, EMPTY } from "rxjs";

import { Course } from "../models/course.model";
import { CourseService } from "../services/course.service";

type CourseState = {
  error: string | null;
};

export const CourseStore = signalStore(
  { providedIn: "root" },

  withState<CourseState>({
    error: null,
  }),

  withEntities<Course>(),

  withMethods((store, svc = inject(CourseService)) => ({
    deleteCourse(id: number): void {
      // 1. Snapshot BEFORE modifying the store
      const previousSnapshot = store.entities();

      // 2. Optimistically remove the course from the UI
      patchState(store, removeEntity(id));

      // 3. Delete the course on the server
      svc.delete(id).pipe(
        catchError(() => {
          // 4. Server rejected deletion → restore snapshot
          patchState(store, setAllEntities(previousSnapshot));

          patchState(store, {
            error: "Cannot delete course: active student enrollments exist.",
          });

          return EMPTY;
        })
      ).subscribe();
    },
  }))
);