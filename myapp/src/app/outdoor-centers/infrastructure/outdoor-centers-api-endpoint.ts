import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {OutdoorCentersRecord} from '../domain/model/outdoor-centers.entity';
import {OutdoorRecordResource, OutdoorRecordsResponse} from './outdoor-centers-response';
import {OutdoorCentersAssembler} from './outdoor-centers-assembler';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivitiesType} from '../domain/model/activity-type';
import {catchError, map, Observable} from 'rxjs';


export class OutdoorRecordsApiEndpoint extends BaseApiEndpoint<OutdoorCentersRecord, OutdoorRecordResource, OutdoorRecordsResponse, OutdoorCentersAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.ApiBaseUrl}${environment.researchCollectionsEndpointPath}`, new OutdoorCentersAssembler());
  }

  searchByActivityType(activityType: ActivitiesType): Observable<OutdoorCentersRecord[]> {
    const params = new HttpParams()
      .set('query', activityType)
    return this.http.get<OutdoorRecordsResponse>(this.endpointUrl, {params}).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to search research records'))
    );
  }
}
