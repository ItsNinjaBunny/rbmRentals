import { props } from "./Pricing.props";
import { CheckIcon } from '@heroicons/react/24/solid';

export const PricingCard = (props: props) => {

	return (
		<div className='bg-[#F5FAFA] text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative'>
			<span className='uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm'>{props.id === 1 ? 'Economic' : 'Premium'}</span>
			<div>
				<p className='text-6xl font-bold py-4 flex'>${props.price}<span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
			</div>
			<p className='text-2xl underline underline-offset-1 text-slate-800' >{props.title}</p>
			<p className='text-xl py-8 text-slate-500'>{props.desc}</p>
			<div className='text-2xl'>
				{props.amenities.map(amenity => (
					<p key={amenity.id} className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />{amenity.feature}</p>
				))}
				<button className='hover-button w-full py-4 my-4'>Get Started</button>
			</div>
		</div>
	);
}