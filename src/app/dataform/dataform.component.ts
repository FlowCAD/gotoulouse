import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs';

import { DataService } from '@app/shared/services/data.service';

import { Place, EnumGenres, EnumSousGenres, Genre } from '@app/shared/interface';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.scss']
})
export class DataFormComponent implements OnInit, OnDestroy {
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
    private snackBar: MatSnackBar,
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
    this.initForm();
  }

  ngOnDestroy() {
    this.genresSubscription.unsubscribe();
  }

  public initForm() {
    this.dataForm = this.formBuilder.group({
      titleFormControl: ['', [Validators.required]],
      latFormControl: ['', [Validators.required]],
      lngFormControl: ['', [Validators.required]],
      descriptionFormControl: [''],
      genreControl: ['', [Validators.required]]/*,
      sousGenreControl: ['']*/
    });
  }

  public onValidate(): void {
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
    this.openSnackBar('Lieu sauvegardé');
    this.initForm();
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
