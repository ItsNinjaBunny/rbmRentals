import { aboutCards } from "../shared/template";
import { AboutCard } from './AboutCard';

export const About = () => {

	return (
		<div className='w-full my-32'>
			<div className='max-w-[1240px] mx-auto'>
				<div className='text-center'>
					<h2 className='text-5xl font-bold'>Trusted by families across the States</h2>
					<p className='text-3xl py-6 text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						Ratione, perferendis officiis? Dolor dolorem voluptatem voluptas ipsa quod quaerat quis totam. Corporis
						obcaecati doloribus assumenda quos veritatis totam laboriosam error sapiente. Officia, quis cumque? Iste, asperiores.
					</p>
				</div>

				<div className='grid md:grid-cols-3 gap-4 px-2 text-center' >
					{
						aboutCards.map(card => (
							<AboutCard key={card.id} title={card.title} desc={card.desc} />
						))
					}
				</div>
			</div>
		</div>
	);
}