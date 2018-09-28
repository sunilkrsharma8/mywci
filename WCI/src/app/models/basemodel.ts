export class BaseModel<T> {
    constructor(data?: Partial<T>) {
        Object.assign(this, data);
    }
}
