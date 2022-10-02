import { houses } from "../shared/template";
import { HouseCard } from "./HouseCard";

export const House = () => {

	return (
		<div className='w-full bg-zinc-200 '>
			<div className='max-w-[1240px] mx-auto py-12'>
				<div className='text-center py-10 text-indigo-600'>
					<p className='text-3xl uppercase'>Houses</p>
				</div>
				<div className='grid md:grid-cols-2 xl:grid-cols-3'>
					{
						houses.map(house => (
							<HouseCard key={house.id} title={house.title} price={house.price} desc={house.desc} amenities={house.amenities} />
						))
					}
				</div>
			</div>
		</div>
	);
}