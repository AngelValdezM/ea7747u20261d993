import {BaseAssembler} from '../../shared/infrastructure/base-assembler';


export class ResearchCollectionAssembler implements BaseAssembler<ResearchCollection, ResearchCollectionResource, ResearchCollectionsResponse> {
  toEntitiesFromResponse = (response: ResearchCollectionsResponse): ResearchCollection[] =>
    response.researchCollections.map(resource => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: ResearchCollectionResource): ResearchCollection =>
    new ResearchCollection({
      id: Number(resource.id),
      name: resource.name,
      scientificArea: resource.scientificArea as ScientificArea
    });

  toResourceFromEntity = (entity: ResearchCollection): ResearchCollectionResource =>
    ({
      id: entity.id,
      name: entity.name,
      scientificArea: entity.scientificArea
    });
}
