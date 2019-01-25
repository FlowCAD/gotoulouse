import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs';

import { DataService } from '@app/shared/services/data.service';

import { Place, Genre } from '@app/shared/interface';

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

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getGenresFromServer();
    this.dataService.getPlacesFormServer();
    this.genresSubscription = this.dataService.genresSubject.subscribe((genres: Genre[]) => {
      this.genres = genres;
    });
    this.dataService.emitGenres();
    this.initForm();
  }

  ngOnDestroy() {
    this.genresSubscription.unsubscribe();
  }

  public initForm() {
    this.selectedGenre = null;
    this.dataForm = this.formBuilder.group({
      titleFormControl: ['', [Validators.required]],
      latFormControl: ['', [Validators.required]],
      lngFormControl: ['', [Validators.required]],
      descriptionFormControl: [''],
      genreFormControl: ['', [Validators.required]],
      sousGenreFormControl: [[]]
    });
  }

  public onValidate(): void {
    const newPlaceName = this.dataForm.get('titleFormControl').value;
    const newPlaceDate = new Date().toUTCString();
    const newPlace: Place = {
      id: newPlaceDate + '--' + newPlaceName,
      nom: newPlaceName,
      latitude: this.dataForm.get('latFormControl').value,
      longitude: this.dataForm.get('lngFormControl').value,
      description: this.dataForm.get('descriptionFormControl').value,
      genre: this.dataForm.get('genreFormControl').value,
      sous_genre: this.dataForm.get('sousGenreFormControl').value,
      date_creation: newPlaceDate,
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