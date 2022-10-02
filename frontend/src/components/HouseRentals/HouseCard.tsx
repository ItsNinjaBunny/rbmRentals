import { props } from "./HouseRentals.props";
import { Link } from "react-router-dom";

export const HouseCard = (props: props) => {

	return (
		<div className='bg-[#F5FAFA] text-slate-900 m-4 p-4 rounded-xl shadow-2xl relative'>
			<p className='text-2xl underline underline-offset-1 text-slate-800' >{props.title}</p>
			<div>
				<p className='text-6xl font-bold py-4 flex'>${props.price}
					<span className='text-xl text-slate-500 flex flex-col justify-end'>
						/per night
					</span>
				</p>
			</div>
			<p className='text-xl py-8 text-slate-500'>{props.desc}</p>
			<div className='text-2xl grid grid-cols-2'>
				{props.amenities.map(amenity => (
					<p key={amenity.id} className='flex py-4 mx-1 items-center'>
						<span className='font-bold text-4xl mr-4'>•</span>
						{amenity.feature}
					</p>
				))}
			</div>
			<div className='w-full h-[30vh] my-4 p-4 relative'>
				<p className='relative left-[50%] top-[50%] translate-x-[-25%]'>image gallery will be here</p>
			</div>
			<button className='hover-button relative w-[50%] left-[50%] py-4 my-4'>
				<a rel='noopener noreferr' target='_blank' href={'https://rentals.rbmrentals.com/vacation-rental-property-v2/55487/minimalist-by-mora-%7C-entire-private-house-3bd-2bth?checkIn=&checkOut=&disc=null&guests=1&l=West%20Covina'}>
					Get Started
				</a>
			</button>
		</div>
	)
}