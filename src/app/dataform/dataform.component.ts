import { Component, OnInit, Input } from '@angular/core';

import { FormControl, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DataService } from '@app/shared/services/data.service';

import { EnumGenres, EnumSousGenres } from '@app/shared/interface';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.scss']
})
export class DataFormComponent implements OnInit {
  dataForm: FormGroup;
  selectedGenre: string;
  sousGenre = new FormControl();
  public genres: any[] = [];
  public sousGenres: any[] = [];

  @Input() lat: string;
  @Input() lng: string;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    Object.keys(EnumGenres).forEach(key => {
      this.genres.push({
        value: key,
        viewValue: EnumGenres[key]
      });
    });

    Object.keys(EnumSousGenres).forEach(key => {
      this.sousGenres.push({
        value: key,
        viewValue: EnumSousGenres[key]
      });
    });

    this.dataForm = this.formBuilder.group({
      titleFormControl: ['', [Validators.required]],
      latFormControl: [''],
      lngFormControl: [''],
      descriptionFormControl: ['']
    });
  }

  onValidate(value: Boolean): void {
    console.log('validation');
    if (value === true) {
      console.log('Titre: ', this.dataForm.get('titleFormControl').value);
      console.log('Latitude: ', this.lat);
      console.log('Longitude: ', this.lng);
      console.log('Description: ', this.dataForm.get('descriptionFormControl').value);
      console.log('Genre: ', this.selectedGenre);
      console.log('Sous-genre: ', this.sousGenre.value);
    }
  }

  onSave() {
    this.dataService.saveGenresToServer();
  }

  onGet() {
    this.dataService.getGenresFromServer();
  }
}
