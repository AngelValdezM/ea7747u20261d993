import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReservationCollection} from '../domain/model/reservation-collection.entity';
import {ResearchCollectionsResponse, ReservationCollectionResource} from './reservation-collections-response';


export class ReservationCollectionsApiEndpoint extends BaseApiEndpoint<ReservationCollection, ReservationCollectionResource, ResearchCollectionsResponse, ReservationAssembler> {
    constructor(http: HttpClient) {
    super(http, `${environment.researchApiBaseUrl}${environment.researchCollectionsEndpointPath}`, new ResearchCollectionAssembler());
  }
}
