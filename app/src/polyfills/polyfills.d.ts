interface Array<T> {
    find(predicate: (search: T, index?: number, list?: Array<T>) => boolean): T;
    findIndex(predicate: (search: T, index?: number, list?: Array<T>) => boolean): number;
}

interface Object {
    assign<T>(target: T, ...sources: any[]): T;
    clone<T>(obj: T): T;
}
