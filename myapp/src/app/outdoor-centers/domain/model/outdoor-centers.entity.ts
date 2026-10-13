import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class OutdoorCentersRecord implements BaseEntity {
  readonly #id: string;
  readonly #name: string;
  readonly #activityType: string;
  readonly #capacity: number;
  readonly #latitude: number;
  readonly #longitude: number;

  constructor(props: {
    id: string;
    name: string;
    activityType: string;
    capacity: number;
    latitude: number;
    longitude: number
  }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#activityType = props.activityType;
    this.#capacity = props.capacity;
    this.#latitude = props.latitude;
    this.#longitude = props.longitude;
  }

  get id(): string {
    return this.#id;
  }

  get name(): string{
    return this.#name;
  }

  get activityType(): string {
    return this.#activityType;
  }

  get capacity(): number{
    return this.#capacity;
  }

  get latitude(): number{
    return this.#latitude;
  }

  get longitude(): number{
    return this.#longitude;
  }
}
