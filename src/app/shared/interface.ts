export interface Place {
  nom: string;
  latitude: number;
  longitude: number;
  description?: string;
  genre: Genre;
  sous_genre?: SousGenre[];
  date_creation: string;
  creator: string;
}

export interface Genre {
  id: string;
  nom: string;
  sous_genres?: SousGenre[];
}

export interface SousGenre {
  id: string;
  nom: string;
}

export enum EnumGenres {
  MAGASIN = 'Magasin',
  BAR = 'Bar',
  RESTAURANT = 'Restaurant',
  BOITE = 'Boite',
  CAFE = 'Café'
}

export enum EnumSousGenres {
  VIN_SPRIRIT = 'Vin & Spiritueux',
  EPICERIE_FINE = 'Epicerie Fine',
  TAPAS = 'Tapas',
  CUISINE_ARG = 'Cuisine argentine',
  CUISINE_MEX = 'Cuisine mexicaine',
  CUISINE_JAP = 'Cuisine japonaise',
  CUISINE_VIET = 'Cuisine vietnamienne',
  CUISINE_ITA = 'Cuisine italienne',
  CUISINE_TRAD = 'Cuisine traditionnelle',
  CUISINE_GASTRO = 'Cuisine gastronomique',
  CUISINE_BISTRO = 'Cuisine bistronomique',
  BAR_ALLEMAND = 'Bar allemand',
  GUINGUETTE = 'Guinguette',
  TERRASSE = 'En terrasse',
  PUB = 'Pub',
  BRUNCH = 'Brunch',
  BRASSERIE = 'Brasserie',
  COCKTAIL = 'Bar à cocktail',
  CAVE_VIN = 'Cave à vin',
  BAR_VIN = 'Bar à vin'
}
