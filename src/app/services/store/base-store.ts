import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged, map } from 'rxjs/operators';


export abstract class BaseStore<S> {
    protected stateKeySubjects: { [P in keyof S]: BehaviorSubject<S[P]> } = {} as any;

    constructor(initialState: S) {
        for (const key in initialState) {
            if (initialState.hasOwnProperty(key)) {
                const element = initialState[key];
                this.stateKeySubjects[key] = new BehaviorSubject<any>(element);
            }
        }
    }

    get(key: keyof S): any {
        return this.stateKeySubjects[key].value;
    }

    set(key: keyof S, value: S[keyof S]) {
        this.stateKeySubjects[key].next(value);
    }

    select(key: keyof S): Observable<any> {
        return this.stateKeySubjects[key]
                    .asObservable();
    }
}
