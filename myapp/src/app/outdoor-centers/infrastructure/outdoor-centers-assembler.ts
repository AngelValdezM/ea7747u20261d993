import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {OutdoorCentersRecord} from '../domain/model/outdoor-centers.entity';
import {OutdoorRecordResource, OutdoorRecordsResponse} from './outdoor-centers-response';
import {ActivitiesType} from '../domain/model/activity-type';

export class OutdoorCentersAssembler implements BaseAssembler<OutdoorCentersRecord, OutdoorRecordResource, OutdoorRecordsResponse> {
  toEntitiesFromResponse = (response: OutdoorRecordsResponse): OutdoorCentersRecord[] =>
    (response.resultList?.result ?? []).map(resource => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: OutdoorRecordResource): OutdoorCentersRecord =>
    new OutdoorCentersRecord({
      id: String(resource.id),
      name: resource.name,
      activityType: resource.activityType as ActivitiesType,
      capacity: Number(resource.capacity),
      latitude: Number(resource.latitude),
      longitude: Number(resource.longitude),
    });

  toResourceFromEntity = (entity: OutdoorCentersRecord): OutdoorRecordResource =>
    ({
      id: entity.id,
      name: entity.name,
      activityType: entity.activityType,
      capacity: entity.capacity,
      latitude: entity.latitude,
      longitude: entity.longitude
    });
}
