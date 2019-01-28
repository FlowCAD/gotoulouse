import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { database } from 'firebase';

@Injectable()
export class KeysService {
    public mbKey: string;
    public mbKeySubject = new Subject<any>();

    constructor() {}

    public emitMbKey() {
        this.mbKeySubject.next(this.mbKey);
    }

    public getMbKeyFromServer() {
        database()
            .ref('keys/mbKey')
            .on('value', data => {
                this.mbKey = data.val() ? data.val() : [];
                this.emitMbKey();
            });
    }
}
