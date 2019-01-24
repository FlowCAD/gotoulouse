import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { database } from 'firebase';

import { Genre } from '@app/shared/interface';

@Injectable()
export class DataService {

    public genres: Genre[] = [];
    public genresSubject = new Subject<Genre[]>();

    // private places: string[];

    constructor() {}

    public emitGenres() {
        this.genresSubject.next(this.genres);
    }

    public getGenresFromServer() {
        database().ref('genres').on('value', (data) => {
            this.genres = data.val() ? data.val() : [];
            this.emitGenres();
        });
    }

    // savePlacesToServer() {
        // firebase.database().ref('places').set(this.places);

        //  OU

    //     this.httpClient.post('https://gotoulouse-3d2ef.firebaseio.com/places.json', this.places).subscribe( () => {
    //         console.log('Enregistrement terminé !');
    //     },
    //     (error) => {
    //         console.log(`Erreur ! {{error}}`);
    //     });
    // }
}
