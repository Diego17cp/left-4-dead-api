export interface Persister<TAggregate> {
	persist(entities: TAggregate[]): Promise<void>;
}