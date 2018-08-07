import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.scss']
})
export class DataFormComponent implements OnInit {
  dataForm: FormGroup;

  genre: Array<String> = ['Magasin', 'Bar', 'Restaurant', 'Boite', 'Café'];
  sousGenre: Array<String> = [
    'Vin & Spiritueux',
    'Epicerie Fine',
    'Tapas',
    'Cuisine argentine',
    'Cuisine mexicaine',
    'Bar allemand',
    'Guinguette',
    'En terrasse',
    'Pub',
    'Brunch',
    'Brasserie',
    'Bar à cocktail',
    'Cuisine japonaise',
    'Cuisine traditionnelle',
    'Cave à vin',
    'Bar à vin',
    'Cuisine vietnamienne',
    'Cuisine gastronomique',
    'Cuisine bistronomique',
    'Cuisine italienne'
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      titleFormControl: ['', [Validators.required]],
      descriptionFormControl: ['']
    });
  }

  onValidate(value: Boolean): void {
    console.log('validation');
    if (value === true) {
      console.log('Titre: ', this.dataForm.get('titleFormControl').value);
      console.log('Description: ', this.dataForm.get('descriptionFormControl').value);
    }
  }
}
