export class CreateHomeDto {
  id: string;
  property_name: string;
  house_type: string;
  beds: number;
  baths: number;
  workspaces: number;
  occupied: boolean;
  stay: [Date, Date]

  amenities: Amenity;
  room: Room[]
}

export interface Amenity {
  master_bedroom: boolean
  outdoor_patio: boolean
  fireplace: boolean
  firepit: boolean
  pet_friendly: boolean
  locked_rooms: boolean
  parking: boolean
  backyard: boolean
}

export interface Room {
  room_number: string;
  occupied: boolean;
}