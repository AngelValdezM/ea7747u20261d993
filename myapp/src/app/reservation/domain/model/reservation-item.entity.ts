import {ActivitiesType} from '../../../outdoor-centers/domain/model/activity-type';
import {BaseEntity} from '../../../shared/domain/model/base-entity';

export interface ReservationItemProps {
  id: number;
  outdoorCenterId: number;
  activityType: ActivitiesType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: Date;
}

export  class ReservationItem implements BaseEntity {
  readonly #id: number;
  readonly #outdoorCenterId: number;
  readonly #activityType: ActivitiesType;
  readonly #participantName: string;
  readonly #participants: number;
  readonly #weatherTemperature: number;
  readonly #reservedAt: Date;

  constructor(props: ReservationItemProps) {
    this.#id = props.id;
    this.#outdoorCenterId = props.outdoorCenterId;
    this.#activityType = props.activityType;
    this.#participantName = props.participantName;
    this.#participants = props.participants;
    this.#weatherTemperature = props.weatherTemperature;
    this.#reservedAt = props.reservedAt;

  }

  get id(): number{
    return this.#id;
  }

  get outdoorCenterId(): number{
    return this.#outdoorCenterId;
  }

  get activityType(): ActivitiesType{
    return this.#activityType;
  }

  get participantName(): string{
    return this.#participantName;
  }

  get participants(): number{
    return this.#participants;
  }

  get weatherTemperature(): number{
    return this.#weatherTemperature;
  }

  get reservedAt(): Date{
    return this.#reservedAt;
  }
}
