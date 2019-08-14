import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';


export abstract class BaseStore<S> {
    protected subject = new BehaviorSubject<S>(null);
    protected store = this.subject.asObservable().pipe(distinctUntilChanged());

    get value(): S {
        return this.subject.value;
    }

    set(key: keyof S, value: S[keyof S]) {
        this.subject.next({
            ...this.value,
            [key]: value
        });
    }

    select(key: keyof S): Observable<S[keyof S]> {
        return this.store.pipe(pluck(key));
    }
}
