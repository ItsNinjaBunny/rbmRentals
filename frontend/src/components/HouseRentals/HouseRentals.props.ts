type amenity = {
	id?: number;
	feature: string;
}

export interface props {
	id?: number;
	title: string;
	price: number;
	desc: string;
	amenities: amenity[];
}