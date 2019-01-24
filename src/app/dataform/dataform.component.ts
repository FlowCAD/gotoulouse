import { Component, OnInit, Input } from '@angular/core';

import { FormControl, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DataService } from '@app/shared/services/data.service';

import { Place, EnumGenres, EnumSousGenres, Genre } from '@app/shared/interface';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.scss']
})
export class DataFormComponent implements OnInit {
  dataForm: FormGroup;
  selectedGenre: string;
  sousGenre = new FormControl();

  public genres: Genre[];
  public genresSubscription: Subscription;
  public sousGenres: any[] = [];
  public places: Place[];
  public placesSubscription: Subscription;

  @Input() lat: string;
  @Input() lng: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getGenresFromServer();
    this.dataService.getPlacesFormServer();
    this.genresSubscription = this.dataService.genresSubject.subscribe(
      (genres: Genre[]) => {
        this.genres = genres;
      }
    );
    this.dataService.emitGenres();

    // TODO Load sousgenre thanks to genres
    // Object.keys(EnumSousGenres).forEach(key => {
    //   this.sousGenres.push({
    //     value: key,
    //     viewValue: EnumSousGenres[key]
    //   });
    // });

    this.dataForm = this.formBuilder.group({
      titleFormControl: ['', [Validators.required]],
      latFormControl: [''],
      lngFormControl: [''],
      descriptionFormControl: [''],
      genreControl: ['']/*,
      sousGenreControl: ['']*/
    });
  }

  onValidate(): void {
    const newPlace: Place = {
      nom: this.dataForm.get('titleFormControl').value,
      latitude: this.dataForm.get('latFormControl').value,
      longitude: this.dataForm.get('lngFormControl').value,
      description: this.dataForm.get('descriptionFormControl').value,
      genre: this.dataForm.get('genreControl').value.name,
      sous_genre: null,
      // sous_genre: this.dataForm.get('sousGenreControl').value,
      date_creation: new Date(),
      creator: 'Admin'
    };
    console.log('newPlace: ', newPlace);
    this.dataService.addNewPlace(newPlace);
  }
}
