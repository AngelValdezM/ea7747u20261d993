import {BaseEntity} from '../../../shared/domain/model/base-entity';


export class ReservationCollection implements BaseEntity{
  readonly #id: number;
  readonly #outdoorCenterId: number;
  readonly #activityType: string;
  readonly #participantName: string;
  readonly #participants: number;
  readonly #weatherTemperature: number;
  readonly #reservedAt: Date;

  constructor(props: {id: number; outdoorCenterId: number; activityType: string; participantName: string; participants: number; weatherTemperature: number; reservedAt: Date;}) {
    this.#id = props.id;
    this.#outdoorCenterId = props.outdoorCenterId;
    this.#activityType = props.activityType;
    this.#participantName = props.participantName;
    this.#participants =props.participants;
    this.#weatherTemperature = props.weatherTemperature;
    this.#reservedAt = props.reservedAt;
  }

  get id(): number {
    return this.#id;
  }

  get outdoorCenterId(): number {
    return this.#outdoorCenterId;
  }

  get activityType(): string {
    return this.activityType;
  }

  get participantName(): string {
    return this.participantName;
  }

  get participants(): number{
    return this.participants;
  }

  get weatherTemperature(): number{
    return this.weatherTemperature;
  }

  get reservedAt(): Date{
    return this.reservedAt;
  }
}
