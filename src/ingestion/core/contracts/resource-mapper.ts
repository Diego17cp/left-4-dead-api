export interface ResourceMapper<TResource, TAggregate> {
  map(resource: TResource): Promise<TAggregate> | TAggregate;
}