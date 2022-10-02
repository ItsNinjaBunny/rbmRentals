export interface props {
	id?: number;
	title: string;
	desc: string;
	active: boolean;
	setActive: CallableFunction;
}