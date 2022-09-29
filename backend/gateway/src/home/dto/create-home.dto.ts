export class CreateHomeDto {
  id: string;
  property_name: string;
  house_type: string;
  beds: number;
  baths: number;
  workspace: number;
  occupied: boolean;
  stay: [Date, Date]

  amenities: Amenity[];
  room: Room[]
}

export interface Amenity {
  amenity_name: string;
}

export interface Room {
  room_number: string;
  occupied: boolean;
}