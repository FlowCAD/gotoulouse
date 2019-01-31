export interface Place {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  description?: string;
  genre: string;
  sous_genre?: string[];
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
  ALLTHENIGHT = 'All The Night',
  CAFE = 'Café'
}

export enum EnumSousGenres {
  VIN_SPIRIT = 'Vin & Spiritueux',
  EPICERIE_FINE = 'Epicerie Fine',
  EPICERIE_ESP = 'Epicerie Fine Espagnole',
  EPICERIE_ITA = 'Epicerie Fine Italienne',
  DEGUST = 'Dégustation et Tapas',
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
  BON_CAFE = 'Bon café',
  ASSO = 'Bar asso',
  CLANDESTINO = 'Bar clandestin',
  PUB = 'Pub',
  BRUNCH = 'Brunch',
  BRASSERIE = 'Brasserie',
  COCKTAIL = 'Bar à cocktail',
  CAVE_VIN = 'Cave à vin',
  BAR_VIN = 'Bar à vin',
  SALON_DE_THE = 'Salon de thé',
  BABYFOOT = 'Babyfoot',
  BAR_CONCERT = 'Bar concert',
  BOITE = 'Boite de nuit',
  CONCERT = 'Salle de concert'
}
