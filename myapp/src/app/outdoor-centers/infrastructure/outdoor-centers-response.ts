import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface OutdoorRecordResource extends BaseResource {
  id: string;
  name: string;
  activityType?: string;
  capacity?: number;
  latitude: number;
  longitude: number;
}

export interface OutdoorRecordsResponse extends BaseResponse {
  resultList: {
    result: OutdoorRecordResource[];
  };
}
