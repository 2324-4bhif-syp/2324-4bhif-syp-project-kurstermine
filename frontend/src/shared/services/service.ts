export abstract class Service<T> {
    protected constructor(items: T[] = []) {
        this.items = items;
    }

    public items: T[] = [];

    get(predicate?: ((item: T) => boolean) | undefined): T[] {
        if (predicate) return this.get().filter(predicate);
        return this.items;
    }
    add(...items: T[]): void {
        this.items.push(...items);
    }
    remove(item: number | T): void {
        this.items.splice(
            typeof item === 'number' ? item : this.items.indexOf(item),
            1,
        );
    }
    update(index: number, item: T): void {
        this.items[index] = item;
    }
}
