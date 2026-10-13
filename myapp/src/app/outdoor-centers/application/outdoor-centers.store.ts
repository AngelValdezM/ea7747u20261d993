import {inject, Service, signal} from '@angular/core';
import {ActivityTypeApi} from '../infrastructure/activity-type-api';
import {catchError, of, Subject, switchMap} from 'rxjs';
import {ActivitiesType, ACTIVITY_TYPES} from '../domain/model/activity-type';
import {OutdoorCentersRecord} from '../domain/model/outdoor-centers.entity';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Service()
export class OutdoorCentersStore {
  private readonly outdoorcentersApi = inject(ActivityTypeApi);
  private readonly activitiesSelections = new Subject<ActivitiesType | null>();

  readonly activityTypes: readonly ActivitiesType[] = ACTIVITY_TYPES;

  private readonly recordsSignal = signal<OutdoorCentersRecord[]>([]);
  readonly records = this.recordsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorKeySignal = signal<string | null>(null);
  readonly errorKey = this.errorKeySignal.asReadonly();

  constructor() {
    this.activitiesSelections.pipe(
      switchMap(area => {
        this.recordsSignal.set([]);
        this.errorKeySignal.set(null);
        if (!area) {
          this.loadingSignal.set(false);
          return of<OutdoorCentersRecord[]>([]);
        }
        this.loadingSignal.set(true);
        return this.outdoorcentersApi.searchResearchRecords(area).pipe(
          catchError(() => {
            this.errorKeySignal.set('error-load-research-records');
            return of<OutdoorCentersRecord[]>([]);
          })
        );
      }),
      takeUntilDestroyed()
    ).subscribe(records => {
      this.recordsSignal.set(records);
      this.loadingSignal.set(false);
    });
  }

  selectActivityArea = (activity: ActivitiesType | null): void =>
    this.activitiesSelections.next(activity);
}
