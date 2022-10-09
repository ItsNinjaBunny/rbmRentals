import { props } from "./Hero.props";
import {
	HomeModernIcon,
	ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';
import { IoCarSport } from 'react-icons/io5';
import { Link } from 'react-router-dom'

export const HeroCard = ({ title, to }: props) => {

	const handleIcon = (title: string) => {
		switch(title) {
			case 'House Rentals':
				return <HomeModernIcon className='h-6 mr-4 text-indigo-600' />
			case 'Car Rentals':
				return <IoCarSport className='h-6 mr-4 text-xl text-indigo-600' />
			case 'Rental Management':
				return <ClipboardDocumentListIcon className='h-6 mr-4 text-indigo-600' /> 
		}  
	}

	return (
		<div className='p-4'>
			<Link to={to} >
				<p className='flex px-3  md:text-xl cursor-pointer  rounded-sm border-b-[3px] duration-400 hover:border-b-indigo-600 text-slate-500'>{handleIcon(title)}{title}</p>
			</Link>
		</div>
	);
}