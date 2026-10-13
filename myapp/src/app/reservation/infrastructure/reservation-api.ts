import {inject, Service} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReservationItem} from '../domain/model/reservation-item.entity';
import {OutdoorRecordsApiEndpoint} from '../../outdoor-centers/infrastructure/outdoor-centers-api-endpoint';


@Service()
export class ReservationApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly researchCollectionsEndpoint = new OutdoorRecordsApiEndpoint(this.http);
  private readonly researchItemsEndpoint = new OutdoorRecordsApiEndpoint(this.http);

  getResearchCollections = (): Observable<ResearchCollection[]> =>
    this.researchCollectionsEndpoint.getAll();

  getResearchItems = (): Observable<ReservationItem[]> =>
    this.researchItemsEndpoint.getAll();

  createResearchItem = (researchItem: ReservationItem): Observable<ReservationItem> =>
    this.researchItemsEndpoint.create(researchItem);
}
