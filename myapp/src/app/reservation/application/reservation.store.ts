import {computed, inject, Service, signal} from '@angular/core';
import {ReservationApi} from '../infrastructure/reservation-api';
import {ReservationItem} from '../domain/model/reservation-item.entity';
import {ActivitiesType} from '../../outdoor-centers/domain/model/activity-type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {forkJoin} from 'rxjs';


@Service()
export class ReservationStore {
  private readonly reservationApi = inject(ReservationApi);

  private readonly collectionsSignal = signal<[]>([]);
  readonly collections = this.collectionsSignal.asReadonly();

  private readonly itemsSignal = signal<ReservationItem[]>([]);

  readonly researchItems = computed(() =>
    this.itemsSignal()
      .map(item => item.withCollection(this.findCollectionById(item.collectionId)))
      .sort((a, b) => b.registeredAt.getTime() - a.registeredAt.getTime())
  );

  readonly researchItemCount = computed(() => this.itemsSignal().length);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly savingSignal = signal<boolean>(false);
  readonly saving = this.savingSignal.asReadonly();

  private readonly errorKeySignal = signal<string | null>(null);
  readonly errorKey = this.errorKeySignal.asReadonly();

  constructor() {
    this.loadResearchData();
  }

  clearError = (): void =>
    this.errorKeySignal.set(null);

  findCollectionByActivity = (activityType: ActivitiesType): ResearchCollection | undefined =>
    this.collectionsSignal().find(collection => collection.activityType === activityType);

  isRecordRegistered = (activityType: ActivitiesType, recordId: string): boolean => {
    const collection = this.findCollectionByActivity(activityType);
    return !!collection && this.itemsSignal().some(item =>
      item.collectionId === collection.id && item.recordId === recordId);
  };

  registerResearchItem = (activityType: ActivitiesType, record: ResearchRecord, onRegistered: () => void): void => {
    this.errorKeySignal.set(null);
    const collection = this.findCollectionByActivity(activityType);
    if (!collection) {
      this.errorKeySignal.set('error-collection-not-found');
      return;
    }
    if (this.isRecordRegistered(activityType, record.id)) {
      this.errorKeySignal.set('error-duplicate-record');
      return;
    }
    const researchItem = new ReservationItem({
      id: 0,
      collectionId: collection.id,
      scientificArea,
      recordId: record.id,
      recordTitle: record.title,
      journalTitle: record.journalTitle,
      publicationYear: record.publicationYear,
      registeredAt: new Date()
    });
    this.savingSignal.set(true);
    this.reservationApi.createResearchItem(researchItem).subscribe({
      next: createdItem => {
        this.itemsSignal.update(items => [...items, createdItem]);
        this.savingSignal.set(false);
        onRegistered();
      },
      error: () => {
        this.errorKeySignal.set('error-create-research-item');
        this.savingSignal.set(false);
      }
    });
  };

  private findCollectionById = (collectionId: number): ResearchCollection | null =>
    this.collectionsSignal().find(collection => collection.id === collectionId) ?? null;

  private loadResearchData = (): void => {
    this.loadingSignal.set(true);
    this.errorKeySignal.set(null);
    forkJoin({
      collections: this.reservationApi.getResearchCollections(),
      items: this.reservationApi.getResearchItems()
    }).pipe(takeUntilDestroyed()).subscribe({
      next: ({collections, items}) => {
        this.collectionsSignal.set(collections);
        this.itemsSignal.set(items);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorKeySignal.set('error-load-research-data');
        this.loadingSignal.set(false);
      }
    });
  };
}
