export interface Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;

  lat: number;
  lng: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface SelectedLocation extends Location {
  address: string;
}
