import { allInOneCards } from "../shared/template"
import { AllInOneCard } from "./AllInOneCard"


export const AllInOne = () => {
	
	return (
		<div className='w-full my-32'>
			<div className='max-w-[1240px] mx-auto px-2'>
				<h2 className='text-5xl font-bold text-center'>All-In-One Renting Amenities</h2>
				<p className='text-2xl py-8 text-gray-500 text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum qui ipsum libero reiciendis voluptas, ducimus at labore voluptate assumenda repellendus!</p>
				<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
					{
						allInOneCards.map(card => (
							<AllInOneCard key={card.id} title={card.title} desc={card.desc} />
						))
					}
				</div>
			</div>
		</div>
	)
}