import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    genresSubject = new Subject<any[]>();

    private genres: any[] = [];
    private places: string[];

    constructor(private httpClient: HttpClient) {}

    public emitGenresSubject() {
        this.genresSubject.next(this.genres.slice());
    }
    public saveGenresToServer() {
        this.httpClient.put('https://gotoulouse-3d2ef.firebaseio.com/genres.json', this.genres).subscribe(
        () => {
            console.log('Enregistrement terminé !');
        },
        (error) => {
            console.log(`Erreur ! {{error}}`);
        });
    }

    public getGenresFromServer() {
        this.httpClient.get<any[]>('https://gotoulouse-3d2ef.firebaseio.com/genres.json').subscribe(
        (response) => {
            this.genres = response;
            console.log('Genres : ', response);
            this.emitGenresSubject();
        },
        (error) => {
            console.log(`Erreur ! {{error}}`);
        }
        );
    }

    // savePlacesToServer() {
    //     this.httpClient.post('https://gotoulouse-3d2ef.firebaseio.com/places.json', this.places).subscribe( () => {
    //         console.log('Enregistrement terminé !');
    //     },
    //     (error) => {
    //         console.log(`Erreur ! {{error}}`);
    //     });
    // }
}
