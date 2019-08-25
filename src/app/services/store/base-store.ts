import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';


export abstract class BaseStore<S> {
    protected subject = new BehaviorSubject<S>(null);
    protected store = this.subject.asObservable().pipe(distinctUntilChanged());

    constructor(initialState: S) {
        this.subject.next(initialState);
    }

    protected get value(): S {
        return this.subject.value;
    }

    get(key: keyof S): any {
        return this.value[key];
    }

    set(key: keyof S, value: S[keyof S]) {
        this.subject.next({
            ...this.value,
            [key]: value
        });
    }

    select(key: keyof S): Observable<any> {
        return this.store.pipe(pluck(key));
    }
}
