import {BaseResource} from '../../shared/infrastructure/base-response';

export interface ReservationCollectionResource extends BaseResource {
  id: number;
  outdoorCenterid: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: Date;
}

export interface ResearchCollectionsResponse extends BaseResource {
  reservationCollections: ReservationCollectionResource[];
}
