import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { PaintJsState } from '../../models/paintjs-state.interface';
import { ActionCommand } from '../../models/action-command.model';

const state: PaintJsState = {
    currentImage: undefined,
    commandStack: []
};

export class PaintJsStore {
    private subject = new BehaviorSubject<PaintJsState>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());

    get value(): PaintJsState {
        return this.subject.value;
    }

    set(key: string, value: any) {
        this.subject.next({
            ...this.value,
            [key]: value
        });
    }

    select<T>(key: string): Observable<T> {
        return this.store.pipe(pluck(key));
    }
}
