type amenity = {
    id?: number;
    feature: string;
}

export interface props {
    id?: number;
    title: string;
    desc: string;
    price: number;
    amenities: amenity[];
    styles?: string;
}