import {inject, Service} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {HttpClient} from '@angular/common/http';
import {OutdoorRecordsApiEndpoint} from './outdoor-centers-api-endpoint';
import {ActivitiesType} from '../domain/model/activity-type';
import {Observable} from 'rxjs';
import {OutdoorCentersRecord} from '../domain/model/outdoor-centers.entity';


@Service()
export class ActivityTypeApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly researchRecordsEndpoint = new OutdoorRecordsApiEndpoint(this.http);

  searchResearchRecords = (activityType: ActivitiesType): Observable<OutdoorCentersRecord[]> =>
    this.researchRecordsEndpoint.searchByActivityType(activityType);
}
